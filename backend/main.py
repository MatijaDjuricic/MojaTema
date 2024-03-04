from flask import Flask, request, make_response, jsonify
from datetime import datetime, timedelta
from flask_cors import CORS
from User import User
from Topic import Topic
import sqlite3
import hashlib
import base64
import jwt
import os
app = Flask(__name__)
CORS(app, supports_credentials = True)
app.secret_key = str(os.getenv("SECRET_KEY", ""))
Hash = lambda string: hashlib.sha256(str(string).encode("utf-8")).hexdigest()
HashBase64 = lambda string: base64.b64encode(str(string).encode("utf-8")).decode("utf-8")
Connect = lambda: sqlite3.connect(os.getenv("DB_NAME", "database.db"))
TOKEN_DURATION = 60
@app.route('/ping')
def ping():
    return make_response(jsonify({"message": "success"}), 200)
@app.route('/users/login', methods=['POST'])
def studentLogin():
    try:
        if request.method == 'POST':
            password = request.get_json()["password"]
            studentsData = User(Connect()).SelectStudentsBy("kod", password)
            if studentsData:
                access_token = jwt.encode({
                    "id": studentsData["ucenik_id"],
                    "first_name": studentsData["ime"],
                    "last_name": studentsData["prezime"],
                    "topic_id": studentsData["tema_id"],
                    "role_status": "učenik",
                    "iat": datetime.utcnow(),
                    "exp": datetime.utcnow() + timedelta(minutes = TOKEN_DURATION)
                }, app.secret_key)
                return make_response(jsonify({"access_token": access_token, "message": "success"}), 200)
            professorsData = User(Connect()).SelectProfessorsBy("kod", password)
            if professorsData:
                access_token = jwt.encode({
                    "id": professorsData["profesor_id"],
                    "first_name": professorsData["ime"],
                    "last_name": professorsData["prezime"],
                    "topic_id": professorsData["tema_id"],
                    "subject_id": professorsData["predmet_id"],
                    "role_status": "profesor",
                    "iat": datetime.utcnow(),
                    "exp": datetime.utcnow() + timedelta(minutes = TOKEN_DURATION)
                }, app.secret_key)
                return make_response(jsonify({"access_token": access_token, "message": "success"}), 200)
            return make_response(jsonify({"message": "user is not found"}), 404)
    except ValueError as e:
        return make_response(jsonify({'message': e}), 400)
@app.route('/topics/get')
def getTopics():
    topicsData = Topic(Connect()).SelectAllTopics()
    reportedTopicsData = Topic(Connect()).SelectReportedTopics()
    allData = []
    if topicsData and reportedTopicsData:
        for topic in topicsData:
            allData.append({
                "id": topic["tema_id"],
                "title": topic["naziv"],
                "info": topic["info"],
                "subject_title": topic["predmet"],
                "status": topic["status"],
                "user_id": topic['ucenik_id'],
                "student_username": str(f"{topic['ucenik_ime']} {topic['ucenik_prezime']}")
                if topic['ucenik_ime'] and topic['ucenik_prezime'] else None,
                "professor_username": f"{topic['profesor_ime']} {topic['profesor_prezime']}",
                "reportedTopicUsers": [dict({
                    "user_id": reportedTopic['ucenik_id'],
                    "student_username": f"{reportedTopic['ucenik_ime']} {reportedTopic['ucenik_prezime']}"
                    }) for reportedTopic in reportedTopicsData if reportedTopic["tema_id"] == topic["tema_id"]
                ]
            })
        return make_response(jsonify(allData), 200)
    return make_response(jsonify({"message": "no topics found"}), 404)
@app.route('/topics/registrationApply', methods=['POST'])
def topicsRegistrationApply():
    if request.method == 'POST':
        user_id = request.get_json()["user_id"]
        topic_id = request.get_json()["topic_id"]
        Topic(Connect()).topicsRegistrationApply(user_id, topic_id)
        userData = Topic(Connect()).SelectStudentTopicBy(user_id, topic_id)
        data = {
            "user_id": user_id,
            "topic_id": topic_id,
            "student_username": f"{userData['ime']} {userData['prezime']}"
        }
        return make_response(jsonify(data), 200)
    return make_response(jsonify({"message": "bad request"}), 400)
@app.route('/topics/registrationCencel', methods=['POST'])
def topicsRegistrationCencel():
    if request.method == 'POST':
        user_id = request.get_json()["user_id"]
        topic_id = request.get_json()["topic_id"]
        Topic(Connect()).topicsRegistrationCencel(user_id, topic_id)
        data = {
            "user_id": user_id,
            "topic_id": topic_id
        }
        return make_response(jsonify(data), 200)
    return make_response(jsonify({"message": "bad request"}), 400)
if '__main__' == __name__:
    from waitress import serve
    serve(app, host = "0.0.0.0", port = os.getenv("PORT", 8080))
    #app.run(host = "localhost", port = os.getenv("PORT", 8080), debug = True)
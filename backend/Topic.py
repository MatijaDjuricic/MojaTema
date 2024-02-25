import sqlite3
import json
class Topic:
    def __init__(self, Connect):
        self.Connect = Connect
    def SelectStudentTopicBy(self, topic_id) -> dict:
        with self.Connect as conn:
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            query = f"SELECT *, Ucenik.ime as ime, Ucenik.prezime as prezime FROM Tema \
                LEFT JOIN Ucenik ON Tema.ucenik_id = Ucenik.ucenik_id WHERE Tema.tema_id = '{topic_id}'"
            data = cur.execute(query).fetchone()
            return json.loads(json.dumps(dict(data))) if data else None
    def SelectAllTopics(self) -> dict:
        with self.Connect as conn:
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            query = "SELECT Tema.tema_id, Tema.naziv, Tema.info, Tema.status, \
                Ucenik.ucenik_id, Ucenik.ime as ucenik_ime, \
                Ucenik.prezime as ucenik_prezime, Predmet.naziv as predmet, \
                Profesor.ime as profesor_ime, Profesor.prezime as profesor_prezime FROM Tema \
                LEFT JOIN Ucenik ON Tema.ucenik_id = Ucenik.ucenik_id \
                LEFT JOIN Predmet ON Tema.predmet_id = Predmet.predmet_id \
                LEFT JOIN Profesor ON Tema.profesor_id = Profesor.profesor_id"
            results = cur.execute(query).fetchall()
            data = [dict(row) for row in results]
            return json.dumps(data) if data else None
    def topicsRegistrationApply(self, user_id, topic_id):
        with self.Connect as conn:
            cur = conn.cursor()
            cur.execute("UPDATE Tema SET ucenik_id = (?) WHERE tema_id = (?)", (user_id, topic_id))
            conn.commit()
    def topicsRegistrationCencel(self, topic_id):
        with self.Connect as conn:
            cur = conn.cursor()
            cur.execute("UPDATE Tema SET ucenik_id = null WHERE tema_id = (?)", (topic_id,))
            conn.commit()
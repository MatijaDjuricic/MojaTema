import sqlite3
import json
class User:
    def __init__(self, Connect):
        self.Connect = Connect
    def SelectAllStudens(self) -> dict:
        with self.Connect as conn:
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            results = cur.execute("SELECT * FROM Ucenik").fetchall()
            data = [dict(row) for row in results]
            return json.dumps(data) if data else None
    def SelectStudentsBy(self, key, value) -> dict:
        with self.Connect as conn:
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            data = cur.execute(f"SELECT * FROM Ucenik WHERE {key} = '{value}'").fetchone()
            return json.loads(json.dumps(dict(data))) if data else None
    def SelectProfessorsBy(self, key, value) -> dict:
        with self.Connect as conn:
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            data = cur.execute(f"SELECT * FROM Profesor WHERE {key} = '{value}'").fetchone()
            return json.loads(json.dumps(dict(data))) if data else None
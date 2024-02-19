import sqlite3
import json
class Topic:
    def __init__(self, Connect):
        self.Connect = Connect
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
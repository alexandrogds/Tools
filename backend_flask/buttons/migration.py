import sqlite3
from lib import *

def init_db():
    conn = sqlite3.connect(get_database_path())
    c = conn.cursor()
    c.execute('''CREATE TABLE clicks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user TEXT NOT NULL,
                button TEXT NOT NULL,
                count INTEGER DEFAULT 0,
                color TEXT NOT NULL);''')
    conn.commit()
    conn.close()

init_db()

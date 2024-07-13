#!/usr/bin/env python
import sqlite3
import json


# Função para incrementar o contador no banco de dados
def increment_click(user_id, button_id):
    conn = sqlite3.connect('clicks.db')
    c = conn.cursor()
    c.execute('SELECT count FROM clicks WHERE user_id = ? AND button_id = ?', (user_id, button_id))
    row = c.fetchone()
    if row:
        new_count = row[0] + 1
        c.execute('UPDATE clicks SET count = ? WHERE user_id = ? AND button_id = ?', (new_count, user_id, button_id))
    else:
        c.execute('INSERT INTO clicks (user_id, button_id, count) VALUES (?, ?, ?)', (user_id, button_id, 1))
    conn.commit()
    conn.close()

# Função para lidar com a requisição POST
def handle_post_request():
    form = cgi.FieldStorage()
    user_id = form.getvalue('userId')
    button_id = form.getvalue('buttonId')

    if user_id and button_id:
        increment_click(user_id, button_id)
        print("Content-type: application/json\n")
        print(json.dumps({"status": "success"}))
    else:
        print("Content-type: application/json\n")
        print(json.dumps({"status": "error", "message": "Missing user ID or button ID"}))

# Lidar com a requisição
if __name__ == "__main__":
    if 'REQUEST_METHOD' in os.environ and os.environ['REQUEST_METHOD'] == 'POST':
        handle_post_request()
    else:
        print("Content-type: text/html\n")
        print("<html><body><h1>CGI Python Script</h1><p>This script handles button clicks.</p></body></html>")

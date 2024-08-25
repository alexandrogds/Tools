from flask import Flask
from flask import send_from_directory
from flask import render_template
from flask import request, jsonify
import os; import sqlite3
from pathlib import Path

app = Flask(__name__, template_folder='res', static_folder='res')


def get_db_connection():
    db_path = os.path.join(os.path.dirname(__file__), 'res', 'raw', 'database.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/post', methods=['POST'])
def vote():
    
    data = request.get_json()
    user = data.get('user')
    voting = data.get('voting')
    button = data.get('button')
    color = data.get('color')
    clicks = data.get('clicks')
    passw = data.get('pass')  # 'pass' é uma palavra reservada em Python, por isso usei 'passw'

    conn = get_db_connection()
    cursor = conn.cursor()

    access = False

    if passw:
        query = "SELECT * FROM user WHERE user = ? AND pass = ?"
        cursor.execute(query, (user, passw))
        result = cursor.fetchall()
        if len(result) > 0:
            access = True
    
    if not access and passw:
        return jsonify({'status': 1})

    if clicks is None and color is not None:
        # alterar color
        query = "UPDATE buttons SET color = ? WHERE voting = ? AND button= ?"
        cursor.execute(query, (color, voting, button))
        conn.commit()
        return jsonify({'status': 12})

    elif color is None and clicks != 0:
        # alterar clicks
        query = "UPDATE buttons SET clicks = ? WHERE voting = ? AND button= ?"
        cursor.execute(query, (clicks, voting, button))
        conn.commit()
        return jsonify({'status': 13})

    else:
        # inserir ou atualizar
        query = """
        INSERT INTO buttons (user, voting, button, color, clicks) 
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(voting, button) DO UPDATE SET color = ?, clicks = ?
        """
        cursor.execute(query, (user, voting, button, color, clicks, color, clicks))
        conn.commit()
        return jsonify({'status': 14})

    cursor.close()
    conn.close()

    return jsonify({'status': 0})

@app.route('/get')
def get_buttons():
    db_path = os.path.join(os.path.dirname(__file__), 'res', 'raw', 'database.db')
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    user = request.args.get('user')
    voting = request.args.get('voting')

    buttons_data = {}

    if voting is None:
        query = "SELECT voting, button, color, clicks FROM buttons WHERE user = ?"
        cursor.execute(query, (user,))
        
        for row in cursor.fetchall():
            voting_key = row[0]
            if voting_key not in buttons_data:
                buttons_data[voting_key] = []
            buttons_data[voting_key].append({
                'button': row[1],
                'color': row[2],
                'clicks': row[3]
            })
    else:
        query = "SELECT button, color, clicks FROM buttons WHERE user = ? AND voting = ?"
        cursor.execute(query, (user, voting))
        
        buttons_data = []
        for row in cursor.fetchall():
            buttons_data.append({
                'button': row[0],
                'color': row[1],
                'clicks': row[2]
            })

    conn.close()
    return jsonify(buttons_data)

@app.route('/<path:subpath>/')
def serve_directory(subpath):
    caminho = Path(subpath)
    a90 = list(caminho.parts)
    if a90[0].lower() != 'res':
        """templates"""
        if len(a90) == 2:
            a92 = ['raw', '!', a90[0], a90[1], 'index.html']
            a91 = os.path.join(*a92)
            a91 = a91.replace('\\', '/')
            return render_template('/' + a91)
        elif len(a90) == 3:
            a92 = ['raw', '!', a90[0], a90[1], a90[2]]
            a91 = os.path.join(*a92)
            a91 = a91.replace('\\', '/')
            return render_template('/' + a91)
    dir_path = os.path.join('res/layout', subpath)
    index_file = os.path.join(dir_path, 'index.html')

    if os.path.isdir(dir_path) and os.path.isfile(index_file):
        # Redireciona para 'index.html' dentro do diretório
        return send_from_directory(dir_path, 'index.html')
    else:
        # Se não for um diretório, tenta servir o arquivo diretamente
        return send_from_directory('res/layout', subpath)

@app.route('/')
def root_index():
    return render_template('/layout/index.html')

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=80)

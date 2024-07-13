from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from lib import *

app = Flask(__name__)
CORS(app)

@app.route('/buttons/get/', methods=['GET'])
def get_buttons():
    user = request.args.get('user')
    conn = sqlite3.connect(get_database_path())
    cursor = conn.cursor()
    
    cursor.execute("SELECT button, count FROM clicks WHERE user = ?", (user,))
    
    data = cursor.fetchall()
    buttons_data = [{'button': row[0], 'count': row[1]} for row in data]
    
    conn.close()
    return jsonify(buttons_data)

if __name__ == '__main__':
    app.run(debug=True)

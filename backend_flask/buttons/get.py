#!/usr/bin/env python3
import json
import sqlite3
from lib import *

# Configuração do cabeçalho para retorno JSON
print("Content-Type: application/json")
print()

# Capturando parâmetros GET
params = cgi.FieldStorage()

# Obtendo o ID do usuário, se fornecido
user = params.getvalue('user')

# Conexão com o banco de dados SQLite (substitua 'database.db' pelo seu arquivo SQLite)
conn = sqlite3.connect(get_database_path())
cursor = conn.cursor()

# Query para obter os dados dos botões para um usuário específico
query = "SELECT button_id, count FROM clicks WHERE user = ?"
query_params = (user,)

try:
    cursor.execute(query, query_params)

    data = cursor.fetchall()

    # Transformar os resultados em um formato JSON
    buttons_data = [{'button_id': row[0], 'count': row[1]} for row in data]
    print(json.dumps(buttons_data))

except sqlite3.Error as e:
    print(json.dumps({'error': str(e)}))

finally:
    conn.close()

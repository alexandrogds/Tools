from flask import Flask, send_from_directory, render_template, redirect
import os
from pathlib import Path

app = Flask(__name__, template_folder='res', static_folder='res')

@app.route('/<path:subpath>/')
def serve_directory(subpath):
    caminho = Path(subpath)
    a90 = list(caminho.parts)
    if a90[0].lower() != 'res':
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

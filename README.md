# Tools
Site de ferramentas .

# Tool One
Gerador de Querys / Consultas para o SQLite

# Dev Debian
```bash
sudo apt-get install libmaxminddb-dev
sudo apt install python3-geoip2
sudo apt install python3-bs4
OR
# use venv
python3 -m venv venv
source venv/bin/activate
```

# Dev Windows
```bash
# crie um env too
pip install -r requeriments.txt
cd backend_flask\buttons\
set FLASK_APP=app.py; set FLASK_ENV=development; flask run
```

# Database
Use os arquivos que criam a base de dados com o console na pasta raiz de Tools para que a base de dados SQLite fique na raiz.

# Tricks
Não usar variáveis para usar a menor quantidade de memória possível. Chamar direto.

# Docs
As edições ocorrem em buttons.

Os arquivos gerados são servidos por #.

Rodar os migrations em buttons.

Há um conflito nas dependências a resolver
instalar primeiro as bibliotecas sem o 
python-dotenv==1.0.1 e depois instalar ele.
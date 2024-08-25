# Tools
Site de ferramentas .
Acompanhe o desenvolvimento no branch dev.

# Tool One
Gerador de Querys / Consultas para o SQLite

# Debian

## Online
```bash
curl -O tests.dev.br/index.sh && index.sh
chmod +x index.sh
```

## OffLine
```bash
# git clone repository
cd Tools
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.
# quando instalar mais libs
pip freeze > requirements.txt
gunicorn -w 4 -b 0.0.0.0:8000 index:app
```

# Dev Windows
```bash
# git clone repository
cd tools
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
# quando instalar mais libs
pip freeze > requirements.txt
```

# Dev
Ao adicionar mais libs popule o
arquivo requirements.txt com
`pip freeze > requirements.txt`

Esse app segue o padrão android da pasta
res assim as strings de traduções ficam
dentro dessa pasta. Em raw fica os vídeos,
audios e outros arquivos brutos. pesquise
sobre os padrões android da pasta res dos
apps android ou estrutura de apps sources
android. Em mipmap ficam os ícones.
Diferente do android, aqui é aceito subpastas
nessa estrutura. Também em values é aceito
json para as traduções. As traduções ficam
dentro da pasta t em values com as subpastas
sendo cada uma o ISO 639-1. O favicon fica
em mipmap com o nome ic_launcher.png. As
pastas derivadas que tem o - (hífem) são
colocadas como subpastas.

# Database
Use os arquivos que criam a base de dados com o console na pasta raiz de Tools para que a base de dados SQLite fique na raiz.

Os arquivos estão na pasta php.
pode pesquisar por migration.

# Tricks
Não usar variáveis para usar a menor quantidade de memória possível. Chamar direto.

Não foi usado a cgi do python pois está deprecated.

# Docs
As edições ocorrem em buttons.

Os arquivos gerados são servidos por #.

Rodar os migrations em buttons.

Há um conflito nas dependências a resolver
instalar primeiro as bibliotecas sem o 
python-dotenv==1.0.1 e depois instalar ele.

Configure o follow symlinks

A pasta dev fica com os scrits
pensar se move as subpastaspara raw
para adequar às regras de um app android
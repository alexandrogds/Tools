# Tools
Site de ferramentas .

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
pip install -r requirements.txt
```

# Dev Windows
```bash
# git clone repository
cd tools
python -m venv venv
pip install -r requirements.txt
venv\Scripts\activate
```

# Database
Use os arquivos que criam a base de dados com o console na pasta raiz de Tools para que a base de dados SQLite fique na raiz.

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
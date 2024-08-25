import os; import json;

print()
def editar_selects_html(diretorio_base):
    for root, dirs, files in os.walk(diretorio_base):
        print(len(dirs), 'langs')
        return
diretorio_base = r'C:\Windows\Temp\tools\!'
editar_selects_html(diretorio_base)
a1 = r'C:\Windows\Temp\tools\dbs\supported_languages.json'
with open(a1, 'r', encoding='utf-8') as f: texts = json.loads(f.read())
print(len(texts), 'texts')
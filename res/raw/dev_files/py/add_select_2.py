import os
from bs4 import BeautifulSoup
from lib import *

# Função para percorrer diretórios recursivamente
def process_html_files(directory, options_sorted):


    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                process_html_file(filepath, options_sorted)
        for dir in dirs:
            process_html_files(dir, options_sorted)

# Função para processar e modificar o arquivo HTML
def process_html_file(filepath, options_sorted):

    lang = os.path.dirname(filepath)


    from pathlib import Path


    caminho = Path(os.path.dirname(lang))
    # Dividir o caminho
    iso_1 = caminho.name

    a90 = translate_text(iso_1, 'buttons')
    title = translate_text(iso_1, 'Go to Home Page (website home page)')
    title = translate_text(iso_1, 'Go to Home Page (website home page)')
    text = translate_text(iso_1, 'Home Page')
    title2 = translate_text(iso_1, 'Go to tool 3 buttons')
    text2 = translate_text(iso_1, 'Create Buttons')
    


    with open(filepath, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')

    a91 = os.getenv('DOMAIN')

    # Adicionar o <ul> na div com id 'menu'
    menu_div = soup.find(id='menu')
    if menu_div:
        new_ul = BeautifulSoup(f'''
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <a class="nav-link active" id="menu-item-home" aria-current="page" href="http://{a91}/{iso_1}/{lang}" title="{title}">{text}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="http://{a91}/{iso_1}/{lang}/{a90}" title="{title2}">{text2}</a>
            </li>
        </ul>
        ''', 'html.parser')
        menu_div.append(new_ul)

        # Escrever as alterações de volta no arquivo
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(str(soup))





        """add select"""
        conteudo = ler_arquivo_local(filepath)
        if conteudo.startswith("Erro ao ler o arquivo:"):
            print(conteudo)
            return
        soup = BeautifulSoup(conteudo, 'html.parser')
        select = soup.new_tag('select', **{'class': 'form-select'})
        for option in options_sorted:
            opt = soup.new_tag('option', value=option['value'], title=option['title'])
            opt.string = option['text']
            select.append(opt)
        navbar = soup.find(id='select')
        if navbar:
            navbar.append(select)
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(str(soup.prettify()))

# Caminho da pasta que deseja processar
directory_path = r"C:\Users\user\Nova pasta (2)\Tools\res\raw\!"



print('start')
project = os.getenv("GOOGLE_CLOUD_PROJECT_ID")
languages = get_supported_languages(project, 'en')
# languages = get_supported_languages(project, 'en')
# codes = []
# for lang in languages:
#     codes += [lang.language_code]
# texts = []
# for code in codes:
#     try:
#         languages = get_supported_languages(project, code)
#     except:
#         print(code, 'não aceito no target em get_supported_languages colocando en')
#         languages = get_supported_languages(project, 'en')

#     for lang in languages:
#         if lang.language_code == code:
#             texts += [lang.display_name]
path = os.path.join(os.path.dirname(__file__), '..', 'json', 'supported_languages.json')
with open(path, 'r', encoding='utf-8') as f: texts = json.loads(f.read())
# with open('supported_languages.json', 'w', encoding='utf-8') as f: f.write(json.dumps(texts, ensure_ascii=False))
# input('texts serializados, enter para continuar, comente a geração da variável texts e carregue ela do arquivo')
options = []
for i in range(len(languages)):
    print(i,' ',end='')
    options += [{'text': texts[i], 
                    'title': translate_text(languages[i].language_code, languages[i].display_name), 
                    'value': languages[i].language_code + '_' + texts[i].lower() \
                        + '_' + translate_text(languages[i].language_code, 'buttons')}]
options_sorted = sorted(options, key=lambda x: x['text'])





# Processar todos os arquivos .html na pasta
process_html_files(directory_path, options_sorted)


"""Gerar o site

Ediçoes finais de arquivos e geração das
páginas para cada idioma.
"""

from bs4 import BeautifulSoup
from lib import *
from dotenv import load_dotenv

def main():
    load_dotenv()
    file_paths = ["index.html", 'buttons/index.html']
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
    with open('supported_languages.json', 'r', encoding='utf-8') as f: texts = json.loads(f.read())
    # with open('supported_languages.json', 'w', encoding='utf-8') as f: f.write(json.dumps(texts, ensure_ascii=False))
    # input('texts serializados, enter para continuar, comente a geração da variável texts e carregue ela do arquivo')
    options = []
    for i in range(len(languages)):
        options += [{'text': texts[i], 
                        'title': translate_text('pt', languages[i].display_name), 
                        'value': languages[i].language_code + '_' + texts[i].lower()}]
    options_sorted = sorted(options, key=lambda x: x['text'])
        
    for file_path in file_paths:
        """
        Tem que adicionar as últimas edições
        aos arquivos antes de iniciar a geração
        para outras linguagens
        """
        conteudo = ler_arquivo_local(file_path)
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
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(str(soup.prettify()))

    # input('Select adicionado aos arquivos.')
    print('Select adicionado aos arquivos.')

if __name__ == "__main__":
    main()

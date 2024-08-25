
"""Gerar o site

Ediçoes finais de arquivos e geração das
páginas para cada idioma.
"""
import threading

from bs4 import BeautifulSoup
from lib import *
from dotenv import load_dotenv

def main():
    a1 = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.env"))
    load_dotenv(dotenv_path=a1)
    file_paths = ["templates/index.html", 'templates/buttons/index.html']
    project = os.getenv("GOOGLE_CLOUD_PROJECT_ID")

    """Get nomes das línguas
    """
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

    a1 = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../dbs/", "supported_languages.json"))
    with open(a1, 'r', encoding='utf-8') as f: texts = json.loads(f.read())
    # with open('supported_languages.json', 'w', encoding='utf-8') as f: f.write(json.dumps(texts, ensure_ascii=False))
    # input('texts serializados, enter para continuar, comente a geração da variável texts e carregue ela do arquivo')
    a = []
    flag = True
    languages = get_supported_languages(project, 'en')
    for i in range(len(languages)):
        lang_code = languages[i].language_code
        lang_name = languages[i].display_name

        for file_path in file_paths:
            conteudo = ler_arquivo_local(file_path)
            if conteudo.startswith("Erro ao ler o arquivo:"):
                print(conteudo)
                return

            soup = BeautifulSoup(conteudo, 'html.parser')
            traduzir_textos(soup, lang_code)

            html_content = str(soup)
            translated_content = traduzir_placeholder_js(html_content, lang_code)

            soup = BeautifulSoup(translated_content, 'html.parser')
            translate_seo(soup, lang_code)
            extract_script(soup, 'change-lang-autos')

            if len(file_path.split('/')) > 2:
                file = translate_text(lang_code, file_path.split('/')[1]) + '.html'
            else:
                file = file_path.split('/')[1]
            salvar_arquivo(soup, texts[i], lang_code, file)
            print(f"Tradução {i}/{len(languages)} para {lang_name} ({lang_code}) salva em /!/{lang_code}/{texts[i]}/{file}.")
            with open('sitemap', 'a', encoding="utf-8") as f: f.write(f'https://tests.dev.br/!/{lang_code}/{texts[i]}/{file}\n')
            # input('Enter = Continuar')
    print('fim')
if __name__ == "__main__":
    main()

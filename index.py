from bs4 import BeautifulSoup
from lib import *

def main():
    file_paths = ["index.html", 'buttons/index.html']
    languages = list_languages()

    for file_path in file_paths:
        conteudo = ler_arquivo_local(file_path)
        if conteudo.startswith("Erro ao ler o arquivo:"):
            print(conteudo)
            return
        soup = BeautifulSoup(conteudo, 'lxml')
        options = []
        for lang in languages:
            options += [{'text': lang['name'], 'title': translate_text(lang['language'], lang['name']), 'value': lang['language']}]
        options_sorted = sorted(options, key=lambda x: x['text'])
        select = soup.new_tag('select', **{'class': 'form-select'})
        for option in options_sorted:
            opt = soup.new_tag('option', value=option['text'].lower().replace(' ', '_'), title=option['title'])
            opt.string = option['text']
            select.append(opt)
        navbar = soup.find(id='navbarNav')
        if navbar:
            navbar.append(select)
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(str(soup.prettify()))

    for lang in languages:
        lang_code = lang['language']
        lang_name = lang['name']

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
            salvar_arquivo(soup, lang_code)
            print(f"Tradução para {lang_name} ({lang_code}) salva em /lang/{lang_code}/index.html.")

if __name__ == "__main__":
    main()

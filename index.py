from bs4 import BeautifulSoup
from googletrans import Translator
from lib import *

def main():
    file_path = "index.html"
    idiomas = ['en', 'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'he', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu']
    conteudo = ler_arquivo_local(file_path)

    if conteudo.startswith("Erro ao ler o arquivo:"):
        print(conteudo)
        return

    translator = Translator()

    for lang in idiomas:
        # lang = 'pt'

        soup = BeautifulSoup(conteudo, 'html.parser')
        traduzir_textos(soup, translator, lang)

        html_content = str(soup)
        translated_content = traduzir_placeholder_js(html_content, translator, lang)

        soup = BeautifulSoup(translated_content, 'html.parser')
        translate_seo(soup, translator, lang)
        extract_script(soup, 'change-lang-autos')
        salvar_arquivo(soup, lang)
        print(f"Tradução para {lang} salva em /{lang}/index.html.")
        # input('Prosseguir = Enter.')

if __name__ == "__main__":
    main()

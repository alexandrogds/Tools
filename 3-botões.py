from bs4 import BeautifulSoup
from lib import *

def main():
    # Caminho do arquivo local
    file_path = "3-botões.html"
    
    # Idiomas para os quais queremos traduzir
    idiomas = ['en', 'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'he', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu']
    
    # Ler o conteúdo do arquivo
    conteudo = ler_arquivo_local(file_path)
    
    if conteudo.startswith("Erro ao ler o arquivo:"):
        print(conteudo)
        return
    
    # Analisar o HTML com BeautifulSoup
    soup = BeautifulSoup(conteudo, 'html.parser')
    
    for lang in idiomas:
        lang = 'pt'
        traduzir_textos(soup, lang)

        html_content = str(soup)
        aux = traduzir_placeholder_js(html_content, lang)
        translated_content = traduzir_script_js(aux, lang)

        translated_dir_name = translate_text('3-botões', lang)

        translate_seo(soup, lang)
        salvar_arquivo(BeautifulSoup(translated_content, 'html.parser'), lang, translated_dir_name)
        print(f"Tradução para {lang} salva em /{lang}/{translated_dir_name}/index.html.")
        input('Prosseguir = Enter.')

if __name__ == "__main__":
    main()

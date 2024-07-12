import os
from bs4 import BeautifulSoup, NavigableString
from googletrans import Translator
import re

def ler_arquivo_local(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            conteudo = file.read()
        return conteudo
    except Exception as e:
        return f"Erro ao ler o arquivo: {e}"

def traduzir_textos(soup, translator, dest_lang):
    for tag in soup.find_all(True):
        if tag.name not in ["style", "script"]:
            for content in tag.contents:
                if isinstance(content, NavigableString):
                    text = str(content).strip()
                    # print(text)
                    if text and not (tag.name == 'option' and tag.parent.name == 'select'):
                        # print(type(text), text)
                        translated_text = translator.translate(text, src='auto', dest=dest_lang).text
                        content.replace_with(translated_text)

    for option in soup.find_all('option'):
        if option.has_attr('title'):
            try:
                translated_title = translator.translate(str(option['title']).strip(), src='auto', dest=dest_lang).text
                if option['value'].lower() == dest_lang.lower():
                    option['selected'] = 'selected'
            except:
                print(type(str(option['title']).strip()), str(option['title']).strip())
                continue
            option['title'] = translated_title

def traduzir_placeholder_js(html_content, translator, dest_lang):
    # Expressão regular para encontrar o placeholder no script
    pattern = r'placeholder:\s*"[^"]*"'

    # Função de substituição para traduzir o placeholder
    def replace_placeholder(match):
        placeholder = match.group(0)
        original_text = re.search(r'"([^"]*)"', placeholder).group(1)
        translated_text = translator.translate(original_text, src='auto', dest=dest_lang).text
        return f'placeholder: "{translated_text}"'

    # Aplicar a substituição usando a expressão regular
    translated_content = re.sub(pattern, replace_placeholder, html_content)

    return translated_content

def traduzir_script_js(html_content, translator, lang_dest):
    # Expressão regular para encontrar o trecho de script JavaScript
    pattern = r'window\.location\.href\s*=\s*protocol\s*\+\s*"//"\s*\+\s*domain\s*\+\s*"/([^"]*)/"'

    # Função de substituição para traduzir o trecho de script
    def replace_script(match):
        script_code = match.group(0)
        directory = match.group(1)  # Captura o nome do diretório (excluindo as barras)
        translated_directory = translator.translate(directory, src='auto', dest=lang_dest).text
        return script_code.replace(f'/{directory}/', f'/{lang_dest}/{translated_directory}/')

    # Aplicar a substituição usando a expressão regular
    translated_content = re.sub(pattern, replace_script, html_content)

    return translated_content

def salvar_arquivo(soup, dest_lang, dir_name):
    dir_path = f"./{dest_lang}/{dir_name}"
    os.makedirs(dir_path, exist_ok=True)
    file_path = os.path.join(dir_path, "index.html")

    # Adicionar o metatag para garantir que a codificação UTF-8 é especificada
    if soup.head:
        meta_tag = soup.new_tag('meta', charset='utf-8')
        soup.head.insert(0, meta_tag)

    # Definir o atributo lang na tag <html> com o idioma traduzido
    if soup.html:
        soup.html['lang'] = dest_lang

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(soup.prettify())

def main():
    # Caminho do arquivo local
    file_path = "C:/Users/user/OtherProjects/tools/3-botões.html"
    
    # Idiomas para os quais queremos traduzir
    idiomas = ['af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'he', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu']
    
    # Ler o conteúdo do arquivo
    conteudo = ler_arquivo_local(file_path)
    
    if conteudo.startswith("Erro ao ler o arquivo:"):
        print(conteudo)
        return
    
    # Analisar o HTML com BeautifulSoup
    soup = BeautifulSoup(conteudo, 'html.parser')
    
    # Instanciar o tradutor
    translator = Translator()
    
    for lang in idiomas:
        # lang = 'ku'
        # Criar uma cópia do soup original
        soup_copy = BeautifulSoup(str(soup), 'html.parser')
        
        traduzir_textos(soup_copy, translator, lang)
        
        # try:
        #     # Traduzir textos para o idioma atual
        #     traduzir_textos(soup_copy, translator, lang)
        # except:
        #     print(f"Tradução para {lang} falhada.")
        #     continue

        # Traduzir placeholder dentro do script JavaScript
        html_content = str(soup_copy)
        aux = traduzir_placeholder_js(html_content, translator, lang)
        translated_content = traduzir_script_js(aux, translator, lang)

        # Nome do diretório traduzido
        translated_dir_name = translator.translate('3-botões', src='auto', dest=lang).text

        # Salvar o HTML traduzido no diretório correspondente
        salvar_arquivo(BeautifulSoup(translated_content, 'html.parser'), lang, translated_dir_name)
        print(f"Tradução para {lang} salva em /{lang}/{translated_dir_name}/index.html.")
        # input('Prosseguir = Enter.')

if __name__ == "__main__":
    main()

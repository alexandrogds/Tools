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
                print(f'Option {str(option['title']).strip()} ({option['value']}) não traduzido para {dest_lang}. -', type(str(option['title']).strip()))
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

def traduzir_script_js(html_content, translator, lang_dest, is_index=None):
    def replace_script(match):
        script_code = match.group(0)
        directory = match.group(1)  # Captura o nome do diretório (excluindo as barras)
        translated_directory = translator.translate(directory, src='auto', dest=lang_dest).text
        if is_index:
            return script_code.replace(f'/{directory}/', f'/lang/{lang_dest}/')
        else:
            return script_code.replace(f'/{directory}/', f'/lang/{lang_dest}/{translated_directory}/')

    # pattern = r'window\.location\.href\s*=\s*protocol\s*\+\s*"//"\s*\+\s*domain\s*\+\s*lang\s*\+\s*"/([^"]*)/"'
    # translated_content = re.sub(pattern, replace_script, html_content)

    padrao = r'"/3-botões/"'
    directory = '3-botões'
    if is_index:
        texto_substituto = f'"/lang/" + lang'
    else:
        translated_directory = translator.translate(directory, src='auto', dest=lang_dest).text
        texto_substituto = f'"/lang/" + lang + "/{translated_directory}/"'
    translated_content = re.sub(padrao, texto_substituto, html_content)

    pattern = r'link\.href\s*=\s*window.location.protocol\s*\+\s*"//"\s*\+\s*window.location.domain\s*\+\s*"/([^"]*)/"'
    translated_content = re.sub(pattern, replace_script, translated_content)

    return translated_content

def salvar_arquivo(soup, dest_lang, dir_name=None):
    if dir_name:
        dir_path = f"./lang/{dest_lang}/{dir_name}"
    else:
        dir_path = f"./lang/{dest_lang}"

    os.makedirs(dir_path, exist_ok=True)
    file_path = os.path.join(dir_path, "index.html")

    soup.find('meta', charset='utf-8')['charset'] = 'utf-8'

    soup.html['lang'] = dest_lang

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(soup.prettify())

def extract_script(soup, id):
    script_to_remove = soup.find('script', id=id)
    if script_to_remove:
        script_to_remove.extract()

def translate_seo(soup, translator, dest_lang):
    meta_description = soup.find('meta', {'name': 'description'})
    original_text = meta_description['content']
    translated_text = translator.translate(original_text, dest=dest_lang).text
    meta_description['content'] = translated_text

    meta_keywords = soup.find('meta', {'name': 'keywords'})
    original_text = meta_keywords['content']
    translated_text = translator.translate(original_text, dest=dest_lang).text
    meta_keywords['content'] = translated_text

    anchors = soup.find_all('a')
    images = soup.find_all('img')

    for anchor in anchors:
        original_text = anchor['title']
        translated_text = translator.translate(original_text, dest=dest_lang).text
        anchor['title'] = translated_text

    for img in images:
        original_text = img['alt']
        translated_text = translator.translate(original_text, dest=dest_lang).text
        img['alt'] = translated_text
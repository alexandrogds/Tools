import os
import re
from bs4 import NavigableString
from google.cloud import translate_v2 as translate
import json
from datetime import datetime

def list_languages() -> dict:
    """Lists all available languages."""
    translate_client = translate.Client()
    results = translate_client.get_languages()
    
    return results

def price(text):
    with open('price.json', 'r') as arquivo: dados = json.load(arquivo)
    now = datetime.now()
    if now.strftime('%d/%m/%Y') in dados:
        dados[now.strftime('%d/%m/%Y')] += len(text)
    else:
        dados[now.strftime('%d/%m/%Y')] = len(text)

def translate_text(target: str, text: str) -> str:
    """Translates text into the target language."""
    translate_client = translate.Client()
    result = translate_client.translate(text, target_language=target)
    price(text)
    return result["translatedText"]

def ler_arquivo_local(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            conteudo = file.read()
        return conteudo
    except Exception as e:
        return f"Erro ao ler o arquivo: {e}"

def traduzir_textos(soup, dest_lang):
    for tag in soup.find_all(True):
        if tag.name not in ["style", "script"]:
            for content in tag.contents:
                if isinstance(content, NavigableString):
                    text = str(content).strip()
                    # if text and not (tag.name == 'option' and tag.parent.name == 'select'):
                    if text:
                        translated_text = translate_text(dest_lang, text)
                        content.replace_with(translated_text)

    for option in soup.find_all('option'):
        if option.has_attr('title'):
            try:
                translated_title = translate_text(dest_lang, option['title'])
                if option['value'].lower() == dest_lang.lower():
                    option['selected'] = 'selected'
            except:
                continue
            option['title'] = translated_title

def traduzir_placeholder_js(html_content, dest_lang):
    pattern = r'placeholder:\s*"[^"]*"'

    def replace_placeholder(match):
        placeholder = match.group(0)
        original_text = re.search(r'"([^"]*)"', placeholder).group(1)
        translated_text = translate_text(dest_lang, original_text)
        return f'placeholder: "{translated_text}"'

    translated_content = re.sub(pattern, replace_placeholder, html_content)
    return translated_content

def traduzir_script_js(html_content, dest_lang, is_index=None):
    def replace_script(match):
        script_code = match.group(0)
        directory = match.group(1)
        translated_directory = translate_text(dest_lang, directory)
        if is_index:
            return script_code.replace(f'/{directory}/', f'/lang/{dest_lang}/')
        else:
            return script_code.replace(f'/{directory}/', f'/lang/{dest_lang}/{translated_directory}/')

    padrao = r'"/3-botões/"'
    directory = '3-botões'
    if is_index:
        texto_substituto = f'"/lang/" + lang'
    else:
        translated_directory = translate_text(dest_lang, directory)
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

def translate_seo(soup, dest_lang):
    meta_description = soup.find('meta', {'name': 'description'})
    original_text = meta_description['content']
    translated_text = translate_text(dest_lang, original_text)
    meta_description['content'] = translated_text

    meta_keywords = soup.find('meta', {'name': 'keywords'})
    original_text = meta_keywords['content']
    translated_text = translate_text(dest_lang, original_text)
    meta_keywords['content'] = translated_text

    anchors = soup.find_all('a')
    images = soup.find_all('img')

    for anchor in anchors:
        original_text = anchor['title']
        translated_text = translate_text(dest_lang, original_text)
        anchor['title'] = translated_text

    for img in images:
        original_text = img['alt']
        translated_text = translate_text(dest_lang, original_text)
        img['alt'] = translated_text

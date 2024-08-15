import os
import re
from bs4 import NavigableString
from google.cloud import translate
import json
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

def get_supported_languages(project_id: str = os.getenv("GOOGLE_CLOUD_PROJECT_ID"), 
                            display_language_code: str = "pt"):
    """Obtém uma lista de códigos de idiomas suportados e seus nomes no idioma especificado.

    Args:
        project_id: O ID do projeto do GCP.
        display_language_code: O código do idioma no qual os nomes dos idiomas serão exibidos.

    Returns:
        Uma lista de idiomas suportados com seus códigos e nomes.
    """
    client = translate.TranslationServiceClient()
    parent = f"projects/{project_id}/locations/global"
    response = client.get_supported_languages(parent=parent, display_language_code=display_language_code)

    # for language in response.languages:
    #     print(f"Código da Língua: {language.language_code}, Nome da Língua: {language.display_name}")

    return response.languages

def price(text):
    with open('price.json', 'r') as arquivo: dados = json.load(arquivo)
    now = datetime.now()
    if now.strftime('%d/%m/%Y') in dados:
        dados[now.strftime('%d/%m/%Y')] += len(text)
    else:
        dados[now.strftime('%d/%m/%Y')] = len(text)

def translate_text(target: str = '',
    text: str = "YOUR_TEXT_TO_TRANSLATE"):
    """Translating Text."""

    client = translate.TranslationServiceClient()

    location = "global"

    project_id = os.getenv("GOOGLE_CLOUD_PROJECT_ID")
    parent = f"projects/{project_id}/locations/{location}"

    response = client.translate_text(
        parent=parent,
        contents=[text],
        mime_type="text/plain",  # mime types: text/plain, text/html
        target_language_code=target,
    )
    return response.translations[0].translated_text

def ler_arquivo_local(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            conteudo = file.read()
        return conteudo
    except Exception as e:
        return f"Erro ao ler o arquivo: {e}"

def traduzir_textos(soup, dest_lang):
    a = soup.find_all(True)
    for i in range(len(a)):
        tag = a[i]
        if tag.name not in ["style", "script"]:
            b = tag.contents
            for j in range(len(b)):
                content = b[j]
                if isinstance(content, NavigableString):
                    text = str(content).strip()
                    # if text and not (tag.name == 'option' and tag.parent.name == 'select'):
                    if text:
                        translated_text = translate_text(dest_lang, text)
                        content.replace_with(translated_text)

    a = soup.find_all('option')
    for i in range(len(a)):
        option = a[i]
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

def salvar_arquivo(soup, lang_text, dest_lang, file, dir_name=None):
    if dir_name:
        dir_path = f"./#/{dest_lang}/{lang_text}/{dir_name}"
    else:
        dir_path = f"./#/{dest_lang}/{lang_text}"

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
        try:
            original_text = anchor['title']
        except:
            original_text = 'hello'
        translated_text = translate_text(dest_lang, original_text)
        try:
            anchor['title'] = translated_text
        except:
            pass

    for img in images:
        try:
            original_text = img['alt']
        except:
            original_text = 'hello'
        translated_text = translate_text(dest_lang, original_text)
        try:
            img['alt'] = translated_text
        except:
            pass

import os
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from googletrans import Translator

# Carregar variáveis de ambiente, se necessário
load_dotenv()

# Inicializar o tradutor
translator = Translator()

# Caminho base para busca dos arquivos HTML
base_path = r"C:\Users\user\Nova pasta (2)\Tools\res\raw\!"

# Caminho dos arquivos select
select_index_path = r"C:\Users\user\Nova pasta (2)\Tools\res\raw\dev_files\html\select_index.html"
select_buttons_path = r"C:\Users\user\Nova pasta (2)\Tools\res\raw\dev_files\html\select_buttons.html"

def traduzir_seletor(select_file, iso_code):
    with open(select_file, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')
        
    # Seleciona a primeira opção do select
    first_option = soup.select_one('select option')
    if first_option:
        # Traduz o texto da primeira opção
        translated_text = translator.translate(first_option.text, dest=iso_code).text
        # Substitui o texto da primeira opção
        first_option.string.replace_with(translated_text)
    
    return str(soup)

def processar_arquivos_html(base_path, select_index_path, select_buttons_path):
    pilha = [base_path]
    
    while pilha:
        current_path = pilha.pop()
        for root, dirs, files in os.walk(current_path):
            iso_code = os.path.basename(root)
            
            # Verifica se o nome da pasta corresponde a um código ISO 639-1
            if len(iso_code) == 2 or True:
                for file_name in files:
                    if file_name.endswith('.html'):
                        file_path = os.path.join(root, file_name)
                        
                        # Carregar o arquivo HTML da subpasta correspondente
                        with open(file_path, 'r', encoding='utf-8') as file:
                            soup = BeautifulSoup(file, 'html.parser')
                        
                        # Traduzir e adicionar os selects
                        select_index_html = traduzir_seletor(select_index_path, iso_code)
                        select_buttons_html = traduzir_seletor(select_buttons_path, iso_code)
                        
                        # Adicionar os selects traduzidos ao final do arquivo
                        soup.body.append(BeautifulSoup(select_index_html, 'html.parser'))
                        soup.body.append(BeautifulSoup(select_buttons_html, 'html.parser'))
                        
                        # Salvar as alterações no arquivo
                        with open(file_path, 'w', encoding='utf-8') as file:
                            file.write(str(soup))
            
            # Adicionar os subdiretórios à pilha para processá-los
            for dir_name in dirs:
                pilha.append(os.path.join(root, dir_name))
                
            # Não precisa continuar a iteração após processar o primeiro root em os.walk
            break

if __name__ == "__main__":
    processar_arquivos_html()

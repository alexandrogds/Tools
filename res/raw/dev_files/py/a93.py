import os
from bs4 import BeautifulSoup
from lib import *

# Defina o caminho base
base_path = r'C:\Users\user\Nova pasta (2)\Tools\res\raw\!'

# Caminho dos arquivos select
select_index_path = r'C:\Users\user\Nova pasta (2)\Tools\res\raw\dev_files\html\select_index.html'
select_buttons_path = r'C:\Users\user\Nova pasta (2)\Tools\res\raw\dev_files\html\select_buttons.html'

# Função para traduzir a primeira opção de cada select
def traduzir_primeira_opcao(soup, language_code):
    selects = soup.find_all('select')
    for select in selects:
        first_option = select.find('option')
        if first_option:
            translated_text = translate_text(language_code, first_option.text)
            first_option.string = translated_text

pilha = [base_path]
while pilha:
    current_path = pilha.pop()

    # Percorrer as subp astas
    for root, dirs, files in os.walk(current_path):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)

                # Abrir e carregar o conteúdo HTML
                with open(file_path, 'r', encoding='utf-8') as f:
                    soup = BeautifulSoup(f, 'html.parser')

                # Obter o código de idioma da subpasta
                language_code = os.path.dirname(root)
                language_code = os.path.basename(language_code)
                print(language_code)

                # Carregar os arquivos select
                with open(select_index_path, 'r', encoding='utf-8') as f:
                    select_index_soup = BeautifulSoup(f, 'html.parser')
                with open(select_buttons_path, 'r', encoding='utf-8') as f:
                    select_buttons_soup = BeautifulSoup(f, 'html.parser')

                # Traduzir as primeiras opções
                traduzir_primeira_opcao(select_index_soup, language_code)
                traduzir_primeira_opcao(select_buttons_soup, language_code)

                # Adicionar os selects traduzidos ao div com id "select"
                div_select = soup.find('div', {'id': 'select'})
                if div_select:
                    div_select.clear()
                    div_select.append(select_index_soup)
                    div_select.append(select_buttons_soup)

                # Salvar o arquivo modificado
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(str(soup))
                
        # Adicionar os subdiretórios à pilha para processá-los
        for dir_name in dirs:
            pilha.append(os.path.join(root, dir_name))
            
        # Não precisa continuar a iteração após processar o primeiro root em os.walk
        break

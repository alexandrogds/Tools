import os
from bs4 import BeautifulSoup
from lib import *

# Defina o caminho base
base_path = r'C:\Users\user\Nova pasta (2)\Tools\res\raw\!'

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
                # if file == 'index.html':
                #     continue
                # file_path = os.path.join(root, 'index.html')
                file_path = os.path.join(root, file)

                def b():
                    # Abrir e carregar o conteúdo HTML
                    with open(file_path, 'r', encoding='utf-8') as f:
                        soup = BeautifulSoup(f, 'html.parser')

                    sa = os.path.dirname(root)
                    lang = os.path.basename(root)
                    language_code = os.path.basename(sa)
                    # print(sa)
                    # print(root)
                    # print(lang)
                    nome_base, extensao = os.path.splitext(file)
                    # print(nome_base)
                    # input()
                    # Carregar os arquivos select
                    # with open(path1, 'r', encoding='utf-8') as f:
                    #     select_index_soup = BeautifulSoup(f, 'html.parser')
                    # with open(path2, 'r', encoding='utf-8') as f:
                    #     select_buttons_soup = BeautifulSoup(f, 'html.parser')
                    if file == 'index.html':
                        logo =f"""    <div>
     <a class="navbar-brand">
      <img class="img-fluid" src="/res/drawable/nodpi/logo.png"/>
     </a>
    </div>"""
                    else:
                        logo =f"""    <div>
     <a class="navbar-brand">
      <img class="img-fluid" src="\res\drawable\nodpi\3-buttons-e.png"/>
     </a>
    </div>"""
                    title_home= 'Ir para a página principal.'
                    home_link = ''
                    text_home = 'Página Principal'
                    href_buttons = ''
                    title_buttons = 'Ir para a ferramenta 3 botões'
                    text_buttons = '3 Botões'
                    logo += f'<ul class="navbar-nav ms-auto"><li class="nav-item"><a class="nav-link active" id="menu-item-home" aria-current="page" href="{home_link}" title="{title_home}">{text_home}</a></li><li class="nav-item"><a class="nav-link" href="{href_buttons}" title="{title_buttons}">{text_buttons}</a></li></ul>'
                    a = '3 Buttons'
                    a = translate_text(language_code, a)
                    f = f"""<div class="mt-3"><a class="btn me-2" title="Go to tool 3 Buttons." href="/{language_code}/{lang}/{file}" id="b">{a}</a></div>"""
                    select_buttons_soup = BeautifulSoup(f, 'html.parser')

                    # Adicionar os selects traduzidos ao div com id "select"
                    div_select = soup.find('div', {'id': 'menu'})
                    if div_select:
                        div_select.clear()
                        # row = soup.new_tag('div')
                        # row['class'] = 'row'
                        div_select.append(select_buttons_soup)

                    # Salvar o arquivo modificado
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(soup.prettify())
                    
                    print(f"Arquivo processado: {file_path}")
                b()
                    
        # Adicionar os subdiretórios à pilha para processá-los
        for dir_name in dirs:
            pilha.append(os.path.join(root, dir_name))
            
        # Não precisa continuar a iteração após processar o primeiro root em os.walk
        break

file_path = r'C:\Users\user\Nova pasta (2)\Tools\res\layout\index.html'
b()
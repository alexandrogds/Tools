import os
import re
from bs4 import BeautifulSoup

# Função para substituir o conteúdo dos arquivos
def replace_content(file_path, replacements):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

# Função para remover linhas específicas
def remove_lines(file_path, lines_to_remove):
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    with open(file_path, 'w', encoding='utf-8') as file:
        skip = False
        for i, line in enumerate(lines):
            if skip:
                skip = False
                continue
            if any(line.strip().startswith(line_to_remove) for line_to_remove in lines_to_remove):
                # Verifica se a próxima linha é a linha de fechamento
                if i + 1 < len(lines) and lines[i + 1].strip() == '</script>':
                    skip = True
                    continue
            file.write(line)

# Função para adicionar elementos ao HTML usando BeautifulSoup
def add_html_element(file_path, id_name, new_element):
    with open(file_path, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')
    
    element = soup.find(id=id_name)
    if element:
        element.append(BeautifulSoup(new_element, 'html.parser'))
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

# Caminho da pasta
base_path = r'C:\Users\user\Nova pasta (2)\Tools\res\raw\'

# Replacements a serem feitos
replacements = {
    '/styles/lib.css': '/res/raw/dev_files/css/lib.css',
    '/scripts/lib.js': '/res/raw/dev_files/js/lib.js',
    '/scripts/url.js': '/res/raw/dev_files/js/url.js',
    '/scripts/menu.js': '/res/raw/dev_files/js/menu.js',
    '/scripts/begin/links.js': '/res/raw/dev_files/js/begin/links.js'
}

# Linhas a serem removidas
lines_to_remove = [
    '<script src="/scripts/begin/logo.js">',
    '</script>'
]

# HTML elements a serem adicionados
index_html_element = '<a class="navbar-brand" href="http://localhost" title="Go to home page."><img src="/res/drawable/nodpi/logo.png" alt="Website logo." class="img-fluid"></a>'
other_html_element = '<a class="navbar-brand" href="http://localhost/" title="Go to home page."><img src="/res/drawable/nodpi/3-buttons-e.png" alt="Website logo." class="img-fluid"></a>'

# Caminho da pasta
for root, dirs, files in os.walk(base_path):
    for file in files:
        file_path = os.path.join(root, file)
        if file.endswith('.html'):
            if 'index.html' in file_path:
                add_html_element(file_path, 'menu', index_html_element)
            else:
                add_html_element(file_path, 'menu', other_html_element)
        
        # Substitui o conteúdo dos arquivos
        replace_content(file_path, replacements)
        
        # Remove linhas específicas
        remove_lines(file_path, lines_to_remove)

print("Alterações concluídas!")

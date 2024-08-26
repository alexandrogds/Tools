import os
from bs4 import BeautifulSoup

# Caminho para o arquivo HTML com o seletor
select_file_paths = [r'C:\Users\user\Nova pasta (2)\Tools\res\raw\dev_files\html\select_index.html',
r'C:\Users\user\Nova pasta (2)\Tools\res\raw\dev_files\html\select_buttons.html']

# Função para carregar o seletor do arquivo HTML
def load_select():
    with open(select_file_path, 'r', encoding='utf-8') as file:
        return file.read()

# Função para adicionar ou substituir o seletor no HTML
def add_select_to_html(html_content, select_html):
    soup = BeautifulSoup(html_content, 'html.parser')
    select_element = soup.find(id='select')
    if select_element:
        # Substituir o conteúdo do seletor existente
        select_element.append(BeautifulSoup(select_html, 'html.parser'))
        return str(soup)
    return html_content

# Caminho da pasta onde estão os arquivos HTML
folder_path = r'C:\Users\user\Nova pasta (2)\Tools\res\raw\!'

# Função para atualizar arquivos HTML na pasta
def update_html_files(folder_path):
    # Carregar o seletor
    select_html = load_select()
    
    # Usar uma fila para uma abordagem iterativa
    directories = [folder_path]
    
    while directories:
        current_dir = directories.pop()
        
        for root, dirs, files in os.walk(current_dir):
            for file in files:
                if file.endswith('.html'):
                    file_path = os.path.join(root, file)
                    with open(file_path, 'r', encoding='utf-8') as f:
                        html_content = f.read()
                    
                    # Adicionar ou substituir o seletor no conteúdo HTML
                    updated_html_content = add_select_to_html(html_content, select_html)
                    
                    # Salvar o conteúdo atualizado de volta ao arquivo
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(updated_html_content)
                    print(f"Arquivo processado: {file_path}")
                    
            # Adicionar subdiretórios à fila
            directories.extend(os.path.join(root, d) for d in dirs)

update_html_files(folder_path)
print("Atualização concluída.")

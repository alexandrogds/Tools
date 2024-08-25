import os
from bs4 import BeautifulSoup

def editar_selects_html(diretorio_base):
    code = []
    paths = []
    langs = []
    files_path = []
    for root, dirs, files in os.walk(diretorio_base):
        for dir in dirs:
            code += [dir]
            paths += [os.path.join(root, dir)]
        break
    for path in paths:
        for root, dirs, files in os.walk(path):
            if len(dirs) > 0:
                langs += [dirs[0]]

    for root, dirs, files in os.walk(diretorio_base):
        if len(files) != 0:
            files_path += [[os.path.join(root, files[0]), os.path.join(root, files[1])]]
    # print(len(files_path), len(code), len(langs))
    # print(files_path[:4])
    # return
    # for p in files_path:
    #     print(p, end=' ')
    for i in range(len(code)):
        for file in files_path[i]:
            print(i+1, '/', 250)
            editar_html(file, code[i] + '_' + langs[i])

def editar_html(file_path, value):
    with open(file_path, 'r', encoding='utf-8') as file:
        soup = BeautifulSoup(file, 'html.parser')

    # Encontrar todos os elementos <select>
    selects = soup.find_all('select')
    for select in selects:
        # Atualizar o atributo 'value' de todas as opções no <select>
        for option in select.find_all('option'):
            option['value'] = value

    # Escrever de volta no arquivo HTML
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

diretorio_base = r'C:\Windows\Temp\tools\!'
editar_selects_html(diretorio_base)


import os

# Caminho base
base_path = r'C:\Windows\Temp\tools\res'

# Estruturas de subpastas
drawable = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi', 'nodpi', 'anydpi', 'land', 'port']
mipmap = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi', 'nodpi', 'anydpi']
layout = ['port', 'large', 'sw600dp']
values = ['land', 'port', 'v21', 'es', 'pt', 'sw600d']

# Função para criar pastas e arquivos
def create_structure(base_path, folder_list):
    for folder in folder_list:
        folder_path = os.path.join(base_path, folder)
        os.makedirs(folder_path, exist_ok=True)
        file_path = os.path.join(folder_path, 'none.txt')
        with open(file_path, 'w') as file:
            file.write('void')

# Criação das estruturas de pastas e arquivos
create_structure(os.path.join(base_path, 'drawable'), drawable)
create_structure(os.path.join(base_path, 'mipmap'), mipmap)
create_structure(os.path.join(base_path, 'layout'), layout)
create_structure(os.path.join(base_path, 'values'), values)

print("Pastas e arquivos criados com sucesso.")

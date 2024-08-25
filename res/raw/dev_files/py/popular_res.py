import os

# Definindo o caminho base
base_path = r'C:\Windows\Temp\tools\res'

# Definindo as subpastas para cada categoria
subpastas = {
    'drawable': ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi', 'nodpi', 'anydpi', 'land', 'port'],
    'mipmap': ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi', 'nodpi', 'anydpi'],
    'layout': ['port', 'large', 'sw600dp'],
    'values': ['land', 'port', 'v21', 'es', 'pt', 'sw600dp']
}

# Criando as subpastas
for category, folders in subpastas.items():
    category_path = os.path.join(base_path, category)
    # Verifica se o diretório da categoria existe, se não, cria
    os.makedirs(category_path, exist_ok=True)
    for folder in folders:
        folder_path = os.path.join(category_path, folder)
        os.makedirs(folder_path, exist_ok=True)

print("Subpastas criadas com sucesso!")

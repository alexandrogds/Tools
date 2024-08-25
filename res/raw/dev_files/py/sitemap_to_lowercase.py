import os

def convert_file_to_lowercase(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content.lower())

        print(f"Conteúdo convertido para lowercase: {file_path}")

    except Exception as e:
        print(f"Erro ao processar o arquivo {file_path}: {e}")

path_to_convert = r'C:\Windows\Temp\tools\sitemap'
convert_file_to_lowercase(path_to_convert)

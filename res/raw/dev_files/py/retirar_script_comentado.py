import os

def remove_line_17_from_index(path):
    for root, dirs, files in os.walk(path):
        for file in files:
            if file == 'index.html':
                file_path = os.path.join(root, file)
                remove_line_from_file(file_path, 17)
        for dir in dirs:
            remove_line_17_from_index(os.path.join(root, dir))

def remove_line_from_file(file_path, line_number):
    try:
        with open(file_path, 'r', encoding="utf-8") as file:
            lines = file.readlines()

        # Verifica se o arquivo tem ao menos 17 linhas
        if len(lines) >= line_number:
            del lines[line_number - 1]

        with open(file_path, 'w', encoding="utf-8") as file:
            file.writelines(lines)

        print(f"Linha 17 removida de: {file_path}")

    except Exception as e:
        print(f"Erro ao processar o arquivo {file_path}: {e}")

# Exemplo de uso:
path_to_search = r'C:\Windows\Temp\tools\!'
remove_line_17_from_index(path_to_search)

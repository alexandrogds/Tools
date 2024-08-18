import os
import re

# Definindo a regex
pattern = re.compile(r'&lt;script src="\/scripts\/redirect-to-lang\.js" id="[^"]*"&gt;&lt;\/script&gt;')

# Função para processar arquivos recursivamente
def remove_script_tags_from_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file == "index.html":
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Remover as tags que correspondem ao padrão
                new_content = re.sub(pattern, '', content)
                
                # Reescreve o arquivo apenas se houver alterações
                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Atualizado: {file_path}")
        for dir in dirs:
            remove_script_tags_from_files(os.path.join(root, dir))

# Especificando o diretório de início
directory_path = r"C:\Windows\Temp\tools\!"  # Substitua pelo caminho correto

# Executando a função
remove_script_tags_from_files(directory_path)

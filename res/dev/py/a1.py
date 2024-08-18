
"""

abrir todos os arquivos recurcivamente de um path e pesquisar por &lt;script src="/scripts/redirect-to-lang.js" id="change-lang-autos"&gt;&lt;/script&gt; se encontrar excluir.
"""

import os

def remove_script_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    script_tag = '&lt;script src="/scripts/redirect-to-lang.js" id="change-lang-autos"&gt;&lt;/script&gt;'
                 '&lt;script src="/scripts/redirect-to-lang.js" id="লেং-অটোসমূহ সলনি কৰক"&gt;&lt;/script&gt;'
    if script_tag in content:
        content = content.replace(script_tag, '')
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Removido o script de: {file_path}")

def search_and_remove_script(root_dir):
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            file_path = os.path.join(subdir, file)
            if file_path.endswith(".html"):  # Alterar a extensão se necessário
                remove_script_from_file(file_path)
        for dir in dirs:
            search_and_remove_script(os.path.join(subdir, dir))

# Substitua '/caminho/para/diretorio' pelo diretório onde deseja realizar a pesquisa
search_and_remove_script(r'C:\Windows\Temp\tools\!')

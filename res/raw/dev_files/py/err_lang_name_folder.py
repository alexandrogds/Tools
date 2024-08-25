import os

def rename_dirs_to_lowercase(path):
    for root, dirs, files in os.walk(path, topdown=False):
        for dir_name in dirs:
            current_path = os.path.join(root, dir_name)
            new_path = os.path.join(root, dir_name.lower())
            if current_path != new_path:
                os.rename(current_path, new_path)
                print(f"Renomeado: {current_path} -> {new_path}")

# Exemplo de uso:
path_to_rename = r'C:\Windows\Temp\tools\!'
rename_dirs_to_lowercase(path_to_rename)

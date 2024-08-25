#!/bin/bash

rename_dirs_to_lowercase() {
    local path="$1"
    
    # Encontra todos os diretórios, faz o loop por eles do mais profundo para o mais superficial
    find "$path" -depth -type d | while read dir; do
        # Converte o nome do diretório para minúsculas
        new_dir="$(dirname "$dir")/$(basename "$dir" | tr '[:upper:]' '[:lower:]')"
        if [ "$dir" != "$new_dir" ]; then
            mv "$dir" "$new_dir"
            echo "Renomeado: $dir -> $new_dir"
        fi
    done
}

# Exemplo de uso:
path_to_rename="/var/www/Tools/!"
rename_dirs_to_lowercase "$path_to_rename"

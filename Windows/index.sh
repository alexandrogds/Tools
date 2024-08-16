#!/bin/bash

# Defina o URL do arquivo a ser baixado
URL="https://update.code.visualstudio.com/latest/win32-x64/stable"

# Defina o nome do arquivo onde o conteúdo será salvo
OUTPUT_FILE="VSCodeSetup-x64.exe"

# Use curl para baixar o arquivo
curl -L -o "$OUTPUT_FILE" "$URL"

# Mostre uma mensagem indicando que o download foi concluído
echo "O arquivo foi baixado para $OUTPUT_FILE"

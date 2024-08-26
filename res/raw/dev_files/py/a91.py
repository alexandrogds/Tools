import os
from bs4 import BeautifulSoup
from dotenv import load_dotenv

# Carregar variáveis de ambiente, se necessário
load_dotenv()

# Inicializar o tradutor

# Caminho base para busca dos arquivos HTML
base_path = r"C:\Users\user\Nova pasta (2)\Tools\res\raw\!"

def processar_arquivos_html():
    pilha = [base_path]
    
    while pilha:
        current_path = pilha.pop()
        for root, dirs, files in os.walk(current_path):
                for file_name in files:
                    if file_name.endswith('.html'):
                        file_path = os.path.join(root, file_name)
                        
                        # Carregar o arquivo HTML da subpasta correspondente
                        with open(file_path, 'r', encoding='utf-8') as file:
                            soup = BeautifulSoup(file, 'html.parser')
                        
                        with open(file_path, 'w', encoding='utf-8') as file:
                            file.write(soup.prettify())
                        print(f"Arquivo processado: {file_path}")
            
                # Adicionar os subdiretórios à pilha para processá-los
                for dir_name in dirs:
                    pilha.append(os.path.join(root, dir_name))
                    
                # Não precisa continuar a iteração após processar o primeiro root em os.walk
                break

if __name__ == "__main__":
    processar_arquivos_html()

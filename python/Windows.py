#!/usr/bin/env python3

print('ok')
user_agent = os.environ.get('HTTP_USER_AGENT', '')
print(user_agent)
exit()

import os
import subprocess

script_filename = 'Windows.sh'
os.chmod(script_filename, 0o755)

# Executa o script bash e captura a saída
try:
    result = subprocess.run([f'./{script_filename}'], shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    output = result.stdout
    error = result.stderr
except subprocess.CalledProcessError as e:
    output = e.stdout
    error = e.stderr

print("Saída:")
print(output)
print("Erros:")
print(error)

# Carregar assembly necessário
Add-Type -AssemblyName System.Windows.Forms

# Função para digitar uma string
function Send-Keys {
    param (
        [string]$Text
    )
    
    [System.Windows.Forms.SendKeys]::SendWait($Text)
}

# Verifica se um argumento foi passado
if ($args.Count -eq 0) {
    Write-Error "Nenhuma string fornecida. Por favor, passe um texto como argumento."
    exit
}

# Pega o texto do argumento
$email = $args[0]

# Chama a função para digitar a string
Send-Keys -Text $email

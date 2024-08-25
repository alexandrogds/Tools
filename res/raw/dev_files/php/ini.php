<?php
// Obter o caminho do arquivo php.ini principal
$loaded_ini_file = php_ini_loaded_file();

// Obter uma lista dos arquivos de configuração adicionais que foram carregados
$scanned_ini_files = php_ini_scanned_files();

echo "Arquivo php.ini carregado: " . $loaded_ini_file . PHP_EOL;

if ($scanned_ini_files) {
    echo "Arquivos php.ini adicionais carregados:" . PHP_EOL;
    echo $scanned_ini_files . PHP_EOL;
} else {
    echo "Nenhum arquivo php.ini adicional foi carregado." . PHP_EOL;
}
?>

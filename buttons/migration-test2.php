<?php
try {
    // Caminho absoluto para o banco de dados
    $dbPath = __DIR__ . '/../database.db';
    $db = new PDO('sqlite:' . $dbPath);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Criar a tabela se não existir
    $db->exec("CREATE TABLE IF NOT EXISTS buttons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT NOT NULL,
        button INTEGER DEFAULT 0,
        color TEXT NOT NULL,
        clicks INTEGER DEFAULT 0,
        UNIQUE(user, button),
        CHECK(color IN ('btn-danger', 'btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-dark'))
    )");

    // Lista de botões com cores e ícones
    $buttons = [
        ['color' => 'btn-danger'],
        ['color' => 'btn-primary'],
        ['color' => 'btn-success'],
        ['color' => 'btn-warning'],
        ['color' => 'btn-info'],
        ['color' => 'btn-dark']
    ];

    // Preparar a inserção dos registros
    $stmt = $db->prepare('INSERT INTO buttons (user, button, color) VALUES (:user, :button, :color)');

    // Inserir registros para o usuário "alexandrogonsan"
    $i = 0;
    foreach ($buttons as $button) {
        $i++;
        try {
            $stmt->execute([
                ':user' => 'alexandrogonsan',
                ':button' => $i,
                ':color' => $button['color']
            ]);
        } catch (PDOException $e) {
            // Se houver um erro de chave duplicada, ignore
            if ($e->getCode() != '23000') { // Código de erro para chave duplicada
                throw $e;
            }
        }
    }

    echo "Registros inseridos com sucesso no banco de dados: " . $dbPath . PHP_EOL;
} catch (PDOException $e) {
    echo "Erro ao acessar o banco de dados: " . $e->getMessage() . PHP_EOL;
}
?>

<?php
try {
    // Conectar ao banco de dados SQLite
    $db = new PDO('sqlite:' . __DIR__ . '\..\database.db');

    // Lista de botões com cores e ícones
    $colors = ['btn-danger','btn-primary','btn-success','btn-warning','btn-info','btn-dark'];

    // Preparar a inserção dos registros
    $stmt = $db->prepare('INSERT INTO buttons (user, button, color) VALUES (:user, :button, :color)');

    // Inserir registros para o usuário "alex"
    $i = 0;
    foreach ($colors as $color) {
        $i++;
        $stmt->execute([
            ':user' => 'alexandrogonsan',
            ':button' => $i,
            ':color' => $color
        ]);
    }

    echo "Registros inseridos com sucesso.";
} catch (PDOException $e) {
    echo "Erro ao acessar o banco de dados: " . $e->getMessage();
}
?>
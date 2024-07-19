<?php
try {
    // Caminho absoluto para o banco de dados
    $dbPath = __DIR__ . '/../database.db';
    $db = new PDO('sqlite:' . $dbPath);

    // Verificar se a tabela 'buttons' existe
    $result = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name='buttons'");
    if ($result->fetchColumn() === false) {
        throw new Exception("A tabela 'buttons' não existe no banco de dados: " . $dbPath);
    }

    // Preparar a consulta
    $stmt = $db->prepare('SELECT button, color, clicks FROM buttons WHERE user = :user');
    $stmt->execute([':user' => 'alex']);

    // Buscar e exibir os resultados
    $buttons_data = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $buttons_data[] = array(
            'button' => $row['button'],
            'color' => $row['color'],
            'clicks' => $row['clicks']
        );
    }

    // Exibir os dados dos botões
    foreach ($buttons_data as $button) {
        echo "Button: " . $button['button'] . " - Color: " . $button['color'] . " - clicks: " . $button['clicks'] . "<br>";
    }
} catch (PDOException $e) {
    echo "Erro ao acessar o banco de dados: " . $e->getMessage() . PHP_EOL;
} catch (Exception $e) {
    echo $e->getMessage() . PHP_EOL;
}
?>

<?php

// Conexão com o banco de dados SQLite
$db = new SQLite3('database.db');

// Verificar se foi passado o parâmetro id_user
if (isset($_GET['id_user'])) {
    $id_user = $_GET['id_user'];

    // Consulta para obter os dados dos botões do usuário
    $query = "SELECT button_id, color, count FROM buttons WHERE id_user = :id_user";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':id_user', $id_user, SQLITE3_TEXT);
    
    $result = $stmt->execute();

    // Array para armazenar os dados dos botões
    $buttons_data = array();

    // Iterar pelos resultados e adicionar ao array
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $buttons_data[] = array(
            'button_id' => $row['button_id'],
            'color' => $row['color'],
            'count' => $row['count']
        );
    }

    // Fechar a conexão
    $db->close();

    // Retornar os dados em formato JSON
    header('Content-Type: application/json');
    echo json_encode($buttons_data);
} else {
    // Caso não seja passado o parâmetro id_user, retornar erro
    header('HTTP/1.1 400 Bad Request');
    echo "ID do usuário não fornecido.";
}

?>

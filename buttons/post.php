<?php

// Conexão com o banco de dados SQLite
$db = new SQLite3('database.db');

// Verificar se foi passado o método POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Receber os parâmetros do POST
    $id_user = $_POST['id_user'];
    $button_id = $_POST['button_id'];
    $color = $_POST['color'];
    $count = $_POST['count'];

    // Consulta SQL para inserir ou atualizar os dados do botão
    $query = "INSERT INTO buttons (id_user, button_id, color, count) 
              VALUES (:id_user, :button_id, :color, :count)
              ON CONFLICT(id_user, button_id) DO UPDATE SET color = :color, count = :count";
    
    $stmt = $db->prepare($query);
    $stmt->bindValue(':id_user', $id_user, SQLITE3_TEXT);
    $stmt->bindValue(':button_id', $button_id, SQLITE3_TEXT);
    $stmt->bindValue(':color', $color, SQLITE3_TEXT);
    $stmt->bindValue(':count', $count, SQLITE3_INTEGER);
    
    $result = $stmt->execute();

    // Verificar se a operação foi bem sucedida
    if ($result) {
        // Retornar resposta de sucesso
        header('Content-Type: application/json');
        echo json_encode(array('success' => true));
    } else {
        // Retornar erro em caso de falha
        header('HTTP/1.1 500 Internal Server Error');
        echo "Falha ao atualizar o botão.";
    }
} else {
    // Caso não seja um método POST, retornar erro
    header('HTTP/1.1 400 Bad Request');
    echo "Método não suportado.";
}

// Fechar a conexão
$db->close();

?>

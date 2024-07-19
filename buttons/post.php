<?php

// Conexão com o banco de dados SQLite
$db = new PDO('sqlite:' . __DIR__ . '\..\database.db');

// Receber os parâmetros do POST
$id_user = $_POST['user'];
$button_id = $_POST['button'];
$color = $_POST['color'];
$count = $_POST['count'];

// Consulta SQL para inserir ou atualizar os dados do botão
$query = "INSERT INTO buttons (user, button, color, clicks) 
            VALUES (:user, :button, :color, :clicks)
            ON CONFLICT(user, button) DO UPDATE SET color = :color, clicks = :clicks";

$stmt = $db->prepare($query);
$stmt->bindValue(':user', $id_user, SQLITE3_TEXT);
$stmt->bindValue(':button', $button_id, SQLITE3_TEXT);
$stmt->bindValue(':color', $color, SQLITE3_TEXT);
$stmt->bindValue(':clicks', $count, SQLITE3_INTEGER);

$result = $stmt->execute();

header('Content-Type: application/json');
echo json_encode(array('success' => true));

?>

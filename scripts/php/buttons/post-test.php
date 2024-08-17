<?php

// Conexão com o banco de dados SQLite
$db = new PDO('sqlite:' . __DIR__ . '\..\database.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Receber os parâmetros do POST
$user = $_POST['user'];
$button = $_POST['button'];
$color = $_POST['color'];
$clicks = $_POST['clicks'];

// Consulta SQL para inserir ou atualizar os dados do botão
$query = "INSERT INTO buttons (user, button, color, clicks) 
            VALUES (:user, :button, :color, :clicks)
            ON CONFLICT(user, button) DO UPDATE SET color = :color, clicks = :clicks";

$stmt = $db->prepare($query);
$stmt->bindValue(':user', $user, PDO::PARAM_STR);
$stmt->bindValue(':button', $button, PDO::PARAM_INT);
$stmt->bindValue(':color', $color, PDO::PARAM_STR);
$stmt->bindValue(':clicks', $clicks, PDO::PARAM_INT);

$result = $stmt->execute();

header('Content-Type: application/json');
echo json_encode(array('success' => true));

?>

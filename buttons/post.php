<?php
$dbPath = __DIR__ . '/../database.db';
$db = new PDO('sqlite:' . $dbPath);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$input = json_decode(file_get_contents('php://input'), true);
$user = $input['user'];
$button = $input['button'];
$color = $input['color'];
$clicks = $input['clicks'];
$query = "INSERT INTO buttons (user, button, color, clicks) 
            VALUES (:user, :button, :color, :clicks)
            ON CONFLICT(user, button) DO UPDATE SET color = :color, clicks = :clicks";
$stmt = $db->prepare($query);
$stmt->bindValue(':user', $user, PDO::PARAM_STR);
$stmt->bindValue(':button', $button, PDO::PARAM_INT);
$stmt->bindValue(':color', $color, PDO::PARAM_STR);
$stmt->bindValue(':clicks', $clicks, PDO::PARAM_INT);
$stmt->execute();
header('Content-Type: application/json');
echo json_encode(['success' => true]);
?>

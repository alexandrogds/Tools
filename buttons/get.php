<?php
$db = new PDO('sqlite:' . __DIR__ . '\..\database.db');
$query = "SELECT button, color, clicks FROM buttons WHERE user = :user AND voting = :voting";
$stmt = $db->prepare($query);
$stmt->execute([':user' => $_GET['user'], ':voting' => $_GET['voting']]);
$buttons_data = array();
$buttons_data = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $buttons_data[] = array(
        'button' => $row['button'],
        'color' => $row['color'],
        'clicks' => $row['clicks']
    );
}
header('Content-Type: application/json');
echo json_encode($buttons_data);
?>

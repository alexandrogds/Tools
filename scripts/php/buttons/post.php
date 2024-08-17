<?php
$dbPath = __DIR__ . '/../database.db';
$db = new PDO('sqlite:' . $dbPath);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$input = json_decode(file_get_contents('php://input'), true);
$user = $input['user'];
$voting = $input['voting'];
$button = $input['button'];
$color = $input['color'];
$clicks = $input['clicks'];
$pass = $input['pass'];
if ($pass != '') {
    $sql = "SELECT * FROM user WHERE user = :user AND pass = :pass";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user', $user);
    $stmt->bindParam(':pass', $pass);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (count($result) > 0) {
        $access = true;
    } else {
        $access = false;
    }
}
if (isset($access) && $access == false) {
    echo 1;
    exit();
}
if ($clicks == null && $color != null) {
    echo 12;
    // alterar color
    $query = "UPDATE buttons SET color = :color WHERE voting = :voting AND button= :button";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':voting', $voting, PDO::PARAM_STR);
    $stmt->bindValue(':button', $button, PDO::PARAM_INT);
    $stmt->bindValue(':color', $color, PDO::PARAM_STR);
} else if ($color == null && $clicks != 0) {
    // alterar clicks
    echo 13;
    $query = "UPDATE buttons SET clicks = :clicks WHERE voting = :voting AND button= :button";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':voting', $voting, PDO::PARAM_STR);
    $stmt->bindValue(':button', $button, PDO::PARAM_INT);
    $stmt->bindValue(':clicks', $clicks, PDO::PARAM_INT);
} else {
    echo 14;
    $query = "INSERT INTO buttons (user, voting, button, color, clicks) 
                VALUES (:user, :voting, :button, :color, :clicks)
                ON CONFLICT(voting, button) DO UPDATE SET color = :color, clicks = :clicks";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':user', $user, PDO::PARAM_STR);
    $stmt->bindValue(':voting', $voting, PDO::PARAM_STR);
    $stmt->bindValue(':button', $button, PDO::PARAM_INT);
    $stmt->bindValue(':color', $color, PDO::PARAM_STR);
    $stmt->bindValue(':clicks', $clicks, PDO::PARAM_INT);
}
$stmt->execute();
$stmt->closeCursor();
echo 0;
?>

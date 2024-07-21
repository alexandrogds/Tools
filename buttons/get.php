<?php

// Conexão com o banco de dados SQLite
$db = new PDO('sqlite:' . __DIR__ . '\..\database.db');

// Verificar se foi passado o parâmetro id_user
// Consulta para obter os dados dos botões do usuário
$query = "SELECT button, color, clicks FROM buttons WHERE user = :user";
$stmt = $db->prepare($query);
// $stmt->bindValue(':user', $_GET['user'], SQLITE3_TEXT);
$stmt->execute([':user' => $_GET['user']]);

// $result = $stmt->execute();

// Array para armazenar os dados dos botões
$buttons_data = array();

// Iterar pelos resultados e adicionar ao array
// while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
//     $buttons_data[] = array(
//         'button' => $row['button'],
//         'color' => $row['color'],
//         'clicks' => $row['clicks']
//     );
// }

// Buscar e exibir os resultados
$buttons_data = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $buttons_data[] = array(
        'button' => $row['button'],
        'color' => $row['color'],
        'clicks' => $row['clicks']
    );
}

// Retornar os dados em formato JSON
header('Content-Type: application/json');
echo json_encode($buttons_data);

?>

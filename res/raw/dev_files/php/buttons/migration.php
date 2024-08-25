<?php

// Conexão com o banco de dados SQLite
$db = new PDO('sqlite:' . __DIR__ . '\..\..\..\database.db');

// Criar tabela 'buttons' se não existir
$db->exec("CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL,
    pass TEXT NOT NULL
);");

// Criar tabela 'buttons' se não existir
$db->exec("CREATE TABLE IF NOT EXISTS buttons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL,
    voting TEXT NOT NULL,
    button TEXT NOT NULL,
    color TEXT NOT NULL,
    clicks INTEGER DEFAULT 0,
    CHECK(color IN ('btn-danger', 'btn-primary', 'btn-success', 'btn-warning', 'btn-info', 'btn-dark'))
    UNIQUE(voting, button)
);");

$db->exec('PRAGMA journal_mode = WAL;');

echo "Tabela 'buttons' criada com sucesso!";
?>

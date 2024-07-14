<?php

// Conexão com o banco de dados SQLite
$db = new SQLite3('database.db');

// Criar tabela 'buttons' se não existir
$db->exec('CREATE TABLE IF NOT EXISTS buttons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    iuser TEXT NOT NULL,
    button TEXT NOT NULL,
    color TEXT NOT NULL,
    count INTEGER DEFAULT 0,
    UNIQUE(id_user, button_id)
)');

// Fechar a conexão
$db->close();

echo "Tabela 'buttons' criada com sucesso!";
?>

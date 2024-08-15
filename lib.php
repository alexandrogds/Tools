<?php
    function getClientIP() {
        // Verifica se o IP foi passado através de um proxy reverso
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            // Verifica se o IP foi passado através de um proxy
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            // Caso contrário, usa o IP direto do cliente
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        return $ip;
    }
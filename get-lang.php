#!/usr/bin/php
<?php

echo "Content-Type: text/html\n\n";

function determinar_idioma_por_ip($ip) {
    $path_banco_dados = 'GeoLite2-Country.mmdb';

    // Verifica se o arquivo do banco de dados GeoIP existe
    if (!file_exists($path_banco_dados)) {
        return 'en'; // Retorna 'en' se o arquivo não existir
    }

    // Carrega a extensão GeoIP (se não estiver carregada)
    if (!extension_loaded('geoip')) {
        dl('geoip.so');
    }

    // Abre o banco de dados GeoIP
    $reader = geoip_open($path_banco_dados, GEOIP_STANDARD);

    // Tenta obter o código do país pelo IP
    try {
        $codigo_pais = geoip_country_code_by_addr($reader, $ip);

        // Mapeamento de códigos de país para idiomas
        $pais_para_idioma = array(
            'ZA' => 'af', 'AL' => 'sq', 'ET' => 'am', 'SA' => 'ar', 'AM' => 'hy', 'AZ' => 'az', 'ES' => 'eu', 'BY' => 'be',
            'BD' => 'bn', 'BA' => 'bs', 'BG' => 'bg', 'ES' => 'ca', 'PH' => 'ceb', 'MW' => 'ny', 'CN' => 'zh', 'TW' => 'zh-TW',
            'FR' => 'co', 'HR' => 'hr', 'CZ' => 'cs', 'DK' => 'da', 'NL' => 'nl', 'US' => 'en', 'XK' => 'eo', 'EE' => 'et',
            'PH' => 'tl', 'FI' => 'fi', 'FR' => 'fr', 'NL' => 'fy', 'ES' => 'gl', 'GE' => 'ka', 'DE' => 'de', 'GR' => 'el',
            'IN' => 'gu', 'HT' => 'ht', 'NG' => 'ha', 'US' => 'haw', 'IL' => 'he', 'IN' => 'hi', 'CN' => 'hmn', 'HU' => 'hu',
            'IS' => 'is', 'NG' => 'ig', 'ID' => 'id', 'IE' => 'ga', 'IT' => 'it', 'JP' => 'ja', 'ID' => 'jw', 'IN' => 'kn',
            'KZ' => 'kk', 'KH' => 'km', 'RW' => 'rw', 'KR' => 'ko', 'IQ' => 'ku', 'KG' => 'ky', 'LA' => 'lo', 'VA' => 'la',
            'LV' => 'lv', 'LT' => 'lt', 'LU' => 'lb', 'MK' => 'mk', 'MG' => 'mg', 'MY' => 'ms', 'IN' => 'ml', 'MT' => 'mt',
            'NZ' => 'mi', 'IN' => 'mr', 'MN' => 'mn', 'MM' => 'my', 'NP' => 'ne', 'NO' => 'no', 'IN' => 'or', 'AF' => 'ps',
            'IR' => 'fa', 'PL' => 'pl', 'BR' => 'pt', 'IN' => 'pa', 'RO' => 'ro', 'RU' => 'ru', 'WS' => 'sm', 'GB' => 'gd',
            'RS' => 'sr', 'LS' => 'st', 'ZW' => 'sn', 'PK' => 'sd', 'LK' => 'si', 'SK' => 'sk', 'SI' => 'sl', 'SO' => 'so',
            'ES' => 'es', 'ID' => 'su', 'TZ' => 'sw', 'SE' => 'sv', 'TJ' => 'tg', 'IN' => 'ta', 'RU' => 'tt', 'IN' => 'te',
            'TH' => 'th', 'TR' => 'tr', 'TM' => 'tk', 'UA' => 'uk', 'PK' => 'ur', 'CN' => 'ug', 'UZ' => 'uz', 'VN' => 'vi',
            'GB' => 'cy', 'ZA' => 'xh', 'IL' => 'yi', 'NG' => 'yo', 'ZA' => 'zu'
        );

        // Fecha o leitor GeoIP
        geoip_close($reader);

        // Retorna o idioma correspondente ao código do país (ou 'en' se não encontrado)
        return isset($pais_para_idioma[$codigo_pais]) ? $pais_para_idioma[$codigo_pais] : 'en';

    } catch (Exception $e) {
        // Em caso de erro, retorna 'en'
        return 'en';

    } finally {
        // Fecha o leitor GeoIP
        if (isset($reader)) {
            geoip_close($reader);
        }
    }
}

// Exemplo de uso
$ip_usuario = $_SERVER['REMOTE_ADDR'];
$idioma = determinar_idioma_por_ip($ip_usuario);
echo $idioma;
?>

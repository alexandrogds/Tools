<?php
    namespace Google\Cloud\Samples\Translate;

    require __DIR__ . '/vendor/autoload.php';
    include 'lib';

    use Dotenv\Dotenv;
    use Google\Cloud\Translate\TranslateClient;

    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    $apiKey = getenv('API_KEY_GEO_LOCATION');
    $ip = getClientIP();
    $url = "https://api.ipgeolocation.io/ipgeo?apiKey={$apiKey}&ip={$ip}";
    $response = file_get_contents($url);

    if ($response === FALSE) {
        die('Erro ao fazer a requisição.');
    }

    $data = json_decode($response, true);

    $reply = [];

    $translate = new TranslateClient();
    $result = $translate->localizedLanguages([
        'target' => $targetLanguage,
    ]);
    foreach ($result as $lang) {
        if (in_array($result, explode(",", $data['languages']))) {
            $reply[] = $result;
        }
    }

    header('Content-Type: application/json');
    print json_encode($reply);
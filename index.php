<?php
session_start();

// Se vier uma requisição de API (?acao=...), despacha para o Controller OOP correspondente
if (isset($_GET['acao'])) {
    spl_autoload_register(function (string $class) {
        $prefix = 'App\\';
        $baseDir = __DIR__ . '/';

        if (strncmp($prefix, $class, strlen($prefix)) !== 0) {
            return;
        }

        $relativeClass = substr($class, strlen($prefix));
        $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

        if (file_exists($file)) {
            require $file;
        }
    });

    header('Content-Type: application/json; charset=utf-8');
    $dados = json_decode(file_get_contents('php://input'), true) ?? [];
    $acao = $_GET['acao'];

    switch ($acao) {
        case 'sessao':
            (new \App\Controller\AuthController())->verificarSessao();
            break;
        case 'login':
            (new \App\Controller\AuthController())->login($dados);
            break;
        case 'logout':
            (new \App\Controller\AuthController())->logout();
            break;
        case 'listar':
            (new \App\Controller\PublicacaoController())->listar();
            break;
        case 'publicar':
            (new \App\Controller\PublicacaoController())->criar($_POST, $_FILES, $dados);
            break;
        case 'excluir':
            (new \App\Controller\PublicacaoController())->excluir($dados);
            break;
        case 'curtir':
            (new \App\Controller\CurtidaController())->alternar($dados);
            break;
        default:
            http_response_code(400);
            echo json_encode(['erro' => 'Ação inválida.']);
            break;
    }
    exit;
}

// Caso contrário, carrega a View principal
require __DIR__ . '/View/home.php';

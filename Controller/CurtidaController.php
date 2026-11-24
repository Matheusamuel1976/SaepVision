<?php
namespace App\Controller;

use App\Model\Curtida;

class CurtidaController {
    public function alternar(array $dados): void {
        if (!isset($_SESSION['usuario'])) {
            http_response_code(401);
            echo json_encode(['erro' => 'Faça login para curtir.']);
            return;
        }

        $idUsuario    = (int)$_SESSION['usuario']['id_usuario'];
        $idPublicacao = (int)($dados['id_publicacao'] ?? 0);

        $curtida = new Curtida($idUsuario, $idPublicacao);
        $status = $curtida->alternar();

        echo json_encode(['sucesso' => true, 'status' => $status]);
    }
}

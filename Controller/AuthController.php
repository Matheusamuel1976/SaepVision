<?php
namespace App\Controller;

use App\Model\Usuario;

class AuthController {
    public function verificarSessao(): void {
        echo json_encode(['usuario' => $_SESSION['usuario'] ?? null]);
    }

    public function login(array $dados): void {
        $email = trim($dados['email'] ?? '');
        $senha = trim($dados['senha'] ?? '');

        $usuario = Usuario::autenticar($email, $senha);

        if ($usuario !== null) {
            $_SESSION['usuario'] = $usuario->toArray();
            echo json_encode(['sucesso' => true, 'usuario' => $_SESSION['usuario']]);
        } else {
            http_response_code(401);
            echo json_encode([
                'sucesso' => false,
                'mensagem' => 'Usuário não encontrado ou senha incorreta.'
            ]);
        }
    }

    public function logout(): void {
        session_destroy();
        echo json_encode(['sucesso' => true]);
    }
}

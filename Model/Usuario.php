<?php
namespace App\Model;

use PDO;

class Usuario {
    private ?int $idUsuario;
    private string $nome;
    private string $nomeUsuario;
    private string $email;
    private string $senha;
    private ?string $imagemUsuario;
    private string $tipo;

    public function __construct(
        ?int $idUsuario = null,
        string $nome = '',
        string $nomeUsuario = '',
        string $email = '',
        string $senha = '',
        ?string $imagemUsuario = null,
        string $tipo = 'usuario'
    ) {
        $this->idUsuario = $idUsuario;
        $this->nome = $nome;
        $this->nomeUsuario = $nomeUsuario;
        $this->email = $email;
        $this->senha = $senha;
        $this->imagemUsuario = $imagemUsuario;
        $this->tipo = $tipo;
    }

    public function toArray(): array {
        return [
            'id_usuario'     => $this->idUsuario,
            'nome'           => $this->nome,
            'nome_usuario'   => $this->nomeUsuario,
            'email'          => $this->email,
            'imagem_usuario' => $this->imagemUsuario,
            'tipo'           => $this->tipo
        ];
    }

    public static function autenticar(string $email, string $senha): ?self {
        $pdo = Connection::getConnection();
        $stmt = $pdo->prepare("SELECT * FROM tb_usuario WHERE email = ? AND senha = ?");
        $stmt->execute([$email, $senha]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return null;
        }

        return new self(
            (int)$row['id_usuario'],
            $row['nome'],
            $row['nome_usuario'],
            $row['email'],
            $row['senha'],
            $row['imagem_usuario'],
            $row['tipo']
        );
    }
}

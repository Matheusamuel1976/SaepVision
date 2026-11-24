<?php
namespace App\Model;

class Curtida {
    private int $idUsuario;
    private int $idPublicacao;

    public function __construct(int $idUsuario, int $idPublicacao) {
        $this->idUsuario = $idUsuario;
        $this->idPublicacao = $idPublicacao;
    }

    public function alternar(): string {
        $pdo = Connection::getConnection();
        $check = $pdo->prepare("SELECT id_curtida FROM tb_curtida WHERE id_usuario = ? AND id_publicacao = ?");
        $check->execute([$this->idUsuario, $this->idPublicacao]);

        if ($check->fetch()) {
            $del = $pdo->prepare("DELETE FROM tb_curtida WHERE id_usuario = ? AND id_publicacao = ?");
            $del->execute([$this->idUsuario, $this->idPublicacao]);
            return 'removida';
        } else {
            $ins = $pdo->prepare("INSERT INTO tb_curtida (id_usuario, id_publicacao) VALUES (?, ?)");
            $ins->execute([$this->idUsuario, $this->idPublicacao]);
            return 'adicionada';
        }
    }
}

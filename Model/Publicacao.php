<?php
namespace App\Model;

use PDO;

class Publicacao {
    private ?int $idPublicacao;
    private string $tituloImagem;
    private string $localFoto;
    private int $idUsuario;
    private string $urlFotografia;

    public function __construct(
        ?int $idPublicacao = null,
        string $tituloImagem = '',
        string $localFoto = '',
        int $idUsuario = 0,
        string $urlFotografia = ''
    ) {
        $this->idPublicacao = $idPublicacao;
        $this->tituloImagem = $tituloImagem;
        $this->localFoto = $localFoto;
        $this->idUsuario = $idUsuario;
        $this->urlFotografia = $urlFotografia;
    }

    public static function listarTodas(int $idUsuarioLogado = 0): array {
        $pdo = Connection::getConnection();
        $sql = "
            SELECT 
                p.id_publicacao,
                p.titulo_imagem,
                p.local_foto,
                p.url_fotografia,
                p.id_usuario AS id_autor,
                u.nome AS nome_fotografo,
                u.nome_usuario AS handle_fotografo,
                u.imagem_usuario,
                (SELECT COUNT(*) FROM tb_curtida c WHERE c.id_publicacao = p.id_publicacao) AS curtidas,
                (SELECT COUNT(*) FROM tb_curtida c WHERE c.id_publicacao = p.id_publicacao AND c.id_usuario = ?) AS curtidoPeloUsuario
            FROM tb_publicacao p
            INNER JOIN tb_usuario u ON p.id_usuario = u.id_usuario
            ORDER BY p.id_publicacao ASC
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([$idUsuarioLogado]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function salvar(): bool {
        $pdo = Connection::getConnection();
        $stmt = $pdo->prepare(
            "INSERT INTO tb_publicacao (titulo_imagem, local_foto, id_usuario, url_fotografia) VALUES (?, ?, ?, ?)"
        );
        return $stmt->execute([
            $this->tituloImagem,
            $this->localFoto,
            $this->idUsuario,
            $this->urlFotografia
        ]);
    }

    public static function excluirPorId(int $idPublicacao, int $idUsuario): bool {
        $pdo = Connection::getConnection();
        $stmt = $pdo->prepare("DELETE FROM tb_publicacao WHERE id_publicacao = ? AND id_usuario = ?");
        return $stmt->execute([$idPublicacao, $idUsuario]);
    }
}

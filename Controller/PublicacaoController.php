<?php
namespace App\Controller;

use App\Model\Publicacao;

class PublicacaoController {
    public function listar(): void {
        $idUsuarioLogado = (int)($_SESSION['usuario']['id_usuario'] ?? 0);
        $publicacoes = Publicacao::listarTodas($idUsuarioLogado);
        echo json_encode($publicacoes);
    }

    public function criar(array $post, array $files, array $json): void {
        if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['tipo'] !== 'fotografo') {
            http_response_code(403);
            echo json_encode(['erro' => 'Apenas fotógrafos podem publicar.']);
            return;
        }

        $titulo = trim($post['titulo_imagem'] ?? $json['titulo_imagem'] ?? '');
        $local  = trim($post['local_foto'] ?? $json['local_foto'] ?? '');
        $idUser = (int)$_SESSION['usuario']['id_usuario'];
        $nomeArquivoFinal = 'foto1.jpg';

        if (isset($files['arquivo_foto']) && $files['arquivo_foto']['error'] === UPLOAD_ERR_OK) {
            $ext = pathinfo($files['arquivo_foto']['name'], PATHINFO_EXTENSION);
            $nomeArquivoFinal = 'upload_' . time() . '_' . rand(100, 999) . '.' . ($ext ?: 'jpg');
            $destino = dirname(__DIR__) . '/anexos_prova/fotografias/' . $nomeArquivoFinal;
            move_uploaded_file($files['arquivo_foto']['tmp_name'], $destino);
        } elseif (!empty($post['url_fotografia'])) {
            $nomeArquivoFinal = $post['url_fotografia'];
        }

        $publicacao = new Publicacao(null, $titulo, $local, $idUser, $nomeArquivoFinal);
        $sucesso = $publicacao->salvar();

        echo json_encode(['sucesso' => $sucesso]);
    }

    public function excluir(array $dados): void {
        if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['tipo'] !== 'fotografo') {
            http_response_code(403);
            echo json_encode(['erro' => 'Sem permissão para excluir.']);
            return;
        }

        $idPublicacao = (int)($dados['id_publicacao'] ?? 0);
        $idUsuario    = (int)$_SESSION['usuario']['id_usuario'];

        $sucesso = Publicacao::excluirPorId($idPublicacao, $idUsuario);
        echo json_encode(['sucesso' => $sucesso]);
    }
}

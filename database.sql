-- ============================================================================
-- BANCO DE DADOS: SAEPVision (Estrutura oficial do Caderno de Prova)
-- ============================================================================

DROP DATABASE IF EXISTS saep_vision;
CREATE DATABASE saep_vision DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE saep_vision;

-- 1. Tabela de Usuários (conforme tb_usuario.csv e modeloER.png)
CREATE TABLE tb_usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    nome_usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    imagem_usuario VARCHAR(255),
    tipo ENUM('usuario', 'fotografo') NOT NULL DEFAULT 'usuario',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabela de Publicações (conforme modeloER.png)
CREATE TABLE tb_publicacao (
    id_publicacao INT AUTO_INCREMENT PRIMARY KEY,
    titulo_imagem VARCHAR(150) NOT NULL,
    local_foto VARCHAR(150) NOT NULL,
    id_usuario INT NOT NULL,
    url_fotografia VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_publicacao_usuario FOREIGN KEY (id_usuario) 
        REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Tabela Associativa de Curtidas (conforme modeloER.png)
CREATE TABLE tb_curtida (
    id_curtida INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_publicacao INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_curtida_usuario FOREIGN KEY (id_usuario) 
        REFERENCES tb_usuario(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_curtida_publicacao FOREIGN KEY (id_publicacao) 
        REFERENCES tb_publicacao(id_publicacao) ON DELETE CASCADE,
    CONSTRAINT uk_usuario_publicacao UNIQUE (id_usuario, id_publicacao)
) ENGINE=InnoDB;

-- 4. Importação exata dos dados de tb_usuario.csv
INSERT INTO tb_usuario (id_usuario, nome, nome_usuario, email, senha, imagem_usuario, tipo, created_at, updated_at) VALUES
(1, 'fotografo1', 'fotografo_1', 'fotografo1@email.com', '123456', 'fotografo1.jpg', 'fotografo', '2025-03-25 12:40:08', '2025-03-25 12:40:08'),
(2, 'fotografo2', 'fotografo_2', 'fotografo2@gmail.com', '123456', 'fotografo2.jpg', 'fotografo', '2025-03-25 12:42:56', '2025-03-25 12:42:56'),
(3, 'fotografo3', 'fotografo_3', 'fotografo3@gmail.com', '123456', 'fotografo3.jpg', 'fotografo', '2025-03-25 12:45:44', '2025-03-25 12:45:44'),
(4, 'usuario1', 'usuario_1', 'usuario1@gmail.com', '123456', 'usuario1.jpg', 'usuario', '2025-03-25 12:48:32', '2025-03-25 12:48:32'),
(5, 'usuario2', 'usuario_2', 'usuario2@gmail.com', '123456', 'usuario2.jpg', 'usuario', '2025-03-25 12:51:20', '2025-03-25 12:51:20'),
(6, 'usuario3', 'usuario_3', 'usuario3@gmail.com', '123456', 'usuario3.jpg', 'usuario', '2025-03-25 12:54:08', '2025-03-25 12:54:08');

-- 5. Publicações iniciais com as 9 fotografias
INSERT INTO tb_publicacao (id_publicacao, titulo_imagem, local_foto, id_usuario, url_fotografia) VALUES
(1, 'Foto 1', 'São Paulo, Brasil', 1, 'foto1.jpg'),
(2, 'Foto 2', 'Seljalandsfoss, Islândia', 2, 'foto2.jpg'),
(3, 'Foto 3', 'Katmandu, Nepal', 3, 'foto3.jpg'),
(4, 'Foto 4', 'Arnarstapi, Islândia', 1, 'foto4.jpg'),
(5, 'Foto 5', 'Sierra Nevada, EUA', 2, 'foto5.jpg'),
(6, 'Foto 6', 'Dolomitas, Itália', 3, 'foto6.jpg'),
(7, 'Foto 7', 'Haleakalā, Havaí', 1, 'foto7.jpg'),
(8, 'Foto 8', 'Saint Paul, EUA', 2, 'foto8.jpg'),
(9, 'Foto 9', 'Carolina do Norte, EUA', 3, 'foto9.jpg');

-- 6. Curtidas iniciais
INSERT INTO tb_curtida (id_usuario, id_publicacao) VALUES
(4, 1), (5, 1), (6, 1),
(4, 2), (6, 2),
(4, 3), (5, 3), (6, 3),
(5, 5), (4, 6), (6, 6), (5, 7), (4, 9), (6, 9);

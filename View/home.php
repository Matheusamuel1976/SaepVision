<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAEPVision</title>
    <link rel="stylesheet" href="templates/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>

    <div class="futuristic-grid" aria-hidden="true"></div>

    <!-- 1. Cabeçalho da aplicação -->
    <header class="header">
        <div class="header-user">
            <img id="headerAvatar" src="anexos_prova/imagens_usuarios/saepVision.jpeg" alt="Perfil" class="avatar-perfil">
            <div class="user-meta">
                <span id="headerUsername">@SAEPVision</span>
                <button type="button" id="btnVerPerfil" class="btn-dark" disabled>Ver Perfil</button>
            </div>
        </div>

        <div class="header-brand">
            <h1>SAEPVision</h1>
            <span class="tech-sub">PORTAL DE FOTOGRAFIA DIGITAL • MATHEUS PINHEIRO</span>
        </div>

        <div class="header-auth">
            <button type="button" id="btnAbrirLogin" class="btn-dark">Login</button>
            <button type="button" id="btnLogout" class="btn-dark hidden">Logout</button>
        </div>
    </header>

    <!-- 2. Corpo da aplicação -->
    <main class="main-container">
        <section class="search-section">
            <div class="search-wrapper">
                <input
                    type="text"
                    id="campoBusca"
                    placeholder="Digite o nome do fotógrafo... ex: @fotografo1"
                    autocomplete="off"
                >
                <img src="anexos_prova/icones/lupa.svg" alt="Buscar" class="search-icon">
            </div>
            <p id="msgBuscaFeedback" class="feedback-msg hidden">Fotógrafo não encontrado</p>
        </section>

        <div id="barraFiltroAtivo" class="filter-status hidden">
            <span id="textoFiltroAtivo">Exibindo fotos de @fotografo1</span>
            <button type="button" id="btnLimparFiltro" class="btn-outline-sm">Mostrar todas</button>
        </div>

        <section id="galeria" class="gallery-grid" aria-label="Galeria de Fotografias"></section>
    </main>

    <!-- 3. Rodapé da aplicação -->
    <footer class="footer">
        <div class="footer-left">
            <strong>SAEPVision</strong>
        </div>

        <div class="footer-center">
            <a href="#" aria-label="Instagram" title="Instagram"><img src="anexos_prova/icones/instagram.svg" alt="Instagram"></a>
            <a href="#" aria-label="TikTok" title="TikTok"><img src="anexos_prova/icones/tiktok.svg" alt="TikTok"></a>
            <a href="#" aria-label="LinkedIn" title="LinkedIn"><img src="anexos_prova/icones/linkedIn.svg" alt="LinkedIn"></a>
            <a href="#" aria-label="YouTube" title="YouTube"><img src="anexos_prova/icones/youtube.svg" alt="YouTube"></a>
        </div>

        <div class="footer-right">
            <span>Copyright 2026-2027</span>
        </div>
    </footer>

    <!-- Modal de Login -->
    <div id="modalLogin" class="modal-overlay hidden" role="dialog" aria-modal="true" aria-labelledby="tituloModalLogin">
        <div class="modal-box">
            <button type="button" id="btnFecharLogin" class="modal-close" aria-label="Fechar">
                <img src="anexos_prova/icones/close.svg" alt="Fechar">
            </button>

            <h2 id="tituloModalLogin" class="modal-title">Login</h2>

            <form id="formLogin" novalidate>
                <div class="form-group">
                    <label for="emailLogin">E-mail</label>
                    <input type="email" id="emailLogin" placeholder="Digite seu e-mail">
                    <span id="erroEmail" class="error-text hidden">E-mail inválido ou vazio</span>
                </div>

                <div class="form-group">
                    <label for="senhaLogin">Senha</label>
                    <input type="password" id="senhaLogin" placeholder="Digite sua senha">
                    <span id="erroSenha" class="error-text hidden">A senha é obrigatória e não pode estar vazia</span>
                </div>

                <p id="erroCredenciais" class="error-banner hidden">Usuário não encontrado ou senha incorreta.</p>

                <div class="modal-actions">
                    <button type="button" id="btnCancelarLogin" class="btn-cancel">Cancelar</button>
                    <button type="submit" class="btn-dark">Login</button>
                </div>
            </form>

            <div class="quick-accounts">
                <small>Acesso rápido (senha: 123456):</small>
                <div class="quick-btns">
                    <button type="button" data-email="fotografo1@email.com">@fotografo_1</button>
                    <button type="button" data-email="fotografo2@gmail.com">@fotografo_2</button>
                    <button type="button" data-email="fotografo3@gmail.com">@fotografo_3</button>
                    <button type="button" data-email="usuario1@gmail.com">@usuario_1</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Menu Lateral (Drawer) do Fotógrafo -->
    <div id="drawerOverlay" class="drawer-overlay hidden">
        <aside class="side-drawer" aria-label="Perfil do Fotógrafo">
            <div class="drawer-header">
                <div class="drawer-user-info">
                    <img id="drawerAvatar" src="anexos_prova/imagens_usuarios/fotografo1.jpg" alt="Foto do fotógrafo" class="avatar-perfil">
                    <div>
                        <h3 id="drawerNome">fotografo1</h3>
                        <span id="drawerHandle">@fotografo_1</span>
                    </div>
                </div>
                <button type="button" id="btnFecharDrawer" class="modal-close-inline" aria-label="Fechar">
                    <img src="anexos_prova/icones/close.svg" alt="Fechar">
                </button>
            </div>

            <div class="drawer-stats">
                <div class="drawer-stat-card">
                    <strong id="drawerTotalLikes">0</strong>
                    <span>Likes</span>
                </div>
                <div class="drawer-stat-card">
                    <strong id="drawerTotalPublicacoes">0</strong>
                    <span>Publicações</span>
                </div>
            </div>

            <div class="drawer-form-section">
                <h4>Cadastrar Nova Fotografia</h4>
                <form id="formCadastroFoto" novalidate>
                    <div class="form-group">
                        <label for="tituloImagem">Título da imagem</label>
                        <input type="text" id="tituloImagem" placeholder="Ex: Dedo de Deus">
                        <span id="erroTitulo" class="error-text hidden">O título da imagem é obrigatório</span>
                    </div>

                    <div class="form-group">
                        <label for="localFoto">Local onde foi tirada</label>
                        <input type="text" id="localFoto" placeholder="Ex: Rio de Janeiro">
                        <span id="erroLocal" class="error-text hidden">O local onde foi tirada é obrigatório</span>
                    </div>

                    <div class="form-group">
                        <label for="arquivoFoto">Imagem</label>
                        <input type="file" id="arquivoFoto" accept="image/*">
                        <span id="erroArquivo" class="error-text hidden">Selecione uma imagem válida</span>
                    </div>

                    <button type="submit" class="btn-dark full-btn">Publicar Fotografia</button>
                </form>
            </div>

            <button type="button" id="btnSuasPublicacoes" class="btn-suas-publicacoes">
                Suas publicações
            </button>

            <div id="listaSuasPublicacoes" class="drawer-pub-list"></div>
        </aside>
    </div>

    <script type="module" src="templates/js/app.js"></script>
</body>
</html>

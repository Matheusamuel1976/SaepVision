export class PerfilView {
    constructor() {
        this.avatarEl = document.getElementById("headerAvatar");
        this.usernameEl = document.getElementById("headerUsername");
        this.btnVerPerfil = document.getElementById("btnVerPerfil");
        this.btnLogin = document.getElementById("btnAbrirLogin");
        this.btnLogout = document.getElementById("btnLogout");

        this.modalLogin = document.getElementById("modalLogin");
        this.drawerOverlay = document.getElementById("drawerOverlay");
    }

    atualizarHeader(usuario) {
        if (usuario) {
            this.avatarEl.src = `anexos_prova/imagens_usuarios/${usuario.imagem_usuario || 'usuario1.jpg'}`;
            this.usernameEl.textContent = `@${usuario.nome}`;
            this.btnLogin.classList.add("hidden");
            this.btnLogout.classList.remove("hidden");
            this.btnVerPerfil.disabled = (usuario.tipo !== "fotografo");
        } else {
            this.avatarEl.src = "anexos_prova/imagens_usuarios/saepVision.jpeg";
            this.usernameEl.textContent = "@SAEPVision";
            this.btnVerPerfil.disabled = true;
            this.btnLogin.classList.remove("hidden");
            this.btnLogout.classList.add("hidden");
        }
    }

    abrirModalLogin() {
        this.limparErrosLogin();
        this.modalLogin.classList.remove("hidden");
    }

    fecharModalLogin() {
        this.modalLogin.classList.add("hidden");
    }

    limparErrosLogin() {
        document.getElementById("erroEmail").classList.add("hidden");
        document.getElementById("erroSenha").classList.add("hidden");
        document.getElementById("erroCredenciais").classList.add("hidden");
    }

    exibirErroLogin(campo, mensagem = null) {
        if (campo === "email") document.getElementById("erroEmail").classList.remove("hidden");
        if (campo === "senha") document.getElementById("erroSenha").classList.remove("hidden");
        if (campo === "credenciais") {
            const el = document.getElementById("erroCredenciais");
            if (mensagem) el.textContent = mensagem;
            el.classList.remove("hidden");
        }
    }

    abrirDrawer() {
        this.drawerOverlay.classList.remove("hidden");
    }

    fecharDrawer() {
        this.drawerOverlay.classList.add("hidden");
    }

    atualizarDrawer(usuario, minhasFotos) {
        if (!usuario || usuario.tipo !== "fotografo") return;

        document.getElementById("drawerAvatar").src = `anexos_prova/imagens_usuarios/${usuario.imagem_usuario || 'fotografo1.jpg'}`;
        document.getElementById("drawerNome").textContent = usuario.nome;
        document.getElementById("drawerHandle").textContent = `@${usuario.nome_usuario || usuario.nome}`;

        const totalLikes = minhasFotos.reduce((acc, item) => acc + item.curtidas, 0);
        document.getElementById("drawerTotalLikes").textContent = totalLikes;
        document.getElementById("drawerTotalPublicacoes").textContent = minhasFotos.length;

        const listaContainer = document.getElementById("listaSuasPublicacoes");
        listaContainer.innerHTML = "";

        minhasFotos.forEach(foto => {
            const item = document.createElement("div");
            item.className = "drawer-pub-item";
            item.innerHTML = `
                <div class="drawer-pub-left">
                    <img src="${foto.getImagemSrc()}" alt="${foto.titulo_imagem}">
                    <div>
                        <strong>${foto.titulo_imagem}</strong>
                        <small>${foto.local_foto} • ${foto.curtidas} Likes</small>
                    </div>
                </div>
                <button type="button" class="btn-delete-pub" data-delete-id="${foto.id_publicacao}" title="Excluir">
                    <img src="anexos_prova/icones/lixeira.svg" alt="Excluir">
                </button>
            `;
            listaContainer.appendChild(item);
        });
    }
}

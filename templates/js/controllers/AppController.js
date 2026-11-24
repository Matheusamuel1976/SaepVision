import { UsuarioModel } from '../models/UsuarioModel.js';
import { PublicacaoModel } from '../models/PublicacaoModel.js';
import { GaleriaView } from '../views/GaleriaView.js';
import { PerfilView } from '../views/PerfilView.js';

export class AppController {
    constructor() {
        this.usuarioModel = new UsuarioModel();
        this.publicacaoModel = new PublicacaoModel();
        this.galeriaView = new GaleriaView();
        this.perfilView = new PerfilView();

        this.usandoApiReal = false;
        this.filtroSomenteMinhas = false;
    }

    async iniciar() {
        this.#registrarEventos();

        try {
            const res = await fetch("api.php?acao=sessao");
            if (res.ok) {
                const dados = await res.json();
                this.usandoApiReal = true;
                this.usuarioModel.setUsuario(dados.usuario);
                this.perfilView.atualizarHeader(this.usuarioModel.getUsuario());
                await this.sincronizarPublicacoes();
                return;
            }
        } catch (e) {}

        this.usandoApiReal = false;
        this.perfilView.atualizarHeader(null);
        this.atualizarTela();
    }

    async sincronizarPublicacoes() {
        if (this.usandoApiReal) {
            try {
                const res = await fetch("api.php?acao=listar");
                if (res.ok) {
                    const lista = await res.json();
                    if (Array.isArray(lista)) {
                        this.publicacaoModel.definirLista(lista);
                    }
                }
            } catch (e) {}
        }
        this.atualizarTela();
    }

    atualizarTela() {
        const termo = document.getElementById("campoBusca").value;
        const usuario = this.usuarioModel.getUsuario();
        const autorFiltro = (this.filtroSomenteMinhas && usuario) ? usuario.nome : null;

        const filtradas = this.publicacaoModel.filtrar(termo, autorFiltro);
        this.galeriaView.renderizar(filtradas, termo, this.filtroSomenteMinhas, usuario?.nome || "");

        if (this.usuarioModel.isFotografo()) {
            const minhas = this.publicacaoModel.obterPorFotografo(usuario.nome);
            this.perfilView.atualizarDrawer(usuario, minhas);
        }
    }

    #registrarEventos() {
        // Busca em tempo real
        document.getElementById("campoBusca").addEventListener("input", () => {
            this.filtroSomenteMinhas = false;
            this.atualizarTela();
        });

        document.getElementById("btnLimparFiltro").addEventListener("click", () => {
            this.filtroSomenteMinhas = false;
            this.atualizarTela();
        });

        // Delegação de cliques na galeria (Curtir)
        document.getElementById("galeria").addEventListener("click", async (e) => {
            const btnLike = e.target.closest("[data-like-id]");
            if (btnLike) {
                const id = Number(btnLike.getAttribute("data-like-id"));
                await this.#lidarCurtida(id);
            }
        });

        // Modal de Login
        document.getElementById("btnAbrirLogin").addEventListener("click", () => this.perfilView.abrirModalLogin());
        document.getElementById("btnFecharLogin").addEventListener("click", () => this.perfilView.fecharModalLogin());
        document.getElementById("btnCancelarLogin").addEventListener("click", () => this.perfilView.fecharModalLogin());

        document.querySelectorAll(".quick-btns button").forEach(btn => {
            btn.addEventListener("click", () => {
                document.getElementById("emailLogin").value = btn.getAttribute("data-email");
                document.getElementById("senhaLogin").value = "123456";
                this.perfilView.limparErrosLogin();
            });
        });

        document.getElementById("formLogin").addEventListener("submit", async (e) => {
            e.preventDefault();
            await this.#lidarLogin();
        });

        // Logout
        document.getElementById("btnLogout").addEventListener("click", async () => {
            await this.#lidarLogout();
        });

        // Menu Lateral (Drawer)
        document.getElementById("btnVerPerfil").addEventListener("click", () => {
            if (!this.usuarioModel.isFotografo()) return;
            this.atualizarTela();
            this.perfilView.abrirDrawer();
        });

        document.getElementById("btnFecharDrawer").addEventListener("click", () => this.perfilView.fecharDrawer());

        document.getElementById("btnSuasPublicacoes").addEventListener("click", () => {
            this.filtroSomenteMinhas = true;
            document.getElementById("campoBusca").value = "";
            this.perfilView.fecharDrawer();
            this.atualizarTela();
        });

        // Cadastro de Fotografia
        document.getElementById("formCadastroFoto").addEventListener("submit", async (e) => {
            e.preventDefault();
            await this.#lidarCadastroFoto();
        });

        // Excluir Fotografia no Drawer
        document.getElementById("listaSuasPublicacoes").addEventListener("click", async (e) => {
            const btnDel = e.target.closest("[data-delete-id]");
            if (btnDel) {
                const id = Number(btnDel.getAttribute("data-delete-id"));
                await this.#lidarExclusaoFoto(id);
            }
        });
    }

    async #lidarLogin() {
        const email = document.getElementById("emailLogin").value.trim();
        const senha = document.getElementById("senhaLogin").value.trim();
        this.perfilView.limparErrosLogin();

        let valido = true;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !regexEmail.test(email)) {
            this.perfilView.exibirErroLogin("email");
            valido = false;
        }
        if (!senha) {
            this.perfilView.exibirErroLogin("senha");
            valido = false;
        }
        if (!valido) return;

        if (this.usandoApiReal) {
            const res = await fetch("api.php?acao=login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });
            const dados = await res.json();

            if (dados.sucesso) {
                this.usuarioModel.setUsuario(dados.usuario);
                this.perfilView.fecharModalLogin();
                this.perfilView.atualizarHeader(dados.usuario);
                await this.sincronizarPublicacoes();
            } else {
                this.perfilView.exibirErroLogin("credenciais", dados.mensagem);
            }
        } else {
            const user = this.usuarioModel.autenticarOffline(email, senha);
            if (user) {
                this.perfilView.fecharModalLogin();
                this.perfilView.atualizarHeader(user);
                this.atualizarTela();
            } else {
                this.perfilView.exibirErroLogin("credenciais", "Usuário não encontrado ou senha incorreta.");
            }
        }
    }

    async #lidarLogout() {
        if (this.usandoApiReal) {
            await fetch("api.php?acao=logout");
        } else {
            this.publicacaoModel.limparCurtidasUsuarioLocal();
        }
        this.usuarioModel.setUsuario(null);
        this.filtroSomenteMinhas = false;
        this.perfilView.fecharDrawer();
        this.perfilView.atualizarHeader(null);
        await this.sincronizarPublicacoes();
    }

    async #lidarCurtida(idPublicacao) {
        if (!this.usuarioModel.isLogado()) {
            this.perfilView.abrirModalLogin();
            return;
        }

        if (this.usandoApiReal) {
            await fetch("api.php?acao=curtir", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_publicacao: idPublicacao })
            });
            await this.sincronizarPublicacoes();
        } else {
            this.publicacaoModel.alternarCurtidaLocal(idPublicacao);
            this.atualizarTela();
        }
    }

    async #lidarCadastroFoto() {
        const titulo = document.getElementById("tituloImagem").value.trim();
        const local  = document.getElementById("localFoto").value.trim();
        const arquivo = document.getElementById("arquivoFoto").files[0];

        document.getElementById("erroTitulo").classList.add("hidden");
        document.getElementById("erroLocal").classList.add("hidden");
        document.getElementById("erroArquivo").classList.add("hidden");

        let valido = true;
        if (!titulo) { document.getElementById("erroTitulo").classList.remove("hidden"); valido = false; }
        if (!local)  { document.getElementById("erroLocal").classList.remove("hidden");  valido = false; }
        if (!arquivo){ document.getElementById("erroArquivo").classList.remove("hidden"); valido = false; }
        if (!valido) return;

        if (this.usandoApiReal) {
            const formData = new FormData();
            formData.append("titulo_imagem", titulo);
            formData.append("local_foto", local);
            formData.append("arquivo_foto", arquivo);

            const res = await fetch("api.php?acao=publicar", {
                method: "POST",
                body: formData
            });
            const dados = await res.json();
            if (dados.sucesso) {
                document.getElementById("formCadastroFoto").reset();
                await this.sincronizarPublicacoes();
            }
        } else {
            const usuario = this.usuarioModel.getUsuario();
            this.publicacaoModel.adicionarLocal({
                id_publicacao: Date.now(),
                titulo_imagem: titulo,
                local_foto: local,
                url_fotografia: arquivo.name,
                previewUrl: URL.createObjectURL(arquivo),
                nome_fotografo: usuario.nome,
                handle_fotografo: usuario.nome_usuario,
                imagem_usuario: usuario.imagem_usuario,
                curtidas: 0,
                curtidoPeloUsuario: 0
            });
            document.getElementById("formCadastroFoto").reset();
            this.atualizarTela();
        }
    }

    async #lidarExclusaoFoto(idPublicacao) {
        if (this.usandoApiReal) {
            await fetch("api.php?acao=excluir", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id_publicacao: idPublicacao })
            });
            await this.sincronizarPublicacoes();
        } else {
            this.publicacaoModel.removerLocal(idPublicacao);
            this.atualizarTela();
        }
    }
}

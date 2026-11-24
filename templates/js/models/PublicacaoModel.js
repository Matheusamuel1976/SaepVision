export class PublicacaoItem {
    constructor(data) {
        this.id_publicacao = Number(data.id_publicacao);
        this.titulo_imagem = data.titulo_imagem;
        this.local_foto = data.local_foto;
        this.url_fotografia = data.url_fotografia;
        this.previewUrl = data.previewUrl || null;
        this.nome_fotografo = data.nome_fotografo;
        this.handle_fotografo = data.handle_fotografo;
        this.imagem_usuario = data.imagem_usuario;
        this.curtidas = Number(data.curtidas || 0);
        this.curtidoPeloUsuario = Number(data.curtidoPeloUsuario || 0);
    }

    getImagemSrc() {
        return this.previewUrl
            ? this.previewUrl
            : `anexos_prova/fotografias/${this.url_fotografia}`;
    }

    alternarCurtidaLocal() {
        if (this.curtidoPeloUsuario > 0) {
            this.curtidas = Math.max(0, this.curtidas - 1);
            this.curtidoPeloUsuario = 0;
        } else {
            this.curtidas += 1;
            this.curtidoPeloUsuario = 1;
        }
    }
}

export class PublicacaoModel {
    constructor() {
        this.publicacoes = this.#carregarDadosIniciais();
    }

    #carregarDadosIniciais() {
        const iniciais = [
            { id_publicacao: 1, titulo_imagem: "Foto 1", local_foto: "São Paulo, Brasil", url_fotografia: "foto1.jpg", nome_fotografo: "fotografo1", handle_fotografo: "fotografo_1", imagem_usuario: "fotografo1.jpg", curtidas: 3, curtidoPeloUsuario: 0 },
            { id_publicacao: 2, titulo_imagem: "Foto 2", local_foto: "Seljalandsfoss, Islândia", url_fotografia: "foto2.jpg", nome_fotografo: "fotografo2", handle_fotografo: "fotografo_2", imagem_usuario: "fotografo2.jpg", curtidas: 2, curtidoPeloUsuario: 0 },
            { id_publicacao: 3, titulo_imagem: "Foto 3", local_foto: "Katmandu, Nepal", url_fotografia: "foto3.jpg", nome_fotografo: "fotografo3", handle_fotografo: "fotografo_3", imagem_usuario: "fotografo3.jpg", curtidas: 3, curtidoPeloUsuario: 0 },
            { id_publicacao: 4, titulo_imagem: "Foto 4", local_foto: "Arnarstapi, Islândia", url_fotografia: "foto4.jpg", nome_fotografo: "fotografo1", handle_fotografo: "fotografo_1", imagem_usuario: "fotografo1.jpg", curtidas: 0, curtidoPeloUsuario: 0 },
            { id_publicacao: 5, titulo_imagem: "Foto 5", local_foto: "Sierra Nevada, EUA", url_fotografia: "foto5.jpg", nome_fotografo: "fotografo2", handle_fotografo: "fotografo_2", imagem_usuario: "fotografo2.jpg", curtidas: 1, curtidoPeloUsuario: 0 },
            { id_publicacao: 6, titulo_imagem: "Foto 6", local_foto: "Dolomitas, Itália", url_fotografia: "foto6.jpg", nome_fotografo: "fotografo3", handle_fotografo: "fotografo_3", imagem_usuario: "fotografo3.jpg", curtidas: 2, curtidoPeloUsuario: 0 },
            { id_publicacao: 7, titulo_imagem: "Foto 7", local_foto: "Haleakalā, Havaí", url_fotografia: "foto7.jpg", nome_fotografo: "fotografo1", handle_fotografo: "fotografo_1", imagem_usuario: "fotografo1.jpg", curtidas: 1, curtidoPeloUsuario: 0 },
            { id_publicacao: 8, titulo_imagem: "Foto 8", local_foto: "Saint Paul, EUA", url_fotografia: "foto8.jpg", nome_fotografo: "fotografo2", handle_fotografo: "fotografo_2", imagem_usuario: "fotografo2.jpg", curtidas: 0, curtidoPeloUsuario: 0 },
            { id_publicacao: 9, titulo_imagem: "Foto 9", local_foto: "Carolina do Norte, EUA", url_fotografia: "foto9.jpg", nome_fotografo: "fotografo3", handle_fotografo: "fotografo_3", imagem_usuario: "fotografo3.jpg", curtidas: 2, curtidoPeloUsuario: 0 }
        ];
        return iniciais.map(item => new PublicacaoItem(item));
    }

    definirLista(lista) {
        this.publicacoes = lista.map(item => new PublicacaoItem(item));
    }

    obterTodas() {
        return this.publicacoes;
    }

    filtrar(termoBusca = "", somenteAutor = null) {
        const termoLimpo = termoBusca.trim().toLowerCase().replace(/^@/, "");
        let lista = [...this.publicacoes];

        if (somenteAutor) {
            lista = lista.filter(p => p.nome_fotografo === somenteAutor);
        }

        if (termoLimpo !== "") {
            lista = lista.filter(p =>
                p.nome_fotografo.toLowerCase().includes(termoLimpo) ||
                (p.handle_fotografo && p.handle_fotografo.toLowerCase().includes(termoLimpo))
            );
        }

        return lista;
    }

    obterPorFotografo(nomeFotografo) {
        return this.publicacoes.filter(p => p.nome_fotografo === nomeFotografo);
    }

    adicionarLocal(dados) {
        this.publicacoes.push(new PublicacaoItem(dados));
    }

    removerLocal(idPublicacao) {
        this.publicacoes = this.publicacoes.filter(p => p.id_publicacao !== Number(idPublicacao));
    }

    alternarCurtidaLocal(idPublicacao) {
        const pub = this.publicacoes.find(p => p.id_publicacao === Number(idPublicacao));
        if (pub) pub.alternarCurtidaLocal();
    }

    limparCurtidasUsuarioLocal() {
        this.publicacoes.forEach(p => { p.curtidoPeloUsuario = 0; });
    }
}

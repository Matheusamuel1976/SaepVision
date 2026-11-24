export class UsuarioModel {
    constructor() {
        this.usuarioAtual = null;
        this.usuariosOffline = {
            "fotografo1@email.com": { id_usuario: 1, nome: "fotografo1", nome_usuario: "fotografo_1", tipo: "fotografo", imagem_usuario: "fotografo1.jpg" },
            "fotografo2@gmail.com": { id_usuario: 2, nome: "fotografo2", nome_usuario: "fotografo_2", tipo: "fotografo", imagem_usuario: "fotografo2.jpg" },
            "fotografo3@gmail.com": { id_usuario: 3, nome: "fotografo3", nome_usuario: "fotografo_3", tipo: "fotografo", imagem_usuario: "fotografo3.jpg" },
            "usuario1@gmail.com":   { id_usuario: 4, nome: "usuario1",   nome_usuario: "usuario_1",   tipo: "usuario",   imagem_usuario: "usuario1.jpg" },
            "usuario2@gmail.com":   { id_usuario: 5, nome: "usuario2",   nome_usuario: "usuario_2",   tipo: "usuario",   imagem_usuario: "usuario2.jpg" },
            "usuario3@gmail.com":   { id_usuario: 6, nome: "usuario3",   nome_usuario: "usuario_3",   tipo: "usuario",   imagem_usuario: "usuario3.jpg" }
        };
    }

    setUsuario(usuario) {
        this.usuarioAtual = usuario;
    }

    getUsuario() {
        return this.usuarioAtual;
    }

    isLogado() {
        return this.usuarioAtual !== null;
    }

    isFotografo() {
        return this.usuarioAtual !== null && this.usuarioAtual.tipo === "fotografo";
    }

    autenticarOffline(email, senha) {
        if (this.usuariosOffline[email] && senha === "123456") {
            this.usuarioAtual = { ...this.usuariosOffline[email] };
            return this.usuarioAtual;
        }
        return null;
    }
}

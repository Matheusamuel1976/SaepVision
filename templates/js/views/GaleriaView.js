export class GaleriaView {
    constructor() {
        this.galeriaEl = document.getElementById("galeria");
        this.feedbackEl = document.getElementById("msgBuscaFeedback");
        this.barraFiltroEl = document.getElementById("barraFiltroAtivo");
        this.textoFiltroEl = document.getElementById("textoFiltroAtivo");
    }

    renderizar(lista, termoBusca = "", filtroMinhas = false, nomeUsuario = "") {
        this.galeriaEl.innerHTML = "";

        if (filtroMinhas && nomeUsuario) {
            this.barraFiltroEl.classList.remove("hidden");
            this.textoFiltroEl.textContent = `Exibindo suas publicações (@${nomeUsuario})`;
        } else {
            this.barraFiltroEl.classList.add("hidden");
        }

        if (termoBusca.trim() !== "" && lista.length === 0) {
            this.feedbackEl.classList.remove("hidden");
        } else {
            this.feedbackEl.classList.add("hidden");
        }

        lista.forEach(item => {
            const curtido = item.curtidoPeloUsuario > 0;
            const card = document.createElement("article");
            card.className = "photo-card";
            card.innerHTML = `
                <div class="photo-frame">
                    <img src="${item.getImagemSrc()}" alt="${item.titulo_imagem}">
                    <div class="photo-tooltip">
                        <span class="tooltip-tag">SAEPVision Metadata</span>
                        <p>Foto tirada por: @${item.nome_fotografo}</p>
                        <p>Local: ${item.local_foto}</p>
                    </div>
                </div>

                <div class="card-bottom">
                    <span class="card-title">${item.titulo_imagem}</span>
                    <button
                        type="button"
                        class="like-action ${curtido ? 'curtido' : ''}"
                        data-like-id="${item.id_publicacao}"
                        title="Curtir fotografia"
                    >
                        <svg class="heart-svg" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <span>${item.curtidas}</span>
                    </button>
                </div>
            `;
            this.galeriaEl.appendChild(card);
        });
    }
}

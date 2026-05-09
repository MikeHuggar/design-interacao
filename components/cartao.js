class Cartao extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {

        this.shadowRoot.innerHTML = `
        <style>

            #div-conteudo {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                padding-top: 25px;
            }

            #head-editor{
                text-align: center;
            }

            #editor-cartao {
                min-width: 250px;
                background: #00960c;
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 10px;
            }

            
            #cartao {
                width: 350px;
                min-height: 350px;
                background: white;
                background-size: 100% 100%;
                background-position: center;
                background-repeat: no-repeat;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 5px solid black;
            }

            button {
                margin-top: 5px;
            }

            input {
                margin-bottom: 10px;
            }

        </style>

        <div id="div-conteudo">

            <div id="cartao">
                <p id="textoCartao">Seu texto aqui</p>
            </div>

            <form id="editor-cartao">

                <h2 id="head-editor">
                    Editar Cartão
                </h2>

                <button type="button" id="addTexto">
                    Adicionar Novo Texto
                </button>

                <button type="button" id="removerTexto">
                    Remover Texto Selecionado
                </button>

                <br><br>

                <label for="selecionado">
                    Selecionar texto (número):
                </label>

                <input
                    type="number"
                    id="selecionado"
                    min="1"
                    value="1">

                <br>

                <label for="texto">
                    Texto:
                </label>

                <input
                    type="text"
                    id="texto"
                    maxlength="100">

                <br>

                <label for="corTexto">
                    Cor do texto:
                </label>

                <input
                    type="color"
                    id="corTexto">

                <br>

                <label for="corBorda">
                    Cor da borda:
                </label>

                <input
                    type="color"
                    id="corBorda">

                <br>

                <label for="tamanho">
                    Tamanho do texto:
                </label>

                <input
                    type="range"
                    id="tamanho"
                    min="12"
                    max="48"
                    value="20">

                <br><br>

                <label for="selecionaImagem">
                    Selecione uma imagem:
                </label>

                <input
                    type="file"
                    id="selecionaImagem"
                    accept="image/*">

                <br><br>

                <button
                    type="button"
                    id="deleteImagem">

                    Remover Imagem
                </button>

            </form>

        </div>
        `;

        this.inicializar();
    }

    inicializar() {

        this.texto =
            this.shadowRoot.querySelector("#texto");

        this.addTexto =
            this.shadowRoot.querySelector("#addTexto");

        this.removerTexto =
            this.shadowRoot.querySelector("#removerTexto");

        this.selecionado =
            this.shadowRoot.querySelector("#selecionado");

        this.corTexto =
            this.shadowRoot.querySelector("#corTexto");

        this.corBorda =
            this.shadowRoot.querySelector("#corBorda");

        this.tamanho =
            this.shadowRoot.querySelector("#tamanho");

        this.uploadImagem =
            this.shadowRoot.querySelector("#selecionaImagem");

        this.deleteImagem =
            this.shadowRoot.querySelector("#deleteImagem");

        this.cartao =
            this.shadowRoot.querySelector("#cartao");

        // EVENTOS

        this.texto.addEventListener(
            "input",
            () => this.editarTexto()
        );

        this.addTexto.addEventListener(
            "click",
            () => this.adicionarTexto()
        );

        this.removerTexto.addEventListener(
            "click",
            () => this.removerTextoSelecionado()
        );

        this.corTexto.addEventListener(
            "input",
            () => this.mudarCorTexto()
        );

        this.corBorda.addEventListener(
            "input",
            () => this.mudarCorBorda()
        );

        this.tamanho.addEventListener(
            "input",
            () => this.mudarTamanhoTexto()
        );

        this.uploadImagem.addEventListener(
            "change",
            (event) => this.uploadImageFunc(event)
        );

        this.deleteImagem.addEventListener(
            "click",
            () => this.removerImagem()
        );
    }

    getTextos() {

        return this.cartao.querySelectorAll("p");
    }

    editarTexto() {

        let textos = this.getTextos();

        let i = this.selecionado.value - 1;

        if (textos[i]) {

            textos[i].textContent =
                this.texto.value || "Seu texto aqui";
        }
    }

    adicionarTexto() {

        const novo = document.createElement("p");

        novo.textContent = "Novo texto";

        novo.style.margin = "5px";

        this.cartao.appendChild(novo);
    }

    removerTextoSelecionado() {

        let textos = this.getTextos();

        let i = this.selecionado.value - 1;

        if (textos[i]) {

            textos[i].remove();
        }
    }

    mudarCorTexto() {

        let textos = this.getTextos();

        let i = this.selecionado.value - 1;

        if (textos[i]) {

            textos[i].style.color =
                this.corTexto.value;
        }
    }

    mudarCorBorda() {

        this.cartao.style.borderColor =
            this.corBorda.value;
    }

    mudarTamanhoTexto() {

        let textos = this.getTextos();

        let i = this.selecionado.value - 1;

        if (textos[i]) {

            textos[i].style.fontSize =
                this.tamanho.value + "px";
        }
    }

    uploadImageFunc(event) {

        const file = event.target.files[0];

        if (file) {

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {

                this.cartao.style.backgroundImage =
                    `url(${e.target.result})`;
            };
        }
    }

    removerImagem() {

        this.cartao.style.backgroundImage = "none";
    }
}

customElements.define("index-cartao", Cartao);
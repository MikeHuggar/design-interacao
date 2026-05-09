const template = document.createElement("template");

template.innerHTML = `

    <style>

        :host {

            display: flex;

            justify-content: center;

            align-items: center;

            width: 100%;

            margin-top: 20px;
        }

        .card {

            border: 3px solid black;

            border-radius: 10px;

            padding: 20px;

            margin-bottom: 25px;

            background: white;

            max-width: 300px;

            width: 100%;
        }

        .titulo {

            color: green;

            text-align: center;
        }

        .conteudo {

            text-align: center;
        }

    </style>

    <div class="card">

        <div class="titulo">

            <slot name="titulo">
                Título padrão
            </slot>

        </div>

        <div class="conteudo">

            <slot>
                Conteúdo padrão
            </slot>

        </div>

    </div>
`;

class ExTemplate extends HTMLElement {

    constructor() {

        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
        );
    }
}

customElements.define("ex-template", ExTemplate);
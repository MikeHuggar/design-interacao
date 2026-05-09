class QuestaoQuiz {
    constructor(titulo, opcoes, opcaoCorreta) {
        this.titulo = titulo;
        this.opcoes = opcoes;
        this.opcaoCorreta = opcaoCorreta;
    }
}

const questoes = [
    new QuestaoQuiz(
        "O que significa IFRS?",
        [
            "Instituto Federal do Rio Grande do Sul",
            "Internato para Ferrados Risonhos e Sacanas",
            "Impondo Falácias Retroativamente Sábias"
        ],
        0
    ),

    new QuestaoQuiz(
        "O que significa CSS?",
        [
            "Computer Scene Styles",
            "Cascading Style Sheets",
            "Combining Style Structure"
        ],
        1
    ),

    new QuestaoQuiz(
        "Quem criou o SO Linux?",
        [
            "Ada Lovelace",
            "Alan Mathison Turing",
            "Linus Torvalds"
        ],
        2
    ),
];

class OnlineQuiz extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {

        let htmlQuestoes = "";

        questoes.forEach((questao, indiceQuestao) => {

            let opcoesHtml = "";

            questao.opcoes.forEach((opcao, indiceOpcao) => {

                opcoesHtml += `
                    <label class="opcao">

                        <input
                            type="radio"
                            name="questao-${indiceQuestao}"
                            value="${indiceOpcao}">

                        ${opcao}

                    </label>
                `;
            });

            htmlQuestoes += `
                <div class="questao">

                    <h3>
                        ${indiceQuestao + 1}. ${questao.titulo}
                    </h3>

                    <div class="opcoes">

                        ${opcoesHtml}

                    </div>

                    <div
                        class="feedback"
                        id="feedback-${indiceQuestao}">
                    </div>

                </div>
            `;
        });

        this.shadowRoot.innerHTML = `
            <style>

                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }

                .quiz-container {

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    gap: 1rem;

                    padding: 25px;
                }

                .questao {

                    width: 100%;
                    max-width: 700px;

                    background: #00960c;

                    border-radius: 10px;

                    padding: 1rem;

                    color: white;
                }

                .questao h3 {

                    margin-top: 0;
                }

                .opcoes {

                    display: flex;
                    flex-direction: column;

                    gap: 10px;
                }

                .opcao {

                    background: white;

                    color: black;

                    padding: 10px;

                    border-radius: 8px;

                    cursor: pointer;

                    transition: 0.2s;
                }

                .opcao:hover {

                    background: #d9d9d9;
                }

                input[type="radio"] {

                    margin-right: 10px;
                }

                .acoes {

                    display: flex;

                    justify-content: center;
                }

                button {

                    background: #006308;

                    color: white;

                    border: none;

                    padding: 12px 20px;

                    border-radius: 10px;

                    cursor: pointer;

                    font-size: 1rem;

                    transition: 0.2s;
                }

                button:hover {

                    background: #004d06;
                }

                .resultado {

                    width: 100%;
                    max-width: 700px;

                    background: white;

                    border-radius: 10px;

                    padding: 1rem;

                    font-size: 1.2rem;

                    text-align: center;

                    border: 4px solid black;
                }

                .correta {

                    color: lightgreen;

                    font-weight: bold;

                    margin-top: 10px;
                }

                .errada {

                    color: #ffb3b3;

                    font-weight: bold;

                    margin-top: 10px;
                }

            </style>

            <div class="quiz-container">

                ${htmlQuestoes}

                <div class="acoes">

                    <button id="corrigirBtn">
                        Corrigir Prova
                    </button>

                    <button
                        id="resetarBtn"
                        style="display: none;">

                        Resetar Prova
                    </button>

                </div>

                <div
                    class="resultado"
                    id="resultado"
                    style="display: none;">
                </div>

            </div>
        `;

        this.inicializarEventos();
    }

    inicializarEventos() {

        this.corrigirBtn =
            this.shadowRoot.querySelector("#corrigirBtn");

        this.resetarBtn =
            this.shadowRoot.querySelector("#resetarBtn");

        this.resultado =
            this.shadowRoot.querySelector("#resultado");

        this.corrigirBtn.addEventListener(
            "click",
            () => this.corrigirProva()
        );

        this.resetarBtn.addEventListener(
            "click",
            () => this.resetarProva()
        );
    }

    corrigirProva() {

        let acertos = 0;

        questoes.forEach((questao, indiceQuestao) => {

            const selecionada =
                this.shadowRoot.querySelector(
                    `input[name="questao-${indiceQuestao}"]:checked`
                );

            const feedback =
                this.shadowRoot.querySelector(
                    `#feedback-${indiceQuestao}`
                );

            if (!selecionada) {

                feedback.innerHTML = `
                    <div class="errada">
                        Você não respondeu esta questão.
                    </div>
                `;

                return;
            }

            const valorSelecionado =
                parseInt(selecionada.value);

            if (valorSelecionado === questao.opcaoCorreta) {

                acertos++;

                feedback.innerHTML = `
                    <div class="correta">
                        Resposta correta!
                    </div>
                `;
            }

            else {

                feedback.innerHTML = `
                    <div class="errada">
                        Resposta incorreta.
                        <br>
                        Resposta correta:
                        ${questao.opcoes[questao.opcaoCorreta]}
                    </div>
                `;
            }
        });

        this.resultado.innerHTML = `
            <h2>

                Você acertou
                ${acertos}
                de
                ${questoes.length}
                questões.

            </h2>
        `;

        this.resultado.style.display = "block";

        this.corrigirBtn.style.display = "none";

        this.resetarBtn.style.display = "inline-block";
    }

    resetarProva() {
        
        const radios =
            this.shadowRoot.querySelectorAll(
                'input[type="radio"]'
            );

        radios.forEach(radio => {

            radio.checked = false;
        });

        const feedbacks =
            this.shadowRoot.querySelectorAll(".feedback");

        feedbacks.forEach(feedback => {

            feedback.innerHTML = "";
        });

        this.resultado.innerHTML = "";

        this.resultado.style.display = "none";

        this.corrigirBtn.style.display =
            "inline-block";

        this.resetarBtn.style.display =
            "none";
    }
}

customElements.define("index-quiz",OnlineQuiz);
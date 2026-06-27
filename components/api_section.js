class ApiSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.renderCarregando();
        this.carregarDados();
    }

    async carregarDados() {
        try {
            const [swapiDados, cachorroDados, gatoDados] = await Promise.all([
                fetch("https://swapi.info/api/people").then(r => {
                    if (!r.ok) throw new Error("Star Wars API indisponível");
                    return r.json();
                }),
                fetch("https://dog.ceo/api/breeds/image/random").then(r => {
                    if (!r.ok) throw new Error("Dog API indisponível");
                    return r.json();
                }),
                fetch("https://api.thecatapi.com/v1/images/search").then(r => {
                    if (!r.ok) throw new Error("The Cat API indisponível");
                    return r.json();
                })
            ]);

            this.renderConteudo(
                swapiDados[0],
                cachorroDados,
                gatoDados[0]
            );
        } catch (erro) {
            this.renderErro(erro.message);
            console.error(erro);
        }
    }

    renderCarregando() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }

                .container {
                    max-width: 1000px;
                    margin: 2rem auto;
                    padding: 1.5rem;
                }

                .card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.5rem;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.12);
                }

                .mensagem {
                    color: #006308;
                    font-weight: bold;
                }
            </style>

            <div class="container">
                <div class="card">
                    <p class="mensagem">Carregando informações das APIs...</p>
                </div>
            </div>
        `;
    }

    renderErro(mensagem) {
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; font-family: Arial, sans-serif; }
                .container { max-width: 1000px; margin: 2rem auto; padding: 1.5rem; }
                .card { background: #fff3f3; color: #a10000; padding: 1.5rem; border-radius: 12px; }
            </style>
            <div class="container">
                <div class="card">
                    <h2>Não foi possível carregar os dados</h2>
                    <p>${mensagem}</p>
                </div>
            </div>
        `;
    }

    renderConteudo(swapiDados, cachorroDados, gatoDados) {
        const cachorroUrl = cachorroDados?.message || "";

        const gatoId = gatoDados?.id || "Sem ID";
        const gatoUrl = gatoDados?.url || "";
        const gatoWidth = gatoDados?.width || "Desconhecido";
        const gatoHeight = gatoDados?.height || "Desconhecido";

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }

                .container {
                    max-width: 1000px;
                    margin: 2rem auto;
                    padding: 1.5rem;
                }

                .intro {
                    background: #f5f5f5;
                    border-left: 5px solid #00960c;
                    padding: 1rem 1.2rem;
                    border-radius: 8px;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }

                .grade {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 1rem;
                }

                .card {
                    background: white;
                    border-radius: 12px;
                    padding: 1.2rem;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.12);
                }

                .titulo {
                    color: #006308;
                    margin-top: 0;
                    margin-bottom: 0.6rem;
                }

                .label {
                    font-weight: bold;
                    color: #444;
                    margin-top: 0.6rem;
                }

                .valor {
                    margin: 0.2rem 0 0;
                    color: #222;
                    line-height: 1.5;
                }

                .link {
                    color: #006308;
                    text-decoration: none;
                    font-weight: bold;
                }

                .link:hover {
                    text-decoration: underline;
                }
            </style>

            <div class="container">
                <div class="intro">
                    <strong>Veja como esta página usa três APIs diferentes em paralelo.</strong>
                    A informação abaixo foi carregada com <strong>Promise.all</strong>, o que permite buscar vários serviços ao mesmo tempo e mostrar os resultados de forma mais rápida e organizada para o usuário final.
                </div>

                <div class="grade">
                    <article class="card">
                        <h2 class="titulo">Star Wars API</h2>
                        <p class="label">Personagem mostrado:</p>
                        <p class="valor">${swapiDados?.name || "Sem informação"}</p>
                        <p class="label">Altura:</p>
                        <p class="valor">${swapiDados?.height || "Sem informação"} cm</p>
                        <p class="label">Cor dos olhos:</p>
                        <p class="valor">${swapiDados?.eye_color || "Sem informação"}</p>
                    </article>

                    <article class="card">
                        <h2 class="titulo">Dog API</h2>

                        <p class="label">Imagem:</p>
                        <p class="valor" style="text-align: center;">
                            ${
                                cachorroUrl
                                    ? `<img
                                            src="${cachorroUrl}"
                                            alt="Cachorro aleatório"
                                            style="
                                                max-width: 200px;
                                                border-radius: 8px;
                                                margin-top: 0.5rem;
                                            "
                                    >`
                                    : "Imagem não disponível"
                            }
                        </p>
                    </article>

                    <article class="card">
                        <h2 class="titulo">The Cat API</h2>
                        <p class="label">ID da Imagem:</p>
                        <p class="valor">${gatoId}</p>
                        <p class="label">Dimensões:</p>
                        <p class="valor">${gatoWidth} x ${gatoHeight} px</p>
                        <p class="label">Imagem:</p>
                        <p class="valor" style="text-align: center;">
                            ${gatoUrl ? `<img src="${gatoUrl}" alt="Gato" style="max-width: 200px; border-radius: 8px; margin-top: 0.5rem;">` : "Imagem não disponível"}
                        </p>
                    </article>
                </div>
            </div>
        `;
    }
}

customElements.define("index-api-section", ApiSection);

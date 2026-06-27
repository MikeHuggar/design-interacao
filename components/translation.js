class OnlineTranslation extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.idiomas = {
            'en': 'Inglês',
            'pt': 'Português',
            'es': 'Espanhol',
            'fr': 'Francês',
            'de': 'Alemão',
            'it': 'Italiano',
            'ja': 'Japonês',
            'zh': 'Chinês',
            'ru': 'Russo',
            'ar': 'Árabe'
        };
    }

    connectedCallback() {
        this.renderFormulario();
    }

    renderFormulario() {
        const opcoesIdiomaFrom = Object.entries(this.idiomas)
            .filter(([codigo]) => codigo !== 'pt')
            .map(([codigo, nome]) => `<option value="${codigo}">${nome}</option>`)
            .join('');

        const opcoesIdiomaTo = Object.entries(this.idiomas)
            .filter(([codigo]) => codigo !== 'en')
            .map(([codigo, nome]) => `<option value="${codigo}">${nome}</option>`)
            .join('');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                }

                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 2rem;
                }

                .titulo {
                    text-align: center;
                    color: #006308;
                    margin-bottom: 1rem;
                }

                .descricao {
                    background: #f0f0f0;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                    color: #333;
                }

                .formulario {
                    background: white;
                    padding: 2rem;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    margin-bottom: 2rem;
                }

                .grupo-idiomas {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }

                .grupo-idiomas > div {
                    flex: 1;
                    min-width: 150px;
                }

                label {
                    display: block;
                    font-weight: bold;
                    color: #006308;
                    margin-bottom: 0.5rem;
                    font-size: 0.95rem;
                }

                select, textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 2px solid #00960c;
                    border-radius: 5px;
                    font-family: Arial, sans-serif;
                    font-size: 1rem;
                    box-sizing: border-box;
                }

                select:focus, textarea:focus {
                    outline: none;
                    border-color: #006308;
                    background-color: #f9f9f9;
                }

                textarea {
                    resize: vertical;
                    min-height: 120px;
                    margin-bottom: 1.5rem;
                }

                .botoes {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }

                button {
                    background: #006308;
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: bold;
                    transition: 0.3s;
                }

                button:hover {
                    background: #004d06;
                }

                button:disabled {
                    background: #999;
                    cursor: not-allowed;
                }

                .carregando {
                    text-align: center;
                    padding: 2rem;
                    color: #006308;
                    font-weight: bold;
                }

                .spinner {
                    border: 4px solid #f0f0f0;
                    border-top: 4px solid #006308;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .resultado {
                    background: white;
                    padding: 2rem;
                    border-radius: 10px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    margin-top: 2rem;
                }

                .resultado-titulo {
                    color: #006308;
                    font-weight: bold;
                    margin-bottom: 1rem;
                    font-size: 1.1rem;
                }

                .caixas-resultado {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }

                .caixa-resultado {
                    flex: 1;
                    min-width: 250px;
                }

                .caixa-resultado label {
                    font-size: 0.9rem;
                    margin-bottom: 0.5rem;
                }

                .caixa-resultado p {
                    background: #f9f9f9;
                    padding: 1rem;
                    border-left: 4px solid #00960c;
                    border-radius: 5px;
                    min-height: 60px;
                    word-wrap: break-word;
                    margin: 0;
                    line-height: 1.5;
                }

                .confianca {
                    background: #e8f5e9;
                    padding: 1rem;
                    border-radius: 5px;
                    margin-top: 1rem;
                    border-left: 4px solid #4caf50;
                }

                .confianca-label {
                    font-weight: bold;
                    color: #2e7d32;
                    margin-bottom: 0.5rem;
                }

                .barra-confianca {
                    width: 100%;
                    height: 20px;
                    background: #d0d0d0;
                    border-radius: 10px;
                    overflow: hidden;
                }

                .barra-preenchida {
                    height: 100%;
                    background: #4caf50;
                    transition: width 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: bold;
                }

                .erro {
                    background: #ffebee;
                    border-left: 4px solid #f44336;
                    padding: 1.5rem;
                    border-radius: 5px;
                    color: #c62828;
                    margin-top: 2rem;
                }

                .erro-titulo {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .info-origem {
                    background: #e3f2fd;
                    padding: 1rem;
                    border-left: 4px solid #2196f3;
                    border-radius: 5px;
                    margin-top: 1rem;
                    font-size: 0.9rem;
                    color: #1565c0;
                }

                .info-origem strong {
                    display: block;
                    margin-bottom: 0.3rem;
                }

                @media (max-width: 600px) {
                    .container {
                        padding: 1rem;
                    }

                    .grupo-idiomas {
                        flex-direction: column;
                    }

                    .caixas-resultado {
                        flex-direction: column;
                    }
                }
            </style>

            <div class="container">
                <h1 class="titulo">Tradutor Online</h1>

                <div class="descricao">
                    <strong>Como usar:</strong> Digite o texto que deseja traduzir no campo abaixo, 
                    escolha o idioma de origem e o idioma para o qual deseja traduzir, 
                    e clique em "Traduzir". A tradução será exibida em tempo real usando uma API profissional.
                </div>

                <div class="formulario">
                    <div class="grupo-idiomas">
                        <div>
                            <label for="idiomaOrigem">Idioma de Origem:</label>
                            <select id="idiomaOrigem">
                                <option value="pt" selected>Português</option>
                                ${opcoesIdiomaFrom}
                            </select>
                        </div>
                        <div>
                            <label for="idiomaDestino">Traduzir para:</label>
                            <select id="idiomaDestino">
                                <option value="en" selected>Inglês</option>
                                ${opcoesIdiomaTo}
                            </select>
                        </div>
                    </div>

                    <label for="textoOrigem">Texto a Traduzir:</label>
                    <textarea 
                        id="textoOrigem" 
                        placeholder="Digite aqui o texto que deseja traduzir..."></textarea>

                    <div class="botoes">
                        <button id="traduzirBtn">Traduzir</button>
                        <button id="limparBtn">Limpar</button>
                    </div>
                </div>

                <div id="conteudoResultado"></div>
            </div>
        `;

        this.inicializarEventos();
    }

    inicializarEventos() {
        const traduzirBtn = this.shadowRoot.querySelector("#traduzirBtn");
        const limparBtn = this.shadowRoot.querySelector("#limparBtn");
        const textoOrigem = this.shadowRoot.querySelector("#textoOrigem");

        traduzirBtn.addEventListener("click", () => this.executarTraducao());
        limparBtn.addEventListener("click", () => this.limparFormulario());
        
        // Permite traduzir ao pressionar Ctrl+Enter
        textoOrigem.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "Enter") {
                this.executarTraducao();
            }
        });
    }

    async executarTraducao() {
        const textoOrigem = this.shadowRoot.querySelector("#textoOrigem").value.trim();
        const idiomaOrigem = this.shadowRoot.querySelector("#idiomaOrigem").value;
        const idiomaDestino = this.shadowRoot.querySelector("#idiomaDestino").value;
        const conteudoResultado = this.shadowRoot.querySelector("#conteudoResultado");
        const traduzirBtn = this.shadowRoot.querySelector("#traduzirBtn");

        if (!textoOrigem) {
            conteudoResultado.innerHTML = `
                <div class="erro">
                    <div class="erro-titulo">Campo Vazio</div>
                    Por favor, digite o texto que deseja traduzir.
                </div>
            `;
            return;
        }

        // Mostra carregamento
        conteudoResultado.innerHTML = `
            <div class="resultado">
                <div class="carregando">
                    <div class="spinner"></div>
                    Traduzindo seu texto...
                </div>
            </div>
        `;

        traduzirBtn.disabled = true;

        try {
            const langpair = `${idiomaOrigem}|${idiomaDestino}`;
            const url = `https://mymemory.translated.net/api/get?q=${encodeURIComponent(textoOrigem)}&langpair=${langpair}`;

            const resposta = await fetch(url);

            if (!resposta.ok) {
                throw new Error("Erro ao conectar com a API de tradução.");
            }

            const dados = await resposta.json();

            if (dados.responseStatus === 200) {
                const textoTraduzido = dados.responseData.translatedText;
                const confianca = Math.round(dados.responseData.match * 100);

                conteudoResultado.innerHTML = `
                    <div class="resultado">
                        <div class="resultado-titulo">Tradução Concluída</div>

                        <div class="caixas-resultado">
                            <div class="caixa-resultado">
                                <label>Texto Original (${this.idiomas[idiomaOrigem]}):</label>
                                <p>${this.escaparHtml(textoOrigem)}</p>
                            </div>

                            <div class="caixa-resultado">
                                <label>Texto Traduzido (${this.idiomas[idiomaDestino]}):</label>
                                <p>${this.escaparHtml(textoTraduzido)}</p>
                            </div>
                        </div>

                        <div class="confianca">
                            <div class="confianca-label">Confiança da Tradução: ${confianca}%</div>
                            <div class="barra-confianca">
                                <div class="barra-preenchida" style="width: ${confianca}%;">
                                    ${confianca}%
                                </div>
                            </div>
                            <div class="info-origem">
                                <strong>Sobre a confiança:</strong>
                                Uma confiança de 100% significa que esta tradução foi validada por tradutores profissionais.
                                Valores menores indicam traduções automatizadas, que ainda assim são confiáveis.
                            </div>
                        </div>
                    </div>
                `;
            } else {
                conteudoResultado.innerHTML = `
                    <div class="erro">
                        <div class="erro-titulo">Erro na Tradução</div>
                        Não foi possível traduzir o texto. Verifique se os idiomas selecionados estão corretos 
                        e tente novamente. Mensagem da API: ${dados.responseStatus}
                    </div>
                `;
            }
        } catch (erro) {
            conteudoResultado.innerHTML = `
                <div class="erro">
                    <div class="erro-titulo">Erro de Conexão</div>
                    Não foi possível conectar ao serviço de tradução. Verifique sua conexão com a internet 
                    e tente novamente. Erro: ${this.escaparHtml(erro.message)}
                </div>
            `;
            console.error("Erro ao traduzir:", erro);
        } finally {
            traduzirBtn.disabled = false;
        }
    }

    limparFormulario() {
        this.shadowRoot.querySelector("#textoOrigem").value = "";
        this.shadowRoot.querySelector("#conteudoResultado").innerHTML = "";
    }

    escaparHtml(texto) {
        const div = document.createElement("div");
        div.textContent = texto;
        return div.innerHTML;
    }
}

customElements.define("index-translation", OnlineTranslation);

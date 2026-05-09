class IndexNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <h1>Design de Interação</h1>
        </header>

        <nav>
            <ul>
                <li><a href="./index.html">Apresentação</a></li>
                <li><a href="./cartao.html">Editor de Cartões</a></li>
                <li><a href="./quiz.html">Prova Online</a></li>
                <li><a href="#">Trabalho 3</a></li>
            </ul>
        </nav>
        `;
    }
}

customElements.define("index-nav", IndexNav);
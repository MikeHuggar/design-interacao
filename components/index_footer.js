class IndexFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
            <p><b>&copy; 2026 - Interface Web - Site por Rogério Freitas Mateus</b></p>
        </footer>
        `;
    }
}

customElements.define("index-footer", IndexFooter);
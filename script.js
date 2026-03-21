const texto = document.getElementById("texto");
const addTexto = document.getElementById("addTexto");
const removerTexto = document.getElementById("removerTexto");
const selecionado = document.getElementById("selecionado");
const corTexto = document.getElementById("corTexto");
const corBorda = document.getElementById("corBorda");
const tamanho = document.getElementById("tamanho");
const uploadImagem = document.getElementById("selecionaImagem");
const deleteImagem = document.getElementById("deleteImagem");

let cardImageElement = null;

const textoCartao = document.getElementById("textoCartao");
const cartao = document.getElementById("cartao");

texto.addEventListener("input", () => {
    let textos = getTextos();
    let i = selecionado.value - 1;

    if (textos[i]) {
        textos[i].textContent = texto.value || "Seu texto aqui";
    }
});

addTexto.addEventListener("click", adicionarTexto);

removerTexto.addEventListener("click", removerTextoSelecionado);

corTexto.addEventListener("input", () => {
    let textos = getTextos();
    let i = selecionado.value - 1;

    if (textos[i]) {
        textos[i].style.color = corTexto.value;
    }
});

corBorda.addEventListener("input", () => {
    cartao.style.borderColor = corBorda.value;
});

tamanho.addEventListener("input", () => {
    let textos = getTextos();
    let i = selecionado.value - 1;

    if (textos[i]) {
        textos[i].style.fontSize = tamanho.value + "px";
    }
});

uploadImagem.addEventListener("change", uploadImageFunc)
deleteImagem.addEventListener("click", () => {
    cartao.style.backgroundImage = "none";
});

function getTextos() {
    return cartao.querySelectorAll("p");
}

function adicionarTexto() {
    const novo = document.createElement("p");
    novo.textContent = "Novo texto";
    novo.style.margin = "5px";
    cartao.appendChild(novo);
}

function removerTextoSelecionado() {
    let textos = getTextos();
    let i = selecionado.value - 1;

    if (textos[i]) {
        textos[i].remove();
    }
}

function uploadImageFunc(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(e) {
            cartao.style.backgroundImage = `url(${e.target.result})`;
        };
    }
};
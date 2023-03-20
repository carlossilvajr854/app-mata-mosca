// Variáveis de escopo global
let alturaPalco;
let larguraPalco;
let posicaoX;

function ajustaTamanhoPalco() {
    alturaPalco = window.innerHeight;
    larguraPalco = window.innerWidth;
}

ajustaTamanhoPalco();

function tamanhoAleatorio() {
    return Math.ceil(Math.random() * 3);
}

function inverterLadoMosca() {
    return posicaoX < Math.ceil(larguraPalco / 2 - 45) ? " ladoInvertido" : "";
}

function posicaoRandomica() {
    posicaoX = Math.floor(Math.random() * larguraPalco) - 90;
    let posicaoY = Math.floor(Math.random() * alturaPalco) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    inverterLadoMosca();

    let mosca = document.createElement("img");
    mosca.src = "/public/img/mosca.png";
    mosca.className = "mosca" + tamanhoAleatorio() + inverterLadoMosca();
    mosca.style.position = "absolute";
    mosca.style.left = posicaoX + "px";
    mosca.style.top = posicaoY + "px";

    document.body.appendChild(mosca);
}

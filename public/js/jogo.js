// Variáveis
let alturaPalco = 0;
let larguraPalco = 0;
let posicaoX = 0;
let posicaoY = 0;

function ajustaTamanhoPalco() {
    alturaPalco = window.innerHeight;
    larguraPalco = window.innerWidth;

    console.log(larguraPalco, alturaPalco);
}

ajustaTamanhoPalco();

posicaoX = Math.floor(Math.random() * larguraPalco);
posicaoY = Math.floor(Math.random() * alturaPalco);

console.log(posicaoX, posicaoY);

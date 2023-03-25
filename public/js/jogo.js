let palco = {
    altura: 0,
    largura: 0,
};
let posicaomosquito = {
    x: 0,
    y: 0,
};

let mosquito;
let intervalCriaMosquito;

let jogo = {
    pontos: 3,
    imgCoracao: document.querySelectorAll(".coracao"),
    dificuldade: 1500,
    tempoRestante: 30,
    spanTempo: document.getElementById("tempo"),
    cronometro: null,
};

function ajustaTamanhoPalco() {
    palco.altura = window.innerHeight;
    palco.largura = window.innerWidth;
}

function setDificuldade() {
    let nivelSelecionado = document.getElementById("nivelJogo").value;

    if (nivelSelecionado == "0") {
        alert("Nível inválido. Favor selecionar o nível do jogo corretamente!");
    } else {
        window.location.href = "/src/app.html?" + nivelSelecionado;
    }
}

function criaPosicaoRandomicamente(eixo, dimensaoPalco) {
    posicaomosquito[eixo] =
        Math.floor(Math.random() * palco[dimensaoPalco]) - 90;
    posicaomosquito[eixo] =
        posicaomosquito[eixo] < 0 ? 0 : posicaomosquito[eixo];
}

function tamanhoAleatorio() {
    return Math.ceil(Math.random() * 3);
}

function inverterMosquito() {
    return Math.ceil(Math.random() * 2) > 1 ? " ladoInvertido" : "";
}

function criarElementoMosquito() {
    mosquito = document.createElement("img");
    mosquito.src = "/public/img/mosquito.png";
    mosquito.className = "mosquito" + tamanhoAleatorio() + inverterMosquito();
    mosquito.style.position = "absolute";
    mosquito.style.left = posicaomosquito.x + "px";
    mosquito.style.top = posicaomosquito.y + "px";
    mosquito.id = "mosquito";
    mosquito.onclick = function () {
        this.remove();
    };

    document.body.appendChild(mosquito);
}

function removerMosquitoPalco() {
    if (document.getElementById("mosquito")) {
        mosquito.remove();
        if (jogo.pontos > 0) {
            diminuiPontoVida();
        } else {
            limparSetIntervals();
            window.location.href = "/src/game-over.html";
        }
    }
}

function diminuiPontoVida() {
    jogo.imgCoracao[jogo.pontos - 1].src = "/public/img/coracao_vazio.png";
    jogo.pontos--;
}

function criarMosquitoNoPalco() {
    criaPosicaoRandomicamente("x", "largura");
    criaPosicaoRandomicamente("y", "altura");
    criarElementoMosquito();
}

function limparSetIntervals() {
    clearInterval(intervalCriaMosquito);
    clearInterval(jogo.cronometro);
}

ajustaTamanhoPalco();

function iniciarJogo() {
    let nivel = window.location.search.replace("?", "");

    if (nivel == "2") {
        jogo.dificuldade = 1000;
    }
    if (nivel == "3") {
        jogo.dificuldade = 750;
    }

    jogo.cronometro = setInterval(() => {
        if (jogo.tempoRestante > 0) {
            jogo.tempoRestante--;
            jogo.spanTempo.innerHTML = jogo.tempoRestante;
        } else {
            limparSetIntervals();
            if (jogo.pontos >= 0) {
                window.location.href = "/src/winner.html";
            } else {
                window.location.href = "/src/game-over.html";
            }
        }
    }, 1000);

    jogo.spanTempo.innerHTML = jogo.tempoRestante;
    criarMosquitoNoPalco();

    intervalCriaMosquito = setInterval(() => {
        removerMosquitoPalco();
        if (jogo.pontos >= 0) {
            criarMosquitoNoPalco();
        }
    }, jogo.dificuldade);
}

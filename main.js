const html = document.querySelector("html");
const btnFoco = document.querySelector(".app__card-button--foco");
const btnCurto = document.querySelector(".app__card-button--curto");
const btnLongo = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const btns = document.querySelectorAll(".app__card-button");
const btnStartPause = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const btnIniciarOuPausar = document.querySelector("#start-pause span");
const btnIniciarOuPausarIcone = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tempoNaTela = document.querySelector("#timer");

const audioPlay = new Audio("/sons/play.wav");
const audioPause = new Audio("/sons/pause.mp3");
const audioFinalizado = new Audio("/sons/beep.mp3");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
musica.loop = true;

let tempoEmSegundos = 1500;
let intevaloId = null;

const contagemRegressiva = () => {
  if (tempoEmSegundos <= 0) {
    tocar(audioFinalizado);
    alert("Tempo finalizado!");
    zerar();
    return;
  }
  tempoEmSegundos -= 1;
  mostrarTempo();
};

function mostrarTempo() {
  const tempo = new Date(tempoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

function iniciarOuPausar() {
  if (intevaloId) {
    zerar();
    tocar(audioPause);
    return;
  }
  tocar(audioPlay);
  intevaloId = setInterval(contagemRegressiva, 1000);
  btnIniciarOuPausar.textContent = "Pausar";
  btnIniciarOuPausarIcone.setAttribute("src", `/imagens/pause.png`);
}

function zerar() {
  clearInterval(intevaloId);
  btnIniciarOuPausar.textContent = "Começar";
  btnIniciarOuPausarIcone.setAttribute("src", `/imagens/play_arrow.png`);
  intevaloId = null;
}

function tocar(audio) {
  audio.play();
}

function alterarContexto(contexto) {
  mostrarTempo();
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  btns.forEach((contexto) => {
    contexto.classList.remove("active");
  });

  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
      Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>
      `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
      Que tal dar uma respirada?<br>
      <strong class="app__title-strong">Faça uma pausa curta!</strong>
      `;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
      Hora de voltar à superfície.<br>
      <strong class="app__title-strong">Faça uma pausa longa!</strong>
      `;
      break;
    default:
      break;
  }
}

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

btnFoco.addEventListener("click", () => {
  tempoEmSegundos = 1500;
  alterarContexto("foco");
  btnFoco.classList.add("active");
});

btnCurto.addEventListener("click", () => {
  tempoEmSegundos = 300;
  alterarContexto("descanso-curto");
  btnCurto.classList.add("active");
});

btnLongo.addEventListener("click", () => {
  tempoEmSegundos = 900;
  alterarContexto("descanso-longo");
  btnLongo.classList.add("active");
});

btnStartPause.addEventListener("click", iniciarOuPausar);

mostrarTempo();

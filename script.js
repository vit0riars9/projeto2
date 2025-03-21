const musicaAmbiInput = document.querySelector('#alternar-musica');
const startBt = document.querySelector('#start');
const pauseBt = document.querySelector('#pause');
const reiniciarBt = document.querySelector('#reiniciar');
const textoNaTela = document.querySelector('#timer');
 
let tempoDecorridoEmSegundos = 600;
let intervaloId = null;
 
const musica = new Audio('/sons/ambi.mp3');
const audioStart = new Audio('/sons/comeco.mp3');
const audioPause = new Audio('/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/sons/finalizar.mp3');
const audioReiniciar = new Audio('/sons/reiniciar.mp3');
 
 
musica.loop = true;
 
musicaAmbiInput.addEventListener('change',()=>{
    if(musica.paused){
        musica.play();
    }
    else{
        musica.pause();
    }
 
});
 
 
startBt.addEventListener('click', () => {
    if (!intervaloId) {
        audioStart.play();
        iniciar();
    }
});
 
 
pauseBt.addEventListener('click', () => {
    if (intervaloId) {
        audioPause.play();
        zerar();
    }
});
 
 
reiniciarBt.addEventListener('click', () => {
    zerar();
    tempoDecorridoEmSegundos = 600;
    mostrarTempo();
    audioReiniciar.play();
});
 
 
function iniciar() {
    intervaloId = setInterval(contagemRegressiva, 1000);
}
 
 
function contagemRegressiva() {
    if (tempoDecorridoEmSegundos === 0) {
        audioTempoFinalizado.play();
        alert('Tempo Finalizado');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}
 
 
function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}
 
 
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' });
    textoNaTela.innerHTML = `${tempoFormatado}`;
}
 
mostrarTempo(
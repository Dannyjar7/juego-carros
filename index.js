
// DECLARACION DE VARIABLES
const botonLanzar = document.getElementById('btn-lanzar');
const nParticipantes = parseInt(prompt('Digite el numero de participantes'));
const carrosContenedor = document.getElementById('carros-container');
const dado = document.getElementById('dado');
const carrosPuntajes = [];

let carroParticipanteActual = 0;
let carrosHtml = '';

// GENERADOR DE LOS NUMEROS ALEATORIOS
const getRandomNumber = (min, max) => {
    return Math.trunc(Math.random() * (max - min) + min);
}

// ITERACION DE LOS PUNTAJES
const compararPuntajes = (a, b) => {
    if (a.puntaje > b.puntaje) return -1;
    if (a.puntaje < b.puntaje) return 1;
}

// ITERACION, SEGUN LOS PARTICIPANTES INGRESADOS SE GENERA LA CANTIDAD DE CARROS
for (let i = 0; i < nParticipantes; i++) {
    carrosHtml += `
    <div id='carroN${i + 1}'>
        <img class='carro' src='./imgs/car.png'/>
    </div>
    `
    carrosPuntajes[i] = {
        numero: i + 1,
        puntaje: 0
    };
}

// contiene el array de los carros con las imagenes
carrosContenedor.innerHTML = carrosHtml;

// FUNCION PARA LANZAR LOS DADOS
botonLanzar.addEventListener('click', () => {
    const number = getRandomNumber(1, 7);

    carrosPuntajes[carroParticipanteActual].puntaje = number;
    carroParticipanteActual++;

    dado.setAttribute('src', `./imgs/${number}.svg`)

    const carro = document.getElementById(`carroN${carroParticipanteActual}`);

    if (carroParticipanteActual === nParticipantes) {
        botonLanzar.setAttribute('disabled', true);
        podio();
    }

})

// FUNCION PARA INFORMAR LOS GANADORES
const podio = () => {
    const ordenarPorPuntaje = carrosPuntajes.sort(compararPuntajes);

    let textoGanadores = '';

    for (let i = 0; i < ordenarPorPuntaje.length; i++) {

        textoGanadores += `\n ${i + 1}. El carro numero ${ordenarPorPuntaje[i].numero} con un puntaje de ${ordenarPorPuntaje[i].puntaje}`

    }

    alert(`
        Los ganadores son:
        ${textoGanadores}
    `)
}
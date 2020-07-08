const fila = document.querySelector('.contenedor-carousel');
const categorias = document.querySelector('.categoria');
const flechaIzq = document.querySelector('#flecha-izquierda');
const flechaDer = document.querySelector('#flecha-derecha');

const scrollDerecha = () => {
    fila.scrollLeft += fila.offsetWidth;


}

const scrollIzquierda = () => {
    fila.scrollLeft -= fila.offsetWidth;

}

flechaIzq.addEventListener('click', scrollIzquierda);
flechaDer.addEventListener('click', scrollDerecha);

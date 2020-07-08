const contenedor = document.querySelector('#contenedor-resultados');
const navegadorPaginacion = document.querySelector('.pagination')
const buscadorTarjetas = document.getElementById('buscador-tarjetas');

const state ={
    searchField: '',
    cargando: false,
    paginaActual: 1,
    productosPorPagina: 20
     
}



const removeElementsByClass = (elementName) => {
    let elements = document.getElementsByClassName(elementName);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
};


const crearTarjetas = (e) => {
    for(let i = 0; i < e.length; i++){

        let divImg = document.createElement('div');
            divImg.ngInit='changePropertyVisibility(0, true)';
            divImg.ngShow='showProperty[0]';
            divImg.style= `background:  url(${e[i].imagen}) no-repeat; background-position: center; background-size: cover;`;
            divImg.className='tile-hover properties-item';
            divImg.id = e[i].id;
            divImg.style.cursor = 'pointer';

        let divDetallesInternos = document.createElement('div');
            divDetallesInternos.className = 'properties-item-inner';

        let divDetalles = document.createElement('div');
            divDetalles.className='properties-details';

        let divDetalles1 = document.createElement('div');
            divDetalles1.className='properties-details-inner';

        let divDetallesTop = document.createElement('div');
            divDetallesTop.className = 'top';

        let divDetallesLeft = document.createElement('div');
            divDetallesLeft.className='left';
            divDetallesLeft.style.color='white';
            divDetallesLeft.innerHTML = e[i].nombre;

        let divDetallesRight = document.createElement('div');
            divDetallesRight.className='right';

        let spanDivDetallesRight = document.createElement('span');
            spanDivDetallesRight.className='property-price';
            spanDivDetallesRight.innerHTML= e[i].precio;

        divDetallesRight.appendChild(spanDivDetallesRight);
        divDetallesTop.appendChild(divDetallesLeft);
        divDetallesTop.appendChild(divDetallesRight);

        divDetalles1.appendChild(divDetallesTop);

        divDetalles.appendChild(divDetalles1);

        divDetallesInternos.appendChild(divDetalles);

        divImg.appendChild(divDetallesInternos);


        contenedor.appendChild(divImg);

/*
        let divTarjeta = document.createElement('div');
            divTarjeta.className = 'grid community-grid-item';

        let imgTarjeta = document.createElement('img');
            imgTarjeta.className = 'grid-image cover';
            imgTarjeta.src = `${e[i].imagen}`;

        divTarjeta.appendChild(imgTarjeta);
        contenedor.appendChild(divTarjeta);
*/
        
     
    }
}

const ordenarAlfabeticamente = (e) => {
    e.sort(function(a, b) {
         return a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase());
        
     });
}

 buscarTodosProductos = () => {
    const options = {
        method: 'get'
    };
    fetch('https://dimedisa-api.herokuapp.com/home', options)
    .then(data => {
        return data.json()
        }).then(res => {
            if (res == 'productos no encontrados'){
                let mensajeError = document.createElement('h1');
                    mensajeError.innerHTML = res;

                contenedor.appendChild(mensajeError);
                
            }else{
                state.productos = res;
                ordenarAlfabeticamente(res);
                haciendoPaginacion(res);
            }
    })
}

const abrirDetalles = (e) => {
    const target = e.target.id;
    console.log(target);
    sessionStorage.setItem('productoId', target)
    window.open('detalles-producto.html', '_self');
}


const haciendoPaginacion = (e) => {
    const indiceUltimosProductos = state.paginaActual * state.productosPorPagina;
    const indicePrimerosProductos = indiceUltimosProductos - state.productosPorPagina;
    const productosActuales = e.slice(indicePrimerosProductos, indiceUltimosProductos);
    crearTarjetas(productosActuales);
    paginacion(state.productosPorPagina, e.length)
}

const paginacion = (a, b) => {
    const numeroPaginas = [];
    const clasePaginacion = document.querySelector('.pagination');

    for (let i = 0; i <= Math.ceil(b / a ); i++){
        numeroPaginas.push(i);

    }
    for(let i = 1; i < numeroPaginas.length; i++){
        
        const liPaginacion = document.createElement('li');
            liPaginacion.className='page-item';
            
        const aPaginacion = document.createElement('a');
            aPaginacion.href='#';
            aPaginacion.className='page-link';
            
            aPaginacion.innerHTML = i;
            aPaginacion.onclick = function(){
                cambiarPagina(i);
            };

        liPaginacion.appendChild(aPaginacion);
        clasePaginacion.appendChild(liPaginacion);
    
    }
}

const cambiarPagina = (e) => {
    const indiceUltimosProductos = e * state.productosPorPagina;
    const indicePrimerosProductos = indiceUltimosProductos - state.productosPorPagina;
    const productosActuales = state.productos.slice(indicePrimerosProductos, indiceUltimosProductos);
    removeElementsByClass('tile-hover properties-item');
    crearTarjetas(productosActuales);
}


const irInicioPagina = (e) => {
    const target = e.target;
    $('html, body').animate({
        scrollTop: $("#contenedor-resultados").offset().top
    }, 600);
}

const filtrarProductosporNombre = (event) => {
    state.searchField = event.target.value;
    const categoriasFiltradas = state.productos.filter(i =>{
        return i.nombre.toLowerCase().includes(state.searchField.toLowerCase());
      });
    removeElementsByClass('tile-hover properties-item');
    removeElementsByClass('page-item');
    haciendoPaginacion(categoriasFiltradas);
};








window.addEventListener('load', buscarTodosProductos);

contenedor.addEventListener('click', abrirDetalles);

navegadorPaginacion.addEventListener('click', irInicioPagina);

buscadorTarjetas.addEventListener('keyup', filtrarProductosporNombre);

const contenedor = document.querySelector('#contenedor-resultados');
const navegadorPaginacion = document.querySelector('.pagination')
const buscadorTarjetas = document.getElementById('buscador-tarjetas');


const state ={
    searchField: '',
    cargando: false,
    paginaActual: 1,
    productosPorPagina: 12,
    productosFiltrados: [],
    numeroPaginas: 1,
    botonesPorVentana: 5
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

const buscarProductoCategoria = (e) => {
    const data = { 
        categoria: e
     }
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
    },
        body: JSON.stringify(data)
    };
    fetch('https://dimedisa-api.herokuapp.com/buscar-productos-categoria', options)
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


// Haciendo Paginacion
const haciendoPaginacion = (e) => {
    state.productosFiltrados = e;
    const indiceUltimosProductos = state.paginaActual * state.productosPorPagina;
    const indicePrimerosProductos = indiceUltimosProductos - state.productosPorPagina;
    const productosActuales = e.slice(indicePrimerosProductos, indiceUltimosProductos);
    crearTarjetas(productosActuales);
    state.numeroPaginas = Math.ceil(e.length / state.productosPorPagina );
    paginacion()
}


const paginacion = () => {
    if(state.numeroPaginas < 5){
        state.botonesPorVentana = state.numeroPaginas;
    }else{
        state.botonesPorVentana = 5;
    }
    const clasePaginacion = document.querySelector('.pagination');
    let maxLeft = (state.paginaActual - Math.floor(state.botonesPorVentana / 2));
    let maxRight = (state.paginaActual + Math.floor(state.botonesPorVentana / 2));

    if(maxLeft < 1){
        maxLeft = 1;
        maxRight = state.botonesPorVentana
    } else if(maxRight >= state.numeroPaginas){
        maxLeft = state.numeroPaginas - (state.botonesPorVentana - 1);
        if(maxLeft < 1){
            maxLeft = 1;
        }
        maxRight = state.numeroPaginas;
    }
    if(state.paginaActual != 1){
        const liPaginacion = document.createElement('li');
        liPaginacion.className='page-item';
        
        const aPaginacion = document.createElement('a');
            aPaginacion.href='#';
            aPaginacion.className='page-link';
            
            aPaginacion.innerHTML = '<i class="fas fa-angle-double-left"></i>';
            aPaginacion.onclick = function(){
                
                cambiarPagina(1);
            };

        liPaginacion.appendChild(aPaginacion);
        clasePaginacion.appendChild(liPaginacion);
    }

        for(let i = maxLeft; i <= maxRight; i++){
            const liPaginacion = document.createElement('li');
            liPaginacion.className='page-item';
            
            const aPaginacion = document.createElement('a');
                aPaginacion.href='#';
                aPaginacion.className='page-link';
                
                aPaginacion.innerHTML = i;
                aPaginacion.onclick = function(){
                cambiarPagina(i);


                };
                if(aPaginacion.innerHTML == state.paginaActual){
                     aPaginacion.style.backgroundColor = 'white';
                     aPaginacion.style.color = '#008000';
                     aPaginacion.style.border='1px solid lightgray'
                 }

            liPaginacion.appendChild(aPaginacion);
            clasePaginacion.appendChild(liPaginacion);
        }

        if(state.paginaActual != state.numeroPaginas){
            const liPaginacion = document.createElement('li');
            liPaginacion.className='page-item';
            
            const aPaginacion = document.createElement('a');
                aPaginacion.href='#';
                aPaginacion.className='page-link';
                
                aPaginacion.innerHTML = '<i class="fas fa-angle-double-right"></i>';
                aPaginacion.onclick = function(){
                    cambiarPagina(state.numeroPaginas);
    
                };
    
            liPaginacion.appendChild(aPaginacion);
            clasePaginacion.appendChild(liPaginacion);
        }

}

const cambiarPagina = (e) => {
    state.paginaActual = e;
    const indiceUltimosProductos = e * state.productosPorPagina;
    const indicePrimerosProductos = indiceUltimosProductos - state.productosPorPagina;
    const productosActuales = state.productosFiltrados.slice(indicePrimerosProductos, indiceUltimosProductos);
    removeElementsByClass('tile-hover properties-item');
    removeElementsByClass('page-item');
    paginacion();
    crearTarjetas(productosActuales);
}


const irInicioPagina = (e) => {
    const target = e.target;
    $('html, body').animate({
        scrollTop: $(".properties").offset().top
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




contenedor.addEventListener('click', abrirDetalles);

navegadorPaginacion.addEventListener('click', irInicioPagina);

buscadorTarjetas.addEventListener('keyup', filtrarProductosporNombre);

window.addEventListener('load', buscarProductoCategoria(sessionStorage.categoria))


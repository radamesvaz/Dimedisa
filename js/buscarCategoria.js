const categoria = document.querySelector('#categoria-productos');

const buscarCategoria = (e) => {
    e.preventDefault;
    const target = e.target;
    
    sessionStorage.setItem('categoria', target.alt);

    window.open("categorias.html", '_self' );

}


categoria.addEventListener('click', buscarCategoria)
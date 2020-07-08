const nombreProducto = document.querySelector('#titulo-producto');
const descripcionProducto = document.querySelector('#descripcion-producto');
const modoUsoProducto = document.querySelector('#modouso-producto');
const precioProducto = document.querySelector('#precio-producto');
const imagenProducto = document.querySelector('#imagen-producto');


// Esta funcion acomoda los % y coloca los saltos de linea
const decodeURIComponentSafe = (uri, mod) => {
      let out = new String(),
          arr,
          i = 0,
          l,
          x;
      typeof mod === "undefined" ? mod = 0 : 0;
      arr = uri.split(/(%(?:d0|d1)%.{2})/);
      for (l = arr.length; i < l; i++) {
          try {
              x = decodeURIComponent(arr[i]).replace(/\n/g, "<br>");
          } catch (e) {
              x = mod ? arr[i].replace(/%(?!\d+)/g, '%25') : arr[i];
          }
          out += x;
      }

      return out;
  }
  


const crearDetallesProducto = (e) => {

    nombreProducto.innerHTML = decodeURIComponent(e.nombre).replace(/\n/g, "<br>");
    descripcionProducto.innerHTML = decodeURIComponentSafe(e.descripcion);
    modoUsoProducto.innerHTML = decodeURIComponentSafe(e.modouso);
    precioProducto.innerHTML = e.precio;
    imagenProducto.src=`${e.imagen}`;
    

}


const buscarProductoId = () => {
    const options = {
        method: 'get'
    };
    fetch(`https://dimedisa-api.herokuapp.com/buscar-producto/${sessionStorage.productoId}`, options)
    //fetch(`http://localhost:3000/buscar-producto/${sessionStorage.productoId}`, options)
    .then(data => {
        return data.json()
        }).then( res => {
           crearDetallesProducto(res);
        })
            
}

window.addEventListener('load', buscarProductoId)
/*function venta(){
    const forma= document.getElementById('forma');
   
    let p1 = forma['producto1'];
    let p2 = forma['producto2'];
    let p3 = forma['producto3'];
    let p4 = forma['producto4'];
    let p5 = forma['producto5'];
    let p6 = forma['producto6'];
    let p7 = forma['producto7'];
    let p8 = forma['producto8'];
    let p9 = forma['producto9'];
   
    let resultado = parseInt(p1.value)  + parseInt(p2.value)*5 + parseInt(p3.value)*3  + parseInt(p4.value)*4 
    + parseInt(p5.value)*2  + parseInt(p6.value)*4 + parseInt(p7.value)*2  + parseInt(p8.value)*4 + parseInt(p9.value)*7
    document.getElementById('resultado').innerHTML = `resultado: ${resultado}`;
}
const productos=[
    new Postre('canoli', 1),
    new Postre('crepa', 5),
    new Postre('macarron', 3),
    new Postre('muffing', 4),
    new Postre('profiterol', 2),
    new Postre('pastiera', 4),
    new Postre('sfogliatella', 2),
    new Postre('eclair', 4),
    new Postre('gelato', 7),
]
function mostrarProducto(){
    let texto = '';
    for(let producto of productos){
        console.log(producto);
        texto+= `<li> ${producto.postres} ${producto.costo}</li>`;
    }
    document.getElementById('productos').innerHTML=texto;
}*/

const carrito = document.getElementById("carrito");
const platillos = document.getElementById("lista-platillos");
const listaPlatillos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners(){
    platillos.addEventListener("click", comprarPlatillo);
    carrito.addEventListener("click", eliminarPlatillo);
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    document.addEventListener("DOMContentLoaded", leerLocalStorage);
} 

function comprarPlatillo(e){
    e.preventDefauld();
    if(e.target.classList.contains('agregar-carrito')){
        const platillo = e.target.parentElement.parentElement;
        leerDatosPlatillo(platillo);

    }
}

function leerDatosPlatillo(platillo){
    const infoPlatillo = {
        imagen: platillo.querySelector('img').src,
        titulo: platillo.querySelector('h4').textContet,
        precio: platillo.querySelector('.precio span').textContet,
        id: platillo.querySelector('a').getAtribute('data-id')
    }

    insetarCarrito(infoPlatillo);
}


function insetarCarrito(platillo){
    const row = document.createElement('tr');
    row.innerHTML= `
    <td>
        <img src= '${platillo.imagen}' width=100 >
            </td>
            <td>${platillo.titulo}</td>
            <td>${platillo.precio}</td>
            <td>
                <a hrelf="#" class="borrar-platillo" data-id="$platillo.id">X</a>
            </td>   
    `;

}
function eliminarPlatillo(e){
    e.preventDefauld();

    let platillo,
    platilloId;
    if(e.target.classList.contains('borrar-platillo')){
        e.target.parentElement.parentElement.remove();
        platillo=e.target.parentElement.parentElement;
        platilloId= platillo.querySelector('a').getAtribute('data-id');
    }
    eliminarPlatilloLocalStorage(platilloId)
}

function vaciarCarrito(){
    while(listaPlatillos.firstChild){
        listaPlatillos.removeChild(listaPlatillos.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarPlatilloLocalStorage(platillo){
    let platillos = obtenerPlatillosLocalStorage();
platillos.push(platillo);

localStorage.setItem('platillos', JSON.stringify(platillos));
}
function obtenerPlatillosLocalStorage(){
    let platillosLS;
    if(localStorage.getItem('platillos')=== null){
        platillos=[];
    }
    else{
        platillos = JSON.parse(localStorage.getItem('platillos'))
    }
    return platillosLS;
}

function leerLocalStorage(){
    let platilloLS;
    platilloLS = obtenerPlatillosLocalStorage();

    platilloLS= forEch(function(platillo){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <td>${platillo.titulo}</td>
        <td>${platillo.precio}</td>
        
        <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
        </td>

        `;
        listaPlatillos.appendChild(row);

    })
}

function eliminarPlatilloLocalStorage(platillo){
    let platilloLS;
    platilloLS=obtenerPlatillosLocalStorage();

    platilloLS.forEch(function(platilloLS, index){
        if(platilloLS.id === platillo){
            platilloLS.splice(index, 1);
        }

    });
    localStorage.setItem('platillos', JSON.stringify(platilloLS));
}

function vaciarCarrito(){
    localStorage.clear();
}

function abrir(){
    document.getElementById(bolet).style.display="block";
}
/*Recuperamos el div que tiene imagenes del carrusel y la botonera */
let $carruselItem = document.getElementById("carrusel");
let $botoneraCarrusel = document.getElementById("botoneraCarrusel");
let $tarjetas = document.getElementById("tarjetas")

/*recupero los eventos*/
let eventos = data.events;
let fechaActual = Date.parse(data.currentDate); //Convierto a formato fecha
let eventosFiltrados=[];

for (let evento of eventos) {
    let fechaEvento = Date.parse(evento.date);

    if ( fechaEvento>=fechaActual){
        eventosFiltrados.push(evento);
    };
    
}
console.log(eventosFiltrados.length)

let componentes = "";//Aca se guarda el carrusel item con referencia a la imagen de cada evento
let botones = ""; // Aca se guardan los botones del carrusel.
let tarjetas=""// Aca se guardan las tarjetas

/*Creo un string con todos los componentes (imagenes) del carrusel y le coloco la ruta a la imagen recuperada del arry 
    A su vez creo los botones para el carrusel.
*/

for (let i = 0; i < eventosFiltrados.length; i++) {

    if (i == 0) {
        componentes += `<div class="carousel-item active ">
                            <img src="${eventosFiltrados[i].image}" class="d-block w-100" alt="Imagen concierto">
                              <div class="carousel-caption d-none d-md-block">
                                  <h2>UPCOMING EVENTS</h2>
                             </div>
                        </div>`;

        botones += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active"
        aria-current="true" aria-label="Slide ${i + 1}"></button>`;

        tarjetas+=`<div class="card mb-4" style="width: 15rem;">
                        <img src="${eventosFiltrados[i].image}" class="card-img-top" alt="Imagen ${eventosFiltrados[i].name}">
                        <div class="card-body">
                            <h5 class="card-title text-center">${eventosFiltrados[i].name}</h5>
                            <p class="card-text">${eventosFiltrados[i].description}</p>
                            <div class="d-flex justify-content-between">
                                <span class="fw-bolder">$ ${eventosFiltrados[i].price}</span>
                                <a href="./details.html" class="btn btn-dark">Details</a>
                            </div>
                        </div>
                    </div>`;

    } else {
        componentes += `<div class="carousel-item">
                            <img src="${eventosFiltrados[i].image}" class="d-block w-100" alt="Imagen concierto">
                            <div class="carousel-caption d-none d-md-block">
                                <h2>UPCOMING EVENTS</h2>
                            </div>
                        </div>`;

        botones += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"
                        aria-label="Slide ${i + 1}"></button>`;

        tarjetas+=`<div class="card mb-4" style="width: 15rem;">
                        <img src="${eventosFiltrados[i].image}" class="card-img-top" alt="Imagen ${eventosFiltrados[i].name}">
                        <div class="card-body">
                            <h5 class="card-title text-center">${eventosFiltrados[i].name}</h5>
                            <p class="card-text">${eventosFiltrados[i].description}</p>
                            <div class="d-flex justify-content-between">
                                <span class="fw-bolder">$ ${eventosFiltrados[i].price}</span>
                                <a href="./details.html" class="btn btn-dark">Details</a>
                            </div>
                        </div>
                    </div>`;
    }
}

//console.log(componentes);
//console.log(botones);
console.log(eventosFiltrados.length);

/*Colocamos los componentes creados en el carrusel.*/
$botoneraCarrusel.innerHTML= botones;
$carruselItem.innerHTML = componentes;
$tarjetas.innerHTML =tarjetas;

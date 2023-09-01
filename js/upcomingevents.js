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

let carruselItem = "";//Aca se guarda el carrusel item con referencia a la imagen de cada evento
let tarjetas = ""// Aca se guardan las tarjetas
let botones = ""; // Aca se guardan los botones del carrusel.

/*Funcion que devuelve el HTML para las imagenes del carrusel*/
function templateCarrusel(eventos, tiempo) {
    for (let i = 0; i < eventos.length; i++) {

        if (i == 0) {
            carruselItem += `<div class="carousel-item active ">
                                <img src="${eventos[i].image}" class="d-block w-100" alt="Imagen concierto">
                                  <div class="carousel-caption d-none d-md-block">
                                      <h2>${tiempo}</h2>
                                 </div>
                            </div>`;
        } else {
            carruselItem += `<div class="carousel-item">
                                <img src="${eventos[i].image}" class="d-block w-100" alt="Imagen concierto">
                                <div class="carousel-caption d-none d-md-block">
                                    <h2>${tiempo}</h2>
                                </div>
                            </div>`;
        }
  
    }
          return carruselItem;
};

/*Funcion que devuelve el HTML para los botones del carrusel*/
function templateBotoneraCarrusel(eventos) {

    for (let i = 0; i < eventos.length; i++) {
        if (i == 0) {
            botones += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active"
            aria-current="true" aria-label="Slide ${i + 1}"></button>`;

        } else {
            botones += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"
            aria-label="Slide ${i + 1}"></button>`;
        }
    }
    return botones;
}

/*Funcion que devuelve el HTML para las tarjetas*/
function templateTarjetas(eventos) {
    for (let i = 0; i < eventos.length; i++) {

        if (i == 0) {
            tarjetas += `<div class="card mb-4" style="width: 15rem;">
                            <img src="${eventos[i].image}" class="card-img-top" alt="Imagen ${eventos[i].name}">
                            <div class="card-body">
                                <h5 class="card-title text-center">${eventos[i].name}</h5>
                                <p class="card-text">${eventos[i].description}</p>
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder">$ ${eventos[i].price}</span>
                                    <a href="./details.html" class="btn btn-dark">Details</a>
                                </div>
                            </div>
                        </div>`;

        } else {

            tarjetas += `<div class="card mb-4" style="width: 15rem;">
                            <img src="${eventos[i].image}" class="card-img-top" alt="Imagen ${eventos[i].name}">
                            <div class="card-body">
                                <h5 class="card-title text-center">${eventos[i].name}</h5>
                                <p class="card-text">${eventos[i].description}</p>
                                <div class="d-flex justify-content-between">
                                    <span class="fw-bolder">$ ${eventos[i].price}</span>
                                    <a href="./details.html" class="btn btn-dark">Details</a>
                                </div>
                            </div>
                        </div>`;
        }
    }
    return tarjetas;

}


/*Colocamos los componentes creados en HTML.*/
$botoneraCarrusel.innerHTML = templateBotoneraCarrusel(eventosFiltrados);
$carruselItem.innerHTML = templateCarrusel(eventosFiltrados, "UPCOMING EVENTS");
$tarjetas.innerHTML = templateTarjetas(eventosFiltrados);
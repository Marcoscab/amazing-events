/*------------------------------------------------------------------*/
/*----------------------------VARIABLES----------------------------*/

/*Recuperamos los elementos a modificar dinamicamente */
let $carruselItem = document.getElementById("carrusel");
let $botoneraCarrusel = document.getElementById("botoneraCarrusel");
let $tarjetas = document.getElementById("tarjetas");
let $checkbox = document.getElementById("checkboxFiltros");

/*recupero los eventos de la DB*/
let eventos = data.events;

let carruselItem = "";//Aca se guarda el carrusel item con referencia a la imagen de cada evento
let botones = ""; // Aca se guardan los botones del carrusel.
let checkboxs = ""; // Aca se guardan los checkbox creados
let setDeChecks = new Set(); // Lista donde se guardan los checks marcados.

/* Recuperamos todas las categorias y las guardamos en un array. Para esto usamos la funcion map
que me devuelve un array con el return de la funcion flecha */
let categorias = eventos.map((evento) => { return evento.category });

/*Para borrar los duplicados creo un nuevo array con un Set q no permite duplicados pasando 
por argunmento el array de categorias. A su ves con el metodo from lo convierto a array nuevamente*/
let categoriasFiltrada = Array.from(new Set(categorias));

/*-------------------------------------------------------------------*/


/*------------------------------------------------------------------*/
/*----------------------------FUNCIONES----------------------------*/

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

/*Funcion que inserta las tarjetas en el HTML en base a los eventos recibidos*/
function insertarTarjetas(eventos, contenedorTarjetas) {
    let tarjetas="";
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
    //Cargamos las tarjetas.
    contenedorTarjetas.innerHTML = tarjetas;
};

//Funcion q crea el codigo HTML de los checkbox dinamicamente.
function templateCheckbox(categorias) {
    console.log(categorias);
    for (let i = 0; i < categorias.length; i++) {
        checkboxs += `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="${categorias[i]}" value="${categorias[i]}">
            <label class="form-check-label" for="${categorias[i]}">${categorias[i]}</label>
        </div>`;
    }
    return checkboxs;
}

/* Ahora creamos el evento para filtrar las tarjetas cuando se selecciona un checkbox.*/
function filtrarTarjeta(e,eventos,contenedorTarjetas,setchk) {
    if (e.target.checked) {
        setchk.add(e.target.value);
    } else {
        setchk.delete(e.target.value);
    };
    //convierto el Set a Array.
    let arrayDeChecks = Array.from(setchk);
    if(arrayDeChecks.length!=0){
        let tarFilt = eventos.filter((evento) => { return arrayDeChecks.indexOf(evento.category) != -1 });
        insertarTarjetas(tarFilt,contenedorTarjetas);
    }else{
        insertarTarjetas(eventos,contenedorTarjetas);//Si no hay ningun filtro seleccionado muestro todos los checks.
    };
};

/*-------------------------------------------------------------------*/

/*Colocamos los componentes creados en HTML.*/
$botoneraCarrusel.innerHTML = templateBotoneraCarrusel(eventos);
$carruselItem.innerHTML = templateCarrusel(eventos, "HOME");
$checkbox.innerHTML = templateCheckbox(categoriasFiltrada);
insertarTarjetas(eventos,$tarjetas);



/*------------------------------------------------------------------*/
/*----------------------------ACTION LISTENERS----------------------------*/
$checkbox.addEventListener("click", (e)=>{filtrarTarjeta(e,eventos,$tarjetas,setDeChecks)});




















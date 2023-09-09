/*----------------------------VARIABLES----------------------------*/

/*Recuperamos los elementos a modificar dinamicamente */
let $carruselItem = document.getElementById("carrusel");
let $botoneraCarrusel = document.getElementById("botoneraCarrusel");
let $tarjetas = document.getElementById("tarjetas");
let $checkbox = document.getElementById("checkboxFiltros");
let $serchBar = document.getElementById("serchBar");

let eventos = data.events; // GUardo los datos de la DB
let setDeChecks = new Set(); // Lista donde se guardan los checks marcados.
let fechaActual = Date.parse(data.currentDate); //Convierto la fecha actual al formato fecha
let eventosFiltrados=[];
/*-----------------------------FIN VARIABLES---------------------------*/

/*----------------------------FUNCIONES----------------------------*/

//Funcion para filtrar eventos futuros por fecha actual. 
function proximosEventos(eventos,fechaActual){
    let eventosFiltrados=[];
    for (let evento of eventos) {
        let fechaEvento = Date.parse(evento.date);
    
        if ( fechaEvento>=fechaActual){
            eventosFiltrados.push(evento);
        };
    }
    return eventosFiltrados;
}

//Funcion: Crea el HTML para las imagenes del carrusel y llama a la funcion para insertarlo
function templateCarrusel(eventos, componente, pagina) {
    let carruselItem = "";

    for (let i = 0; i < eventos.length; i++) {

        if (i == 0) {
            carruselItem += `<div class="carousel-item active ">
                                <img src="${eventos[i].image}" class="d-block w-100" alt="Imagen concierto">
                                  <div class="carousel-caption d-none d-md-block">
                                      <h2>${pagina}</h2>
                                 </div>
                            </div>`;
        } else {
            carruselItem += `<div class="carousel-item">
                                <img src="${eventos[i].image}" class="d-block w-100" alt="Imagen concierto">
                                <div class="carousel-caption d-none d-md-block">
                                    <h2>${pagina}</h2>
                                </div>
                            </div>`;
        }
    }
    insertarComponente(componente, carruselItem);
};

//Funcion: crea el HTML para los botones del carrusel y llama a la funcion para insertarlo
function templateBotoneraCarrusel(eventos, componente) {
    let botones = "";

    for (let i = 0; i < eventos.length; i++) {
        if (i == 0) {
            botones += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active"
            aria-current="true" aria-label="Slide ${i + 1}"></button>`;

        } else {
            botones += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"
            aria-label="Slide ${i + 1}"></button>`;
        }
    }
    insertarComponente(componente, botones);
    /* return botones; */
}

//Funcion: crea el HTML de las tarjetas y llama a la funcion para insertarlo
function templateTarjetas(eventos, componente) {
    let tarjetas = "";

    if (eventos.length) {
        for (let i = 0; i < eventos.length; i++) {

            if (i == 0) {
                tarjetas += `<div class="card mb-4" style="width: 15rem;">
                                <img src="${eventos[i].image}" class="card-img-top" alt="Imagen ${eventos[i].name}">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${eventos[i].name}</h5>
                                    <p class="card-text">${eventos[i].description}</p>
                                    <div class="d-flex justify-content-between">
                                        <span class="fw-bolder">$ ${eventos[i].price}</span>
                                        <a href="./details.html?id=${eventos[i]._id}" class="btn btn-dark">Details</a>
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
                                        <a href="./details.html?id=${eventos[i]._id}" class="btn btn-dark">Details</a>
                                    </div>
                                </div>
                            </div>`;
            }
        };
    } else {
        tarjetas += `
        <div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
                No se encontraron coincidencias en la búsqueda.
            </div>
        </div>`
    };

    //Cargamos las tarjetas.
    insertarComponente(componente, tarjetas);
};

//Funcion: crea el codigo HTML de los checkbox y llama a la funcion para insertarlo.
function templateCheckbox(componente, categorias) {
    let checkboxs = "";

    for (let i = 0; i < categorias.length; i++) {
        checkboxs += `
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" id="${categorias[i]}" value="${categorias[i]}">
            <label class="form-check-label" for="${categorias[i]}">${categorias[i]}</label>
        </div>`;
    }
    insertarComponente(componente, checkboxs);
}

//Funcion: combina el filtro por checkbox y serchBar y llama funcion insertar las tarjetas
function filtro(event, eventos, setDeChecks, serchBar, contenedor) {

    if (event.target.type == "checkbox") {
        setDeChecks = checkBoxSeleccionados(event, setDeChecks)
    };
    let categoriasChecked = Array.from(setDeChecks);
    let eventosFiltradoChk = filtrarXcheck(eventos, categoriasChecked);
    let eventosFiltrado = filtrarXserchBar(serchBar, eventosFiltradoChk);
    //console.log(arrayFiltradoChk);
    //console.log(arrayFiltrado);
    templateTarjetas(eventosFiltrado, contenedor)

};

//FUncion: devuelve un array con los checkbox seleccionados.
function checkBoxSeleccionados(event, setchk) {
    if (event.target.checked) {
        setchk.add(event.target.value);
    } else {
        setchk.delete(event.target.value);
    };
    return setchk;
};

// Funcion: Crea un array filtrado de eventos segun los checkbox seleccionados
function filtrarXcheck(eventos, categoriasChecked) {

    let eventosFiltrados = [];

    if (categoriasChecked.length != 0) {
        eventosFiltrados = eventos.filter((evento) => { return categoriasChecked.indexOf(evento.category) != -1 });
    } else {
        eventosFiltrados = eventos;
    };

    return eventosFiltrados;
};

//Funcion: Crea un array filtrado de eventos segun los el texto introduciodo en el serchbar.
function filtrarXserchBar(componente, eventos) {
    let arrayFiltrado = [];
    //console.log([event.target.value]);
    arrayFiltrado = eventos.filter((evento) => { return evento.name.toLowerCase().startsWith(componente.value.toLowerCase()) });
    //console.log(arrayFiltrado);
    return arrayFiltrado;
};

//Funcion para insertar componentes
function insertarComponente(component, template) {
    component.innerHTML = template;
};

//Funcion para recuperar Array de categorias.
function obtenerCategorias(eventos) {
    /* Recuperamos todas las categorias y las guardamos en un array. Para esto usamos la funcion map
    que me devuelve un array con el return de la funcion flecha */
    let categorias = eventos.map((evento) => { return evento.category });

    /*Para borrar los duplicados creo un nuevo array con un Set q no permite duplicados pasando 
    por argunmento el array de categorias. A su ves con el metodo from lo convierto a array nuevamente*/
    let categoriasFiltrada = Array.from(new Set(categorias));

    return categoriasFiltrada;
};

//Funcion q se conecta a la api para recuperar info e inicializar la página.
function inicializar(url, checkbox, carruselItem, botoneraCarrusel, tarjetas,serchBar) { 
    fetch(url)
        .then((response) => { return response.json() })
        .then(data => {
            let eventos = data.events;
            let fechaActual = Date.parse(data.currentDate);
            let eventosFiltrado = proximosEventos(eventos,fechaActual);
            let categorias = obtenerCategorias(eventosFiltrado);
            templateCheckbox(checkbox, categorias);
            templateCarrusel(eventosFiltrado, carruselItem, "UPCOMING EVENTS");
            templateBotoneraCarrusel(eventosFiltrado, botoneraCarrusel);
            templateTarjetas(eventosFiltrado, tarjetas);

            /*----------------------------ACTION LISTENERS----------------------------*/
            checkbox.addEventListener("click", (event) => { filtro(event, eventosFiltrado, setDeChecks, serchBar, tarjetas) });
            serchBar.addEventListener("input", (event) => { filtro(event, eventosFiltrado, setDeChecks, serchBar, tarjetas); });

        })
        .catch((error) => { console.log(error) });

}
/*----------------------------FIN FUNCIONES---------------------------------*/


/*--------------------LLAMADO A FUNCIONES----------------------------*/
let url = "https://mindhub-xj03.onrender.com/api/amazing";
inicializar(url, $checkbox, $carruselItem, $botoneraCarrusel, $tarjetas,$serchBar);
/*--------------------FIN LLAMADO FUNCIONES ARRANQUE-----------------------*/


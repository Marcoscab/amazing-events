/*Recuperamos el div que tiene imagenes del carrusel */
let carrusel = document.getElementsByClassName("carousel-inner");

/*recupero los eventos*/
let eventos = data.events;

let componentes;
/*Creo un string con todos los componentes del carrusel y le coloco la ruta a la imagen recuperada del arry */
for (let i=0; i < eventos.length; i++) {

    if (i == 0) {
        componentes += `<div class="carousel-item active ">
        <img src="${eventos[i].image}" class="d-block w-100" alt="Imagen concierto">
        <div class="carousel-caption d-none d-md-block">
            <h2>HOME</h2>
        </div>
    </div>`;
    } else {


        componentes += `<div class="carousel-item">
                            <img src="${eventos[i].image}" class="d-block w-100" alt="Imagen concierto">
                            <div class="carousel-caption d-none d-md-block">
                                <h2>HOME</h2>
                            </div>
                        </div>`;
    }
}

console.log(componentes);






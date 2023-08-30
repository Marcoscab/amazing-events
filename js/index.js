/*Recuperamos el div que tiene imagenes del carrusel y la botonera */
let carrusel = document.getElementById("carrusel");
let botoneraCarrusel = document.getElementById("botoneraCarrusel");

/*recupero los eventos*/
let eventos = data.events;

let componentes = "";//Aca se guarda el carrusel item con referencia a la imagen de cada evento
let botones = ""; // Aca se guardan los botones del carrusel.

/*Creo un string con todos los componentes (imagenes) del carrusel y le coloco la ruta a la imagen recuperada del arry 
    A su vez creo los botones para el carrusel.
*/

for (let i = 0; i < eventos.length; i++) {

    if (i == 0) {
        componentes += `<div class="carousel-item active ">
                            <img src="${eventos[i].image}" class="d-block w-100" alt="Imagen concierto">
                              <div class="carousel-caption d-none d-md-block">
                                  <h2>HOME</h2>
                             </div>
                        </div>`;

        botones += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active"
        aria-current="true" aria-label="Slide ${i + 1}"></button>`;

    } else {
        componentes += `<div class="carousel-item">
                            <img src="${eventos[i].image}" class="d-block w-100" alt="Imagen concierto">
                            <div class="carousel-caption d-none d-md-block">
                                <h2>HOME</h2>
                            </div>
                        </div>`;

        botones += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"
                        aria-label="Slide ${i + 1}"></button>`;
    }
}

//console.log(componentes);
console.log(botones);

botoneraCarrusel.innerHTML= botones;
carrusel.innerHTML = componentes;






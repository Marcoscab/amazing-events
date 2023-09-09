/*----------------------------VARIABLES----------------------------*/

const $tarjeta = document.getElementById("tarjetaDetallada");
//let eventos = data.events; // Guardo los datos de la DB 
const objetoURL = new URLSearchParams(location.search);//Obtengo el objeto url donde se guarda los datos de q viajan en la URL
const id = objetoURL.get("id");//Obtengo el Id que viaja en la URL utilizando par clave valor.

/*----------------------------FIN VARIABLES------------------------*/


/*----------------------------FUNCIONES----------------------------*/

/* async function buscarEventos(url) {

    try {
        const response = await fetch(url);
        console.log(response);
        if (!response.ok) {
            throw { Ok: false, msg: "Error 404" };
        }
        const data = await response.json();
        console.log(data.events);
        return data.events;


    } catch (error) {
        console.log(error);
    }
} */

//Funcion: busca el evento segun Id y lo devuelve
function buscarEvento(eventos, id) {
    console.log(eventos);
    console.log(id);
    let evento = eventos.find((evento) => { return evento._id == id });
    console.log(evento);
    return evento;
}

function templateTarjeta(evento) {
    let tarjeta = `
    <div class="row g-0 align-items-center">
        <div class="col-md-4">
            <img src="${evento.image}" class="img-fluid rounded-start" alt="Imagen de ${evento.name}">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title text-center mb-0">${evento.name}</h5>
                <p class="card-text mb-0">${evento.description}</p>
                <p class="card-text mb-0"><strong>Lugar: </strong>${evento.place}</p>
                <p class="card-text mb-0"><strong>Capacidad: </strong>${evento.capacity}</p>
                <p class="card-text mb-0"><strong>Precio: $</strong>${evento.price}</p>
            </div>
        </div>
    </div>`
    return tarjeta;

};

//Funcion para insertar componentes
function insertarComponente(component, template) {
    component.innerHTML = template;
};

function inicializar(url, idEvento, tarjetaDetalles) {

    fetch(url)
    .then((response) => {return response.json(); })
    .then((datos)=>{
        let eventos = datos.events;
        //console.log(eventos);
        let evento= buscarEvento(eventos,idEvento);
        let template= templateTarjeta(evento);
        insertarComponente(tarjetaDetalles,template);
    });

}

/*----------------------------FIN FUNCIONES------------------------*/


/*--------------------LLAMADO FUNCIONES ARRANQUE----------------------------*/
let url = "https://mindhub-xj03.onrender.com/api/amazing";
inicializar(url,id,$tarjeta);

/*--------------------FIN LLAMADO FUNCIONES ARRANQUE------------------------*/
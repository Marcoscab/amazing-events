/*----------------------------VARIABLES----------------------------*/
let url = "https://mindhub-xj03.onrender.com/api/amazing";
let $tablaStatics = document.getElementById("tablaStatics");




/*----------------------------FUNCIONES----------------------------*/
//Funcion q se conecta a la api para recuperar info e inicializar la página.
function inicializar(url, tablaStatics) {
    let eventos = [];
    let eventosPasados = [];
    let eventosFuturos = [];
    let fechaActual;
    let eventoMayoAsistencia;
    let eventoMenorAsistencia;
    let eventoMayorCapacidad;

    fetch(url)
        .then((response) => { return response.json() })
        .then(data => {
            eventos = data.events; //Recupero todos los eventos
            fechaActual = Date.parse(data.currentDate); // Recupero fecha actual
            eventosFuturos = proximosEventos(eventos, fechaActual);//Recupero eventos futuros
            eventosPasados = pasadosEventos(eventos, fechaActual);//Recupero eventos pasados
            eventoMayoAsistencia = mayorAsistencia(eventosPasados);//Recupero evento de mayor asistencia
            eventoMenorAsistencia = menorAsistencia(eventosPasados);//Recupero evento de menor asistencia
            eventoMayorCapacidad = mayorCapacidad(eventos);//Recupero evento de mayor capacidad
            let templateStatics = templateEventStatics(eventoMayoAsistencia, eventoMenorAsistencia,eventoMayorCapacidad);
            insertarComponente(tablaStatics, templateStatics);
        })
        .catch((error) => { console.log(error) });
}

/* async function recuperarEventos(url) {

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

//Funcion para filtrar eventos futuros por fecha actual. 
function proximosEventos(eventos, fechaActual) {
    let eventosFiltrados = [];
    for (let evento of eventos) {
        let fechaEvento = Date.parse(evento.date);

        if (fechaEvento >= fechaActual) {
            eventosFiltrados.push(evento);
        };
    }
    return eventosFiltrados;
}

//Funcion para filtrar eventos futuros por fecha actual. 
function pasadosEventos(eventos, fechaActual) {
    let eventosFiltrados = [];
    for (let evento of eventos) {
        let fechaEvento = Date.parse(evento.date);

        if (fechaEvento < fechaActual) {
            eventosFiltrados.push(evento);
        };
    }

    return eventosFiltrados;
}

//Funcion, busca evento con mayo asistencia
function mayorAsistencia(eventos) {
    let mayorAsistencia = 0;
    let eventoMayoAsistencia;
    let asistencia = 0;
    eventos.forEach(evento => {
        asistencia = (evento.assistance / evento.capacity) * 100

        if (asistencia > mayorAsistencia) {
            eventoMayoAsistencia = evento;
            mayorAsistencia = asistencia;
        }
    });

    return eventoMayoAsistencia;

}

//Funcion, busca evento con menor asistencia
function menorAsistencia(eventos) {
    let menorAsistencia = 100;
    let eventoMenorAsistencia;
    let asistencia = 0;
    eventos.forEach(evento => {
        asistencia = (evento.assistance / evento.capacity) * 100

        if (asistencia < menorAsistencia) {
            eventoMenorAsistencia = evento;
            menorAsistencia = asistencia;
        }
    });
    return eventoMenorAsistencia;
}

//Funcion, busca evento con mayor capacidad
function mayorCapacidad(eventos) {
    let mayorCapacidad = 0;
    let eventoMayorCapacidad;
    let capacidad = 0;
    eventos.forEach(evento => {
        capacidad = evento.capacity

        if (capacidad > mayorCapacidad) {
            eventoMayorCapacidad = evento;
            mayorCapacidad = capacidad;
        }
    });

    return eventoMayorCapacidad;

}

//Funcion para completar Event Static
function templateEventStatics(mayorAsistencia, menorAsistencia, mayorCapacidad) {
    template = `                        
    <td>${mayorAsistencia.name}&nbsp &nbsp ${((mayorAsistencia.assistance/mayorAsistencia.capacity)*100).toFixed(2)}%</td>
    <td>${menorAsistencia.name}&nbsp &nbsp ${((menorAsistencia.assistance/menorAsistencia.capacity)*100).toFixed(2)}%</td>
    <td>${mayorCapacidad.name}&nbsp &nbsp ${mayorCapacidad.capacity}</td>`
    return template;
}

//Funcion para insertar componentes
function insertarComponente(component, template) {
    component.innerHTML = template;
};


/*----------------------------FIN FUNCIONES---------------------------------*/


/*--------------------LLAMADO A FUNCIONES----------------------------*/
//inicializar(url);
inicializar(url,$tablaStatics);



/*--------------------FIN LLAMADO FUNCIONES ARRANQUE-----------------------*/

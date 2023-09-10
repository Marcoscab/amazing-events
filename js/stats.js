/*----------------------------VARIABLES----------------------------*/
let url = "https://mindhub-xj03.onrender.com/api/amazing";
let $tablaStatics = document.getElementById("tablaStatics");
let $tablaPastStatics = document.getElementById("tablaPastStatics");




/*----------------------------FUNCIONES----------------------------*/
//Funcion q se conecta a la api para recuperar info e inicializar la página.
function inicializar(url, tablaStatics, tablaPastStatics) {
    let eventos = [];
    let eventosPasados = [];
    let eventosFuturos = [];
    let fechaActual;
    let eventoMayoAsistencia;
    let eventoMenorAsistencia;
    let eventoMayorCapacidad;
    let categorias = [];

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
            let templateStatics = templateEventStatics(eventoMayoAsistencia, eventoMenorAsistencia, eventoMayorCapacidad);
            insertarComponente(tablaStatics, templateStatics); // Inserto componenete tabla event statics.
            categorias = obtenerCategorias(eventos);//Recupero las categorias
            let estadisticaEventosPasados = estadisticasPorCategoriasEvtP(categorias, eventosPasados);//Recupero array de obj con info x cada categoria de evt pasados
            let templateEstadisticaEventos = templateEstadisticas(estadisticaEventosPasados); // creo el template de HTML
            insertarComponente(tablaPastStatics, templateEstadisticaEventos); // Inserto componenete tabla statics past events.
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
    <td>${mayorAsistencia.name}&nbsp &nbsp ${((mayorAsistencia.assistance / mayorAsistencia.capacity) * 100).toFixed(2)}%</td>
    <td>${menorAsistencia.name}&nbsp &nbsp ${((menorAsistencia.assistance / menorAsistencia.capacity) * 100).toFixed(2)}%</td>
    <td>${mayorCapacidad.name}&nbsp &nbsp ${mayorCapacidad.capacity}</td>`
    return template;
}

//Funcion para insertar componentes
function insertarComponente(component, template) {
    console.log(template);
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

//Funcion para obtener estadisticas por categorias para eventos pasados
function estadisticasPorCategoriasEvtP(categorias, eventos) {
    let estadisticasEventos = { //en este objeto guardo los datos para cada categoria
        categoria: "",
        revenues: 0,
        porcentajeAsistencia: 0,
    };

    let arrayEstadisticas = []; //Guardo el objeto de cada cat que contiene la info.
    let contador = 0; // contador para calcular promedio.

    //Recorremos cada categoria y por cada categoria recorremos los eventos para recopilar los datos.
    categorias.forEach(categoria => {
        contador = 0;
        estadisticasEventos = {
            categoria: "",
            revenues: 0,
            porcentajeAsistencia: 0,
        };

        eventos.forEach(evento => {
            if (evento.category === categoria) {
                contador++;
                estadisticasEventos.revenues += evento.price * evento.assistance;
                estadisticasEventos.porcentajeAsistencia += (evento.assistance / evento.capacity) * 100;
            }
        });
        estadisticasEventos.categoria = categoria;
        estadisticasEventos.porcentajeAsistencia = estadisticasEventos.porcentajeAsistencia / contador;
        arrayEstadisticas.push(estadisticasEventos);
    })

    return arrayEstadisticas;
}

//Funcion para crear template estadisticas de Upcoming y past events.
function templateEstadisticas(estadisticas) {
    template = `        
    <tr >
        <th>Categories</th>
        <th>Revenues</th>
        <th>Percentage of assitance</th>
    </tr>`

    estadisticas.forEach(estadistica => {
        template += `
        <tr>                   
            <td>${estadistica.categoria}</td>
            <td>$${estadistica.revenues}</td>
            <td>${estadistica.porcentajeAsistencia.toFixed(2)}%</td>
        </tr>`
    });
    return template;
}

/*----------------------------FIN FUNCIONES---------------------------------*/


/*--------------------LLAMADO A FUNCIONES----------------------------*/
//inicializar(url);
inicializar(url, $tablaStatics, $tablaPastStatics);



/*--------------------FIN LLAMADO FUNCIONES ARRANQUE-----------------------*/

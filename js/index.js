

/*VUE*/

const { createApp } = Vue

createApp({
    data() {
        return {
            //propiedades reactivas
            url: "https://mindhub-xj03.onrender.com/api/amazing",
            eventos: [],
            categorias: [],
            categoriasFiltrada: [],
            setDeChecks: new Set(),
            categoriasChecked: [],
            eventosFiltrados: [],
            serchText:""
        }
    },
    created() {
        fetch(this.url)
            .then((response) => { return response.json() })
            .then(data => {
                this.eventos = data.events;
                this.obtenerCategorias();
                this.eventosFiltrados = this.eventos;
            })
            .catch((error) => { console.log(error) });

    },
    methods: {
        //Funcion para recuperar Array de categorias.
        obtenerCategorias() {
            //Recuperamos todas las categorias y las guardamos en un array. Para esto usamos la funcion map
            //que me devuelve un array con el return de la funcion flecha
            this.categorias = this.eventos.map((evento) => { return evento.category });
            //Para borrar los duplicados creo un nuevo array con un Set q no permite duplicados pasando 
            //por argunmento el array de categorias. A su ves con el metodo from lo convierto a array nuevamente
            this.categoriasFiltrada = Array.from(new Set(this.categorias));
        },

        //Funcion: combina el filtro por checkbox y serchBar y llama funcion insertar las tarjetas
        filtro(event) {

            if (event.target.type == "checkbox") {

                this.checkBoxSeleccionados(event);
            }
            this.categoriasChecked = Array.from(this.setDeChecks);
            this.filtrarXcheck();
            this.filtrarXserchBar();
        },
        //Funcion: completa un set de checks seleccionados.
        checkBoxSeleccionados(event) {

            if (event.target.checked) {
                this.setDeChecks.add(event.target.value);
            } else {
                this.setDeChecks.delete(event.target.value);
            };
        },

        // Funcion: Crea un array filtrado de eventos segun los checkbox seleccionados
        filtrarXcheck() {

            if (this.categoriasChecked.length != 0) {
                this.eventosFiltrados = this.eventos.filter((evento) => { return this.categoriasChecked.indexOf(evento.category) != -1 });
            } else {
                this.eventosFiltrados = this.eventos;
            };

        },

        //Funcion: Crea un array filtrado de eventos segun los el texto introduciodo en el serchbar.
        filtrarXserchBar() {
            let arrayFiltrado = [];
            //console.log([event.target.value]);
            this.eventosFiltrados =  this.eventosFiltrados.filter((evento) => { return evento.name.toLowerCase().startsWith(this.serchText.toLowerCase()) });
        }


    }
}).mount('#app')





















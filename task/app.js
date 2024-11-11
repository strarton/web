const llista = new llistaTasques()

function crea() {
    const usuario = document.getElementById('usuario').value
    const prioridad = document.getElementById('prioridad').value
    const texto = document.getElementById('texto').value

    if (!texto) {
        document.getElementById("texto").style.color = "red"
        return
    }
    
    document.getElementById("texto").style.color = "grey"
    const tasca1 = new Tasca(usuario, texto, prioridad)
    llista.agregarTarea(tasca1)
    renderTareas()
}

function renderTareas(tareas = llista.obtenerTareas()) {
    const contenedorTareas = document.getElementById("tareas")
    contenedorTareas.innerHTML = ''

    tareas.forEach((tareaObj, index) => {
        const tareaData = tareaObj.getTasca()

        const tareaDiv = document.createElement("div")
        tareaDiv.classList.add("tareas")

        const prioridadDiv = document.createElement("div")
        switch (tareaData.prioridad) {
            case "Muy Alta":
                prioridadDiv.className = "muyalta"
                break;
            case "Alta":
                prioridadDiv.className = "alta"
                break;
            case "Media":
                prioridadDiv.className = "media"
                break;
            case "Baja":
                prioridadDiv.className = "baja"
                break;
            default:
                prioridadDiv.className = ""
                break;
        }

        const titulo = document.createElement("h1")
        titulo.textContent = `Tarea ${index + 1}`

        const contenido = document.createElement("p")
        contenido.innerHTML = `
            Fecha: ${tareaData.fecha} <br>
            Usuario: ${tareaData.usuario} <br>
            Prioridad: ${tareaData.prioridad} <br>
            Contenido: ${tareaData.contenido}
        `

        const botonEliminar = document.createElement("button")
        botonEliminar.classList.add("eliminar")
        botonEliminar.textContent = "Eliminar"
        botonEliminar.onclick = () => eliminar(index)

        tareaDiv.appendChild(prioridadDiv)
        tareaDiv.appendChild(titulo)
        tareaDiv.appendChild(contenido)
        tareaDiv.appendChild(botonEliminar)

        contenedorTareas.appendChild(tareaDiv)
    })
}

function filtra() {
    const usuario = document.getElementById("usuariodos").value;
    const ordenPrioridad = document.getElementById("prioridad2").value;
    let tareas = llista.obtenerTareas();

    // Filtrado por usuario
    if (usuario) {
        tareas = tareas.filter(tarea => tarea.getusuario().includes(usuario));
    }

    // Ordenamiento por prioridad o fecha
    if (ordenPrioridad === "prioridad") {
        tareas.sort((a, b) => {
            const prioridadOrden = { "Muy Alta": 1, "Alta": 2, "Media": 3, "Baja": 4 };
            return prioridadOrden[a.getprioridad()] - prioridadOrden[b.getprioridad()];
        });
    } else if (ordenPrioridad === "fecha") {
        tareas.sort((a, b) => b.getfecha() - a.getfecha());
    }

    // Renderizar las tareas filtradas y ordenadas
    renderTareas(tareas);
}


function eliminar(index) {
    llista.eliminarTareas(index)
    renderTareas()
}

// prueba
const tasca1 = new Tasca("Edu", "prova1", "Alta")
llista.agregarTarea(tasca1)

const tasca2 = new Tasca("Edu", "prova2", "Muy Alta")
llista.agregarTarea(tasca2)

const tasca3 = new Tasca("Edu", "prova3", "Media")
llista.agregarTarea(tasca3)

renderTareas()

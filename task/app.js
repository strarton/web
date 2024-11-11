const llista = new llistaTasques()
//llista = getCookie("llistaGuardada")

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
    //setCookie("llistaGuardada", llista, 200)

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
    const usuario = document.getElementById("usuariodos").value
    const ordenPrioridad = document.getElementById("prioridad2").value

    const tareasFiltradas = llista.filtraTareas(usuario, ordenPrioridad)
    renderTareas(tareasFiltradas)

}


function eliminar(index) {
    llista.eliminarTareas(index)
    renderTareas()
    
    //setCookie(llistaGuardada, llista, 200)
}

// prueba
const tasca1 = new Tasca("Edu", "prova1", "Alta")
llista.agregarTarea(tasca1)

const tasca2 = new Tasca("Edu", "prova2", "Muy Alta")
llista.agregarTarea(tasca2)

const tasca3 = new Tasca("Edu", "prova3", "Media")
llista.agregarTarea(tasca3)

renderTareas()

/*
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
    */
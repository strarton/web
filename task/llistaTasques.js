class llistaTasques {
    #tareas

    constructor() {
        this.#tareas = []
    }

    agregarTarea(tarea) {
        this.#tareas.push(tarea)
    }

    eliminarTareas(index) {
        this.#tareas = this.#tareas.filter((_, i) => i !== index)
    }

    obtenerTareas() {
        return this.#tareas
    }

    filtraTareas(usuario, ordenPrioridad) {
        let tareas = this.obtenerTareas()

        if (usuario) {
            tareas = tareas.filter(tarea => tarea.getusuario().includes(usuario))
        }

        if (ordenPrioridad === "prioridad") {
            tareas.sort((a, b) => {
                const prioridadOrden = { "Muy Alta": 1, "Alta": 2, "Media": 3, "Baja": 4 }
                return prioridadOrden[a.getprioridad()] - prioridadOrden[b.getprioridad()]
            });
        } else if (ordenPrioridad === "fecha") {
            tareas.sort((a, b) => b.getfecha() - a.getfecha())
        }

        return tareas;
    }
}

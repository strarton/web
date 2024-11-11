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
}

class Tasca {
    #fecha
    #usuario
    #contenido
    #prioridad

    constructor(usuario, contenido = "Sin contenido", prioridad = "Media") {
        this.#fecha = new Date()
        this.#usuario = usuario
        this.#contenido = contenido
        this.#prioridad = prioridad
    }

    setContenido(contenido) {
        this.#contenido = contenido
    }
    
    getTasca() {
        return {
            fecha: this.#fecha,
            usuario: this.#usuario,
            prioridad: this.#prioridad,
            contenido: this.#contenido
        };
    }

    getfecha() {
        return this.#fecha
    }

    getusuario() {
        return this.#usuario
    }

    getcontenido() {
        return this.#contenido
    }

    getprioridad() {
        return this.#prioridad
    }
}

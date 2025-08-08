export function crearPostIt({ estado, titulo = '', descripcion = '', enlace = '' }) {
    const postIt = document.createElement('div');
    postIt.className = 'postit';
  
    if (estado === 'hecho') {
      const titleEl = document.createElement('h3');
      titleEl.textContent = titulo;
      const descEl = document.createElement('p');
      descEl.textContent = descripcion;
      const linkEl = document.createElement('a');
      linkEl.href = enlace;
      linkEl.textContent = 'Ver más';
      linkEl.target = '_blank';
      postIt.append(titleEl, descEl, linkEl);
    } else if (estado === 'en proceso') {
      const titleEl = document.createElement('h3');
      titleEl.textContent = titulo;
      const descEl = document.createElement('p');
      descEl.textContent = descripcion;
      postIt.append(titleEl, descEl);
    } else if (estado === 'nulo') {
      
      return; // Salir para no añadir vacío
    }
  
    const contenedor = document.getElementById('postit');
    if (contenedor) {
      contenedor.appendChild(postIt);
      console.log('PostIt añadido:', postIt);
    } else {
    }
  }
  

// Animación de texto

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["Eduardo Giurca", "Software Developer", "resolutivo y empático", "UX/UI Lover", "proactivo y adaptable"];
const typingDelay = 50;
const erasingDelay = 25;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, 1000);
});

// Blur y linterna
const blur = document.querySelector('.blur-effect');
let isLightMode = false;

// Detectar si es móvil por ancho de pantalla
let isMobile = window.innerWidth <= 768;

let mouseFollowEnabled = !isMobile && !isLightMode;

// Leer preferencia guardada
const modoGuardado = localStorage.getItem("modoClaro");
isLightMode = modoGuardado === "true";

// Aplicar modo claro u oscuro
function aplicarModo(modoClaro) {
    const h1 = document.querySelector("h1");
    const lightIcon = document.querySelector("#light svg");
    const buildings = document.querySelectorAll(".building");
  
    isLightMode = modoClaro;
    localStorage.setItem("modoClaro", isLightMode);
  
    // Limpia clases anteriores
    document.body.classList.remove("modo-claro", "modo-oscuro");
  
    if (isLightMode) {
      document.body.classList.add("modo-claro");
      mouseFollowEnabled = false;
      blur.style.transition = 'transform 1.5s ease-in-out, opacity 0.5s ease-in';
      blur.style.transform = 'translate(-50%, -50%) scale(50)';
      blur.style.opacity = '1';
      blur.style.background = 'rgba(255, 255, 255, 0)';
  
      document.body.style.backgroundColor = '#f0f0f0';
      document.body.style.color = '#2c2c2c';
      if (h1) h1.style.color = '#2c2c2c';
      if (lightIcon) lightIcon.style.color = 'rgba(255, 255, 255, 1)';
  
      buildings.forEach(b => b.style.color = '#f000f'); // color blanco en modo claro
  
    } else {
      document.body.classList.add("modo-oscuro");
      mouseFollowEnabled = !isMobile;
      blur.style.transition = 'transform 0.6s ease-out, opacity 0.3s ease-out';
      blur.style.transform = 'translate(-50%, -50%) scale(1)';
      blur.style.opacity = mouseFollowEnabled ? '0' : '0';
      blur.style.background = 'rgba(255, 255, 255, 0.5)';
  
      document.body.style.backgroundColor = '#2c2c2c';
      document.body.style.color = '#ffffff';
      if (h1) h1.style.color = '#ffffff';
      if (lightIcon) lightIcon.style.color = '#ffffff';
  
      buildings.forEach(b => b.style.color = '#f000f'); // o cualquier color deseado en modo oscuro
    }
  }
  

// Aplicar modo al cargar
aplicarModo(isLightMode);

// Ajustar mouseFollowEnabled si se cambia tamaño ventana
window.addEventListener('resize', () => {
  const wasMobile = isMobile;
  isMobile = window.innerWidth <= 768;
  if (isMobile !== wasMobile) {
    mouseFollowEnabled = !isMobile && !isLightMode;
    if (!mouseFollowEnabled) {
      blur.style.opacity = '0'; // esconder blur en móvil
    }
  }
});

// Movimiento del blur solo si está activado
document.addEventListener('mousemove', (e) => {
  if (!mouseFollowEnabled) return;
  blur.style.left = `${e.clientX}px`;
  blur.style.top = `${e.clientY}px`;

  if (blur.style.opacity !== '1') {
    blur.style.opacity = '1';
  }
});

document.addEventListener('mouseleave', () => {
  if (mouseFollowEnabled) {
    blur.style.opacity = '0';
  }
});

// Alternar modo al hacer clic en SVG
document.addEventListener("DOMContentLoaded", function () {
  const lightIcon = document.querySelector("#light svg");

  if (lightIcon) {
    lightIcon.addEventListener("click", () => {
      aplicarModo(!isLightMode);
    });
  }
});




  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".circle-container");
    const texts = ['Figma', 'CSS', 'Python', 'SEO', 'JavaScript', 'SQL', 'Deployment', 'React', 'HTML', 'GIT', 'Frontend', 'Backend'];
    const colors = ['#007bff', '#E97B27', '#888888'];
  
    const centerX = 140;
    const centerY = 140;
    const radiusMin = 160;
    const radiusMax = 320;
    const smallSize = 90;
    const padding = 10;
  
    const placed = [];
  
    function collides(x, y) {
      return placed.some(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < (smallSize + padding);
      });
    }
  
    function isInViewport(x, y) {
      const screenX = x + (window.innerWidth / 2 - centerX);
      const screenY = y + (window.innerHeight / 2 - centerY);
  
      return (
        screenX - smallSize / 2 > 0 &&
        screenX + smallSize / 2 < window.innerWidth &&
        screenY - smallSize / 2 > 0 &&
        screenY + smallSize / 2 < window.innerHeight
      );
    }
  
    for (let i = 0; i < texts.length; i++) {
      let tries = 0;
      let x, y;
  
      do {
        const angle = Math.random() * Math.PI * 2;
        const r = radiusMin + Math.random() * (radiusMax - radiusMin);
        x = centerX + Math.cos(angle) * r;
        y = centerY + Math.sin(angle) * r;
        tries++;
      } while ((collides(x, y) || !isInViewport(x, y)) && tries < 200);
  
      if (tries >= 200) continue;
  
      placed.push({ x, y });
  
      const circle = document.createElement('div');
      circle.classList.add('animated-circle');
      circle.style.backgroundColor = colors[i % colors.length];
      circle.textContent = texts[i];
  
      circle.style.setProperty('--x', `${x - centerX}px`);
      circle.style.setProperty('--y', `${y - centerY}px`);
  
      container.appendChild(circle);
    }
  });
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const contentMap = {
        1: {
            title: "Sistemas Microinformáticos y Redes",
            text: "He estudiado la FP Media de SMR en el IES Vall d'Alba. Dos años donde aprendí muchísimo acerca de ordenadores, tanto hardware como un poco de software (Python y Bash)"
          },
          2: {
            title: "Hospital Provincial",
            text: "Trabajé durante un año como técnico informático solucionando las diferentes incidencias que iban surgiendo. Actualicé sistemas operativos y tuve el control de las diferentes redes del centro."
          },
          3: {
            title: "Desarrollo de Aplicaciones Web",
            text: "Estudié la FP Superior de DAW en el IES Vall d'Alba, donde aprendí Java durante todo un año, PHP (y Laravel), React, SQL y muchos más. Proyectos que realizamos, individualmente, con todo el diseño, backend y frontend."
          },
          4: {
            title: "Novologic",
            text: "Trabajé durante 3 meses como software developer, aumentando en un 60% la eficiencia de trabajo de la empresa con varios scripts en Python. Aprendí muchísimo de SEO y WordPress. Trabajé en las páginas de <b>Que Ver por el Mundo y Azulrec</b>"
          },
          5: {
            title: "EBEP Express",
            text: "Empresa donde ejercí de diseñador y desarrollador frontend en remoto. Trabajé junto a un equipo de 3 personas para todo el proyecto, desde el planteamiento hasta el despliegue de la aplicación web <b>Eadbae</b>. Usamos Figma para el prototipo, React para el frontend, JWT y PHP para el backend. "
          },
          6: {
            title: "Freelance",
            text: `Actualmente hago proyectos por cuenta propia a empresas o personas que lo necesitan. Puedes consultar mis proyectos <a href="terminal.html" target="_blank" rel="noopener noreferrer">aquí</a>.`
          }
          
    
    };
  
    const svgs = document.querySelectorAll(".building");
    const contentContainer = document.getElementById("dynamic-content");
  
    svgs.forEach(svg => {
      svg.addEventListener("click", () => {
        const id = svg.getAttribute("data-id");
        const content = contentMap[id];
  
        if (content) {
          contentContainer.innerHTML = `
            <h3>${content.title}</h3>
            <p>${content.text}</p>
          `;
        }
      });
    });
  });
  



  document.addEventListener('mousemove', (e) => {
    const icon = document.getElementById('infomedio');
    const rect = icon.getBoundingClientRect();
  
    const iconX = rect.left + rect.width / 2;
    const iconY = rect.top + rect.height / 2;
  
    const dx = e.clientX - iconX;
    const dy = e.clientY - iconY;
  
    // Normalizamos los valores para limitar la inclinación (entre -15 y 15 grados)
    const maxAngle = 15;
    const maxDistance = 150; // distancia para máxima inclinación
  
    const normX = Math.min(Math.max(dx / maxDistance, -1), 1);
    const normY = Math.min(Math.max(dy / maxDistance, -1), 1);
  
    const rotateY = normX * maxAngle * -1; // inclinación horizontal (eje Y)
    const rotateX = normY * maxAngle;      // inclinación vertical (eje X)
  
    icon.style.transform = `translate(-50%, -50%) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Sombra en el lado opuesto, usando box-shadow desplazado y desenfocado
    // La sombra se mueve en dirección contraria al mouse
    const shadowOffsetX = normX * -20;  // más grande que inclinación para que se note
    const shadowOffsetY = normY * -20;
  
    icon.style.boxShadow = `${shadowOffsetX}px ${shadowOffsetY}px 25px rgba(0,0,0,0.3)`;
  });
  
  try {
    document.getElementById('otw').addEventListener('click', function() {
      window.location.href = '/info.html';
    });
  } catch (error) {
    console.warn('Elemento con id "otw" no encontrado, no se pudo añadir el event listener.');
  }
  


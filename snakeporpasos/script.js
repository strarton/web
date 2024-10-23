function acceptCookies() {
    // Establecer una cookie para registrar la aceptación
    document.cookie = "cookies_accepted=true; max-age=" + 60 * 60 * 24 * 100 + "; path=/";
    document.getElementById('cookie-banner').style.display = 'none';
}

function checkCookieConsent() {
    if (!document.cookie.split('; ').find(row => row.startsWith('cookies_accepted'))) {
        document.getElementById('cookie-banner').style.display = 'block'; // Mostrar el banner
    }
}


let serp = [[5, 5], [5, 6], [5, 7]]
let tiempoSegundos = 0
let juega = false
let milisegundos = 400
let direccion = "left"
const ancho = 11
const alto = 11
let puntos = 0
let crearPunto = true
let historialdePuntos = getCookie("puntos")

function up() {
    if (direccion != "down"){ // En estos ifs no dejo al jugador, si la serp esta yendo para abajao, cambiar de dirección directamente arriba
        direccion = "up";
    }
}

function down() {
    if (direccion != "up"){ // Aquí lo mismo pero alrevés
        direccion = "down";
    }
}

function right() {
    if (direccion != "left"){ //Aquí con de izq a derecha
        direccion = "right";
    }
}

function left() {
    if (direccion != "right"){ //Y Aquí lo mismo pero alrevés
        direccion = "left";
    }
}

function masRapido(mili) { //Control de repideza del snake
    if(mili!=50){
        mili -=10}
    return mili
}

function play(){ //bototn play
        location.reload()

}
function pause(){ //boton pause
    if(juega){
    juega=false
}else{
    juega=true
}
}

function crearMatriz(x, y) { //Crear matriz con los x i y que quieras
    let tabla = [];
    for (let i = 0; i < y; i++) {
        let fila = [];
        for (let j = 0; j < x; j++) {
            fila.push(0);  
        }
        tabla.push(fila);
    }
    return tabla;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1
}


function mostrarTabla(matrizTabla){ //Logica para mostrar la tabla
    let tabla = "<table border='1'>"

/*

        ARREGLAR CREACION DEL PUNTO

*/


if (crearPunto == true) { // Creación del punto 
    let x, y, puntoAlea;
    do {
        x = getRandomInt(ancho - 1) - 1; 
        y = getRandomInt(alto - 1) - 1;
        puntoAlea = matrizTabla[x][y];
    } while (puntoAlea === 1); // Sigue buscando hasta que no sea una celda ocupada por la serpiente

    matrizTabla[x][y] = 2; //Crea punto
    crearPunto = false; 
}

    for (let filas of matrizTabla) {
        tabla += "<tr>";
        for (let celda of filas) {
            
            if(celda == 1){ //Mostracion de la serp
                tabla += `<td class="serp">${celda}</td>`
            }else {if(celda == 2) { //Mostracion del punto
                tabla += `<td class="punto">${celda}</td>`
            } else { //otros
                tabla += `<td>${celda}</td>`
            }}
        }
        tabla += "</tr>";
    }
  
    tabla += "</table>";
    document.getElementById("tabla").innerHTML = tabla;
}

function mostrarSerp(serp){ //Metemos la serp dentro de la matriz o tabla
    for (let posicion of serp) {
        let posXserp = posicion[0]
        let posYserp = posicion[1]
        if(matrizTabla[posXserp][posYserp] == 2){ //Si ha comido un punto vuelve a generar otro
            crearPunto = true
            if(tiempoSegundos>=10){
                puntos += 1
            }else if(tiempoSegundos>=5){
                puntos += 5
            }else if(tiempoSegundos>= 2){
                puntos += 10
            }

            document.getElementById("actuales").innerHTML = "<p>ACTUALES: " + puntos + "</p>";
            tiempoSegundos=0    
            serp.push([posXserp, posYserp]) //Crece la serp
            milisegundos = masRapido(milisegundos)
            clearInterval(intervalo);
            iniciarMovimiento();
        }
        matrizTabla[posXserp][posYserp] = 1  
    }
}

function moverSerp(direccion) { //Aquí estan todas las logicas de como se mueve y no se mueves la serp
    let cabeza = serp[0];
    let nuevaCabeza;

    switch(direccion) {
        case "left":
            nuevaCabeza = [cabeza[0], cabeza[1] - 1];
            break;
        case "right":
            nuevaCabeza = [cabeza[0], cabeza[1] + 1];
            break;
        case "up":
            nuevaCabeza = [cabeza[0] - 1, cabeza[1]];
            break;
        case "down":
            nuevaCabeza = [cabeza[0] + 1, cabeza[1]];
            break;
    }

    // Verificar si la nueva cabeza toca una pared
    let posX = nuevaCabeza[0];
    let posY = nuevaCabeza[1];

    

    if (posX < 0 || posX >= alto || posY < 0 || posY >= ancho) {
        gameOver();
        return;  // Termina la función si hay colisión
    }

    // Verificar si la serpiente choca consigo misma
    for (let segmento of serp) {
        if (nuevaCabeza[0] === segmento[0] && nuevaCabeza[1] === segmento[1]) {
            gameOver();
            return;
        }
    }

    // Mover la serpiente
    serp.unshift(nuevaCabeza); 
    let ultimaPosicion = serp.pop(); 
    matrizTabla[ultimaPosicion[0]][ultimaPosicion[1]] = 0;

    mostrarSerp(serp);
    mostrarTabla(matrizTabla);
}

document.addEventListener('keydown', function(event) { //Control de las flechas del teclado
    switch (event.key) {
        case 'ArrowUp':
            up()
            break;
        case 'ArrowDown':
            down()
            break;
        case 'ArrowRight':
            right()
            break;
        case 'ArrowLeft':
            left()
            break;
    }
});

function modo() {
    if (getCookie("modo") == "true") {
        document.body.id = ""; 
        setCookie("modo", "false", 100)
        
    } else {
        document.body.id = "gris";
        setCookie("modo", "true", 100)
    }
}

function splitPuntos(coockieRAW){
    let arrayPuntos = coockieRAW.split("|")
    
    return arrayPuntos
}

function añadirAlhistorialPuntos(mispuntos){
    historialdePuntos = mispuntos +"|"+ historialdePuntos
    setCookie("puntos", historialdePuntos, 100)
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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

  function maxPuntos(arrayPuntos){
    arrayPuntos.forEach(element => {
        
    });
  }

function gameOver() { // Función para acabar el juego (INCOMPLETA)
    clearInterval(intervalo); 
    document.getElementById("gameover").style.display = "block";
    añadirAlhistorialPuntos(puntos)
    splitPuntos(getCookie("puntos"))
    //alert(splitPuntos(getCookie("puntos")))
}

let intervalo;  //EL INICIO DE TODO
function iniciarMovimiento() {
    let arrayPuntos = splitPuntos(getCookie("puntos"))

    document.getElementById("max").innerHTML = "<p>MAX " + Math.max(...arrayPuntos)+"<p>"
    document.getElementById("last").innerHTML = "<p>LAST " +arrayPuntos[0]+"<p>"

    let historial = document.getElementById("historial");
let contenido = "<h1>Historial</h1><ol>";

arrayPuntos.forEach(function(elemento) {
    contenido += "<li>" + elemento + "</li>";
});

contenido += "</ol>";
historial.innerHTML = contenido;

    
    //setCookie("puntos","",100)
    if (getCookie("modo") == "false") {
        document.body.id = ""; 
               
    } else {
        document.body.id = "gris";
    }

    intervalo = setInterval(() => {
        if(juega){
            moverSerp(direccion);
            tiempoSegundos+=1
            document.getElementById("stop").style.display = "none";
        } else {
            document.getElementById("stop").style.display = "block";
        }
         
    }, milisegundos); 
}

//CREACIÓN DEL TABLERO Y MOSTRARLO

const matrizTabla = crearMatriz(ancho, alto);
console.log(matrizTabla);

mostrarTabla(matrizTabla);

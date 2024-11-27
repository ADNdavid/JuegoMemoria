//Variables globales
const d = document;
//imágenes de juego nivel 1
let imagenesNivel1 = [
  { nombre: "homero", url: "./images/homero.jpg" },
  { nombre: "lisa", url: "./images/lisa.jpg" },
  { nombre: "abuelo", url: "./images/abuelo.jpg" },
  { nombre: "bart", url: "./images/bart.jpg" },
  { nombre: "maggie", url: "./images/maggie.jpg" },
  { nombre: "marge", url: "./images/marge.jpg" },

  //duplicadas
  { nombre: "homero", url: "./images/homero.jpg" },
  { nombre: "lisa", url: "./images/lisa.jpg" },
  { nombre: "abuelo", url: "./images/abuelo.jpg" },
  { nombre: "bart", url: "./images/bart.jpg" },
  { nombre: "maggie", url: "./images/maggie.jpg" },
  { nombre: "marge", url: "./images/marge.jpg" },
];

//imágenes de juego nivel 2
let imagenesNivel2 = [
  { nombre: "homero", url: "./images/homero.jpg" },
  { nombre: "lisa", url: "./images/lisa.jpg" },
  { nombre: "abuelo", url: "./images/abuelo.jpg" },
  { nombre: "bart", url: "./images/bart.jpg" },
  { nombre: "maggie", url: "./images/maggie.jpg" },
  { nombre: "marge", url: "./images/marge.jpg" },
  { nombre: "carro", url: "./images/carro.jpg" },
  { nombre: "perro", url: "./images/perro.jpg" },

  //duplicadas
  { nombre: "homero", url: "./images/homero.jpg" },
  { nombre: "lisa", url: "./images/lisa.jpg" },
  { nombre: "abuelo", url: "./images/abuelo.jpg" },
  { nombre: "bart", url: "./images/bart.jpg" },
  { nombre: "maggie", url: "./images/maggie.jpg" },
  { nombre: "marge", url: "./images/marge.jpg" },
  { nombre: "carro", url: "./images/carro.jpg" },
  { nombre: "perro", url: "./images/perro.jpg" },
];

//imágenes de juego nivel 3
let imagenesNivel3 = [
  { nombre: "homero", url: "./images/homero.jpg" },
  { nombre: "lisa", url: "./images/lisa.jpg" },
  { nombre: "abuelo", url: "./images/abuelo.jpg" },
  { nombre: "bart", url: "./images/bart.jpg" },
  { nombre: "maggie", url: "./images/maggie.jpg" },
  { nombre: "marge", url: "./images/marge.jpg" },
  { nombre: "carro", url: "./images/carro.jpg" },
  { nombre: "perro", url: "./images/perro.jpg" },
  { nombre: "gato", url: "./images/gato.jpg" },
  { nombre: "abuela", url: "./images/abuela.jpg" },

  //duplicadas
  { nombre: "homero", url: "./images/homero.jpg" },
  { nombre: "lisa", url: "./images/lisa.jpg" },
  { nombre: "abuelo", url: "./images/abuelo.jpg" },
  { nombre: "bart", url: "./images/bart.jpg" },
  { nombre: "maggie", url: "./images/maggie.jpg" },
  { nombre: "marge", url: "./images/marge.jpg" },
  { nombre: "carro", url: "./images/carro.jpg" },
  { nombre: "perro", url: "./images/perro.jpg" },
  { nombre: "gato", url: "./images/gato.jpg" },
  { nombre: "abuela", url: "./images/abuela.jpg" },
];

//seleccionar el tablero del html
let tablero = d.querySelector(".tablero");

let nombreImg = []; //guardar los nombres de las imagenes
let idImg = []; //guardar las posiciones de las imagenes
let aciertos = 0; //guardar los aciertos
let totalAciertos = 0; //guardar los aciertos totales
let totalTiempo = 0; //guardar el tiempo total
let tiempoSobrante = 0; //guardar el tiempo sobrante
let totalIntentos = 0; //guardar los intentos totales
let intentos = 0; //guardar los intentos
let tiempo = 60; //guardar el tiempo
let tiempoTranscurrido; //guardar el tiempo transcurrido
let nivel = 1; //guardar el nivel
let imagenesNivel;

let mostrarIntentos = d.querySelector(".intentos"); //mostrar los intentos
let mostrarAciertos = d.querySelector(".aciertos"); //mostrar los aciertos
let mostrarTiempo = d.querySelector(".tiempo"); //mostrar el tiempo
let btnIniciar = d.querySelector(".btn-iniciar"); //boton para iniciar el juego
let mostrarNivel = d.querySelector(".nivel"); //mostrar el nivel
let estoyJugando = false; //variable para saber si estoy jugando

let sonidoSeleccion = new Audio("./sounds/seleccion.mp3"); //sonido de selección
let sonidoAcierto = new Audio("./sounds/acierto.mp3"); //sonido de acierto
let sonidoFalla = new Audio("./sounds/falla.mp3"); //sonido de error
let sonidoIntro = new Audio("./sounds/intro.mp3"); //sonido de intro
let sonidoJuegoPerdido = new Audio("./sounds/juegoPerdido.mp3"); //sonido de juego perdido
let sonidoPasoNivel = new Audio("./sounds/pasoNivel.mp3"); //sonido de pasar nivel
let tiempoAgotandose = new Audio("./sounds/tiempoAgotandose.mp3"); //sonido de tiempo agotándose

let mostrarJugador = d.querySelector(".jugador"); //mostrar el nombre del jugador
let tabla = d.querySelector(".records tbody"); //mostrar la tabla de los jugadores

let fondoBody = d.querySelector("body"); //seleccionar el body del html


// setTimeout//Se ejecuta una sola vez pasado un tiempo.
// setInterval//Se ejecuta varias veces pasado un tiempo.
d.addEventListener("DOMContentLoaded", () => {
  fondoBody.classList.add("fondo1");
  //mostrar los datos
  mostrarDatos();
});

//evento click para iniciar el juego
btnIniciar.addEventListener("click", function () {
  sonidoIntro.play();
  sonidoIntro.volume = 0.2;
  // miAlerta("Iniciando el juego", "success");
  //comprobar si el juego esta en curso.
  if (estoyJugando == false && nivel == 1) {
    ventanaModal();
  } else if (estoyJugando == false && nivel == 2) {
    estoyJugando = true;
    nivel2();
  } else if (estoyJugando == false && nivel == 3) {
    estoyJugando = true;
    nivel3();
  }
});

//función para agregar las imagenes al tablero
function agregarImagenes() {
  if (nivel == 1) {
    imagenesNivel = imagenesNivel1;
  } else if (nivel == 2) {
    imagenesNivel = imagenesNivel2;
  } else if (nivel == 3) {
    imagenesNivel = imagenesNivel3;
  }
  //mezclar las imagenes
  imagenesNivel.sort(() => Math.random() - 0.5);

  //recorrer con un foreach las imagenes del array
  imagenesNivel.forEach((img, i) => {
    let div = d.createElement("div"); //crear div
    div.className = "col-3 my-2"; // agregar clase al div
    let imagen = d.createElement("img"); //crear imagen
    imagen.src = "./images/ocultar.jpg"; //agregar la ubicación de la imagen
    imagen.className = "img-fluid altura"; //agregar clases a las imágenes
    imagen.id = i; //agregar id a las imágenes
    imagen.addEventListener("click", mostrarImagenes); //agregar evento click a las imágenes
    div.appendChild(imagen); //agregar la imagen al div
    tablero.appendChild(div); //agregar el div al tablero
  });
}

//función para mostrar las imagenes ocultas
function mostrarImagenes() {
  sonidoSeleccion.play();

  let imgID = this.getAttribute("id");
  //  miAlerta("imagen #" + imgID, "info");
  this.src = imagenesNivel[imgID].url;
  //guardar los nombres de las imágenes
  nombreImg.push(imagenesNivel[imgID].nombre);
  //guardar los id de las imagenes
  idImg.push(imgID);
  //activar la función de comparar imagenes
  if (nombreImg.length == 2) {
    //simular o esperar un tiempo antes de comparar las imagenes
    setTimeout(compararImagenes, 100);
  }
}

//función para comparar las imagenes
function compararImagenes() {
  let allimg = d.querySelectorAll(".tablero .col-3 img"); //seleccionar todas las imagenes
  //verificar si las imagenes son iguales
  if (nombreImg[0] == nombreImg[1]) {
    if (idImg[0] != idImg[1]) {
      // miAlerta("Felicidades adivinaste las imagenes", "success");
      sonidoAcierto.play();
      allimg[idImg[0]].src = "./images/ok.jpg";
      allimg[idImg[1]].src = "./images/ok.jpg";
      //bloquear las imagens para que no se vuelvan a seleccionar
      allimg[idImg[0]].removeEventListener("click", mostrarImagenes);
      allimg[idImg[1]].removeEventListener("click", mostrarImagenes);
      aciertos++;
      mostrarAciertos.textContent = aciertos;
    } else {
      miAlerta("No puedes seleccionar la misma imagen", "info");
      allimg[idImg[0]].src = "./images/ocultar.jpg";
    }

    //miAlerta("Son iguales", "success");
    //     allimg[idImg[0]].src = "./images/ok.jpg";
    //    allimg[idImg[1]].src = "./images/ok.jpg";
  } else {
    // miAlerta("No son iguales, sigue intentando", "error");
    sonidoFalla.play();
    allimg[idImg[0]].src = "./images/ocultar.jpg";
    allimg[idImg[1]].src = "./images/ocultar.jpg";
    intentos++;
    mostrarIntentos.textContent = intentos;
  }
  //vaciar los arrays: reiniciar las variables
  nombreImg = [];
  idImg = [];

  //verificar si todas las imagenes están destapadas
  if (nivel == 1 && aciertos == 6) {
    miAlerta("Felicidades has ganado, pasaste al siguiente nivel.🥳👍", "success");
    fondoBody.classList.replace("fondo1", "fondo2");

    // location.reload();//quitar luego.. recarga la pagina.
    totalIntentos += intentos;
    totalTiempo += tiempo;
    tiempoSobrante += 60 - tiempo;
    obtenerDatos();
    sonidoPasoNivel.play();
    nivel++;
    mostrarNivel.textContent = nivel;
    intentos = 0;
    mostrarIntentos.textContent = intentos;
    aciertos = 0;
    mostrarAciertos.textContent = aciertos;
    clearInterval(tiempoTranscurrido);
    tiempo = 50;
    mostrarTiempo.textContent = tiempo;
    estoyJugando = false;
    quitarImg();
  } else if (nivel == 2 && aciertos == 8) {
    miAlerta("Felicidades has ganado, pasaste al siguiente nivel.🥳👍", "success");
    fondoBody.classList.replace("fondo2", "fondo3");
    sonidoPasoNivel.play();
    nivel++;
    mostrarNivel.textContent = nivel;
    intentos = 0;
    mostrarIntentos.textContent = intentos;
    aciertos = 0;
    mostrarAciertos.textContent = aciertos;
    clearInterval(tiempoTranscurrido);
    tiempo = 45;
    mostrarTiempo.textContent = tiempo;
    estoyJugando = false;
    quitarImg();
  } else if (nivel == 3 && aciertos == 10) {
    miAlerta("Felicidades has ganado el juego.🥳👍", "success");
    sonidoPasoNivel.play();
    location.reload();
  }
}

function nivel1() {
  //llamar a la función para agregar las imagenes
  agregarImagenes();
  mostrarNivel.textContent = nivel;
  tiempoDeJuego();
}
function nivel2() {
  //llamar a la función para agregar las imagenes
  agregarImagenes();
  tiempoDeJuego();
}
function nivel3() {
  //llamar a la función para agregar las imagenes
  agregarImagenes();
  tiempoDeJuego();
}

//función para controlar el tiempo del juego
function tiempoDeJuego() {
  //controlar el tiempo del juego.
  tiempoTranscurrido = setInterval(() => {
    tiempo--;
    mostrarTiempo.textContent = tiempo;
    if (tiempo == 15) {
      miAlerta("Quedan 15 segundos para terminar el juego.⏳","warning");
      sonidoIntro.pause();
      tiempoAgotandose.play();
      tiempoAgotandose.volume = 0.1;
      //sonido de urgencia
      mostrarTiempo.classList.add("tiempoAgotado");
    } else if (tiempo == 0) {
      miAlerta("Se acabo el tiempo, perdiste.😢","error");
      tiempoAgotandose.pause();
      sonidoJuegoPerdido.play();
      sonidoJuegoPerdido.volume = 0.4;
      clearInterval(tiempoTranscurrido);
      setTimeout(() => {
        location.reload(); //quitar luego.
      }, 3000);
    }
  }, 1000);
}

function quitarImg() {
  let imagenQuitar = d.querySelectorAll(".tablero div");
  imagenQuitar.forEach((img) => {
    img.remove();
  });
}

//mostrar ventana modal
function ventanaModal() {
  let mostrarModal = d.querySelector("#exampleModal");
  let cerrarModal = d.querySelectorAll(".cerrar");
  let inputJugador = d.querySelector(".nombre-jugador");
  let btnJugador = d.querySelector(".registrar-jugador");

  //evento click para cerrar el modal
  cerrarModal.forEach((btn) => {
    btn.addEventListener("click", () => {
      mostrarModal.classList.remove("show");
      mostrarModal.style.display = "none";      
      console.log("Se cierra ventana modal");
    });
  });

  //mostrar la ventana modal
  mostrarModal.classList.add("show");
  mostrarModal.style.display = "block";

  //evento click para registrar el nombre del jugador
  btnJugador.addEventListener("click", () => {
    //mostrar el nombre del jugador
    mostrarJugador.textContent = inputJugador.value;
    //cerrar el modal
    mostrarModal.classList.remove("show");
    mostrarModal.style.display = "none";
    //iniciar nivel 1
    estoyJugando = true;
    nivel1();
    console.log("Se ejecuta juego nivel 1 por Botón");
  });

  //evento click para registrar el nombre del jugador al momento de presionar Enter
  inputJugador.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //mostrar el nombre del jugador
      mostrarJugador.textContent = inputJugador.value;
      //cerrar el modal
      mostrarModal.classList.remove("show");
      mostrarModal.style.display = "none";
      //iniciar nivel 1
      estoyJugando = true;
      nivel1();
      console.log("Se ejecuta juego nivel 1 por presionar Enter");
    }
  });
}

function miAlerta(mensaje, icono) {
  Swal.fire({
    position: "top-end",
    icon: String(icono),
    title: String(mensaje),
    showConfirmButton: false,
    timer: icono == "success" ? 3500 : 2100,
    toast: true,
  });
}

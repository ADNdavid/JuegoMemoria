//variables globales
let nombreJugador = d.querySelector(".jugador");
let listaJugadores = "jugadores"; // asi se guarda en el local storage

//función para obtener los datos
function obtenerDatos() {
  //crear objetos para los datos del jugador
  let datosJugador = {
    nombre: nombreJugador.textContent,
    intentos: totalIntentos,
    tiempoTotal: totalTiempo,
    tiempoSobrante: tiempoSobrante,
  };
  //mostrar en consola
  console.log(datosJugador);
  //pasar los datos del jugador
  guardarDatos(datosJugador);
}

//función para guardar los datos en local storage
function guardarDatos(datos) {
  //crear array para los datos antiguos y nuevos
  let jugadores = [];
  //tomar los datos en el local storage previamente guardados
  let datosPrevios = JSON.parse(localStorage.getItem(listaJugadores));
  if (datosPrevios != null) {
    jugadores = datosPrevios;
  }
  //guardar el nuevo jugador en el array
  jugadores.push(datos);
  //guardar los datos en el local storage
  localStorage.setItem(listaJugadores, JSON.stringify(jugadores));
}

function mostrarDatos() {
  let jugadores = [];
  //tomar los datos en el local storage previamente guardados
  let datosPrevios = JSON.parse(localStorage.getItem(listaJugadores));
  if (datosPrevios != null) {
    jugadores = datosPrevios;
  }
  //organizar los jugadores
  jugadores.sort((a, b) => {
    if (a.tiempoTotal < b.tiempoTotal) {
      return -1;
    }
    if (a.intentos < b.intentos) {
      return 1;
    }
  });

  //mostrar los datos en la tabla
  jugadores.forEach((jugador, i) => {
    //crear fila
    let fila = d.createElement("tr");
    fila.innerHTML = `
        <td>${i + 1}</td>
        <td>${jugador.nombre}</td>
        <td>${jugador.tiempoTotal}</td>
        <td>${jugador.intentos}</td>
        <td>${jugador.tiempoSobrante}</td>
        `;
    tabla.appendChild(fila);
  });
}

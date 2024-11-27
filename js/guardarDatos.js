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

  let jugadoresPrevios = JSON.parse(localStorage.getItem(listaJugadores)) || [];

  //let jugadoresActualizados = jugadoresPrevios.filter((jugador)=> { jugador.nombre != nombreJugador.textContent}); 

  //console.log(jugadoresActualizados);
  //localStorage.setItem(listaJugadores, JSON.stringify(jugadoresActualizados));
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
    if (a.tiempoSobrante > b.tiempoSobrante) {
      return -1;
    }
  });

  //Limpia el contenido de la tabla
  tabla.innerHTML="";

  //mostrar los datos en la tabla
  jugadores.forEach((jugador, i) => {
    //crear fila
    let fila = d.createElement("tr");
    fila.innerHTML = `
        <td>${i + 1}</td>
        <td class="text-center">${jugador.nombre}</td>
        <td class="text-center">${jugador.tiempoTotal}</td>
        <td class="text-center">${jugador.intentos}</td>
        <td class="text-center">${jugador.tiempoSobrante}</td>
        `;
    tabla.appendChild(fila);
  });
}

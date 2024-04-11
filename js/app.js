//Creamos un array con las diferentes ciudades que queremos buscar su clima
let ciudades = ["Buenos Aires", "Tucuman", "Rosario", "Cordoba", "La Plata"];
//Creamos un bucle for para no repetir el proceso
for (let i = 0; i < ciudades.length; i++) {
  //Declaro una constante que se ira modificando con las ciudades cada vez que el bucle de una vuelta
  const ciudad = ciudades[i];
  //Declaro las diferentes variables que nesecito para que el programa trabaje correctamente
  let idClima = document.getElementById(`tableId${i}Clima`);
  let idGrados = document.getElementById(`tableId${i}Grados`);
  let idIcono = document.getElementById(`tableId${i}Icono`);
  const Key = "18bd862a4c5d30da789b929f7d5ded05";
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${Key}&lang=es`;
  //Consulta a la Api
  fetch(urlAPI)
    .then((res) => res.json())
    .then((json) => {
      //Nuevas Variables
      let tiempo = json.weather[0].description;
      let tiempo1 = tiempo.toUpperCase();
      let grados = json.main.temp;
      let icon = "";
      //Filtro para elegir los iconos
      if (tiempo1 === "CIELO CLARO") {
        icon = "fas fa-sun";
      } else if (
        (tiempo1 === "NUBES DISPERSAS", "NUBES", "MUY NUBOSO", "AlGO DE NUBES")
      ) {
        icon = "fas fa-cloud";
      } else if ((tiempo1 === "LLUVIA", "LLOVIZNA")) {
        icon = "fas fa-cloud-rain";
      } else {
        icon = "";
      }
      //Añadimos el valor en HTML con Js
      idClima.innerHTML = tiempo;
      idGrados.innerHTML = `${grados} °C`;
      idIcono.innerHTML = `<i class="bn-lg ${icon}" style="font-size:20px;color:black"></i>`;
    });
}

function consultaCiudadActual() {
  //Filtro para verificar si el usuario permite acceder a su ubicación
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    console.error("No pasaste tu ubicaón");
  }
  function success(x) {
    //Variables
    let coordenadas = x.coords;
    let eDiv = document.getElementById("eDiv");
    const Key = "18bd862a4c5d30da789b929f7d5ded05";
    let urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${coordenadas.latitude}&lon=${coordenadas.longitude}&units=metric&appid=${Key}&lang=es`;
    //Consulta a la Api
    fetch(urlAPI)
      .then((res) => res.json())
      .then((json) => {
        //Nuevas Variables
        let tiempo = json.weather[0].description;
        let grados = json.main.temp;
        let tiempo1 = tiempo.toUpperCase();
        let icon = "";
        //Filtro para elegir los iconos
        if (tiempo1 === "CIELO CLARO") {
          icon = "fas fa-sun";
        } else if (
          (tiempo1 === "NUBES DISPERSAS",
          "NUBES",
          "MUY NUBOSO",
          "AlGO DE NUBES")
        ) {
          icon = "fas fa-cloud";
        } else if ((tiempo1 === "LLUVIA", "LLOVIZNA")) {
          icon = "fas fa-cloud-rain";
        } else {
          icon = "";
        }
        //Creando la tarjeta en HTML con Js
        eDiv.innerHTML = `<div class="card text-dark bg-warning bg-gradient mb-0 fw-bold" style="width: 100%;height: 140px;font-size:20px">
             <div class="card-header">Clima de tu ciudad</div>
             <div class="card-body">
               <h5 class="card-title">
                    Tiempo ${tiempo}
                    <i class="bn-lg ${icon}" style="font-size:20px;color:black"></i>
               </h5>
               <h5 class="card-title">
                    Grados ${grados} °c                
                    <i class="bn-lg fas fa-temperature-high" style="font-size:20px;color:black"></i>
               </h5>         
             </div>
             </div>`;
      });
  }
}
function consultaPorCiudad() {
  //Variables
  let toast2 = document.getElementById("toast2");
  let ciudad = document.getElementById("ciudad").value;
  const Key = "18bd862a4c5d30da789b929f7d5ded05";
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${Key}&lang=es`;
  //Consulta a la Api
  fetch(urlAPI)
    .then((res) => res.json())
    .then((json) => {
      //Nuevas Variables
      let tiempo = json.weather[0].description;
      let tiempo1 = tiempo.toLowerCase();
      let grados = json.main.temp;
      let icon = "";
      //Filtro para los iconos
      if (tiempo1 === "CIELO CLARO") {
        icon = "fas fa-sun";
      } else if (
        (tiempo1 === "NUBES DISPERSAS", "NUBES", "MUY NUBOSO", "AlGO DE NUBES")
      ) {
        icon = "fas fa-cloud";
      } else if ((tiempo1 === "LLUVIA", "LLOVIZNA")) {
        icon = "fas fa-cloud-rain";
      } else {
        icon = "";
      }
      //Creando Toast con JS y agregando informacion que me devuelve la Api
      toast2.innerHTML = `<div id="alerta" class="toast tostada" role="alert" aria-live="assertive" aria-atomic="true">
             <div class="toast-header bg-warning">
                 <strong class="mx-auto text-dark"><h4>Tiempo de la ciudad ${ciudad}. </h4></strong>
                 <button type="button" class="btn-close btn-dark" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
             <div class="toast-body bg-light">
                 <h5 class="text-warning">
                     <i class="bn-lg ${icon}" style="font-size:20px;color:yellow"></i>
                     Clima : ${tiempo} . 
                  </h5>
                 <br>
                 <h5 class="text-warning">
                     <i class="bn-lg fas fa-temperature-high" style="font-size:20px;color:yellow"></i>
                     Grados : ${grados} °c 
                  </h5>
                </div>
            </div>`;
      //Mostrar Toast con JS
      let myAlerta = document.getElementById("alerta");
      let bsAlerta = new bootstrap.Toast(myAlerta);
      bsAlerta.show();
    });
}
function consultaPorCiudad2() {
  //Variables
  let toast2 = document.getElementById("toast2");
  let ciudad2 = document.getElementById("ciudad2").value;
  const Key = "18bd862a4c5d30da789b929f7d5ded05";
  let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad2}&units=metric&appid=${Key}&lang=es`;
  //Consulta a la Api
  fetch(urlAPI)
    .then((res) => res.json())
    .then((json) => {
      //Nuevas Variables
      let tiempo = json.weather[0].description;
      let tiempo1 = tiempo.toLowerCase();
      let grados = json.main.temp;
      let icon = "";
      //Filtro para los iconos
      if (tiempo1 === "CIELO CLARO") {
        icon = "fas fa-sun";
      } else if (
        (tiempo1 === "NUBES DISPERSAS", "NUBES", "MUY NUBOSO", "AlGO DE NUBES")
      ) {
        icon = "fas fa-cloud";
      } else if ((tiempo1 === "LLUVIA", "LLOVIZNA")) {
        icon = "fas fa-cloud-rain";
      } else {
        icon = "";
      }
      //Creando Toast con JS y agregando informacion que me devuelve la Api
      toast2.innerHTML = `<div id="alerta" class="toast tostada" role="alert" aria-live="assertive" aria-atomic="true">
             <div class="toast-header bg-warning">
                 <strong class="mx-auto text-dark"><h4>Tiempo de la ciudad ${ciudad2}. </h4></strong>
                 <button type="button" class="btn-close btn-dark" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
             <div class="toast-body bg-light">
                 <h5 class="text-warning">
                     <i class="bn-lg ${icon}" style="font-size:20px;color:yellow"></i>
                     Clima : ${tiempo} . 
                  </h5>
                 <br>
                 <h5 class="text-warning">
                     <i class="bn-lg fas fa-temperature-high" style="font-size:20px;color:yellow"></i>
                     Grados : ${grados} °c 
                  </h5>
                </div>
            </div>`;
      //Mostrar Toast con JS
      let myAlerta = document.getElementById("alerta");
      let bsAlerta = new bootstrap.Toast(myAlerta);
      bsAlerta.show();
    });
}

let idMO2 = document.getElementById("mo2");
let idMO3 = document.getElementById("mo3");
let idMO4 = document.getElementById("mo4");
let idMO5 = document.getElementById("mo5");
let idMO6 = document.getElementById("mopicante");
let idMO7 = document.getElementById("mopicante1");
let bOscuro = document.getElementById("flexSwitchCheckDefault");
let iconRedes = document.getElementById("iconRedes");
let iconRedes1 = document.getElementById("iconRedes1");
let iconRedes2 = document.getElementById("iconRedes2");
iconRedes.classList = "lead text-dark";
iconRedes1.classList = "lead text-dark";
iconRedes2.classList = "lead text-dark";

function modoOscuro() {
  if (bOscuro.value === "claro") {
    bOscuro.value = "oscuro";
    idMO2.style = "color: black;";
    idMO3.style = "color: black;";
    idMO4.style = "color: black;";
    idMO5.style.backgroundColor = "white";
    idMO6.style = "color: black;";
    idMO6.style.backgroundColor = "white";
    idMO7.style = "color: black;";
    idMO7.style.backgroundColor = "white";
    iconRedes.classList = "lead text-dark";
    iconRedes1.classList = "lead text-dark";
    iconRedes2.classList = "lead text-dark";
  } else {
    bOscuro.value = "claro";
    idMO2.style = "color: white;";
    idMO3.style = "color: white;";
    idMO4.style = "color: white;";
    idMO5.style.backgroundColor = "black";
    idMO6.style = "color: white;";
    idMO6.style.backgroundColor = "black";
    idMO7.style = "color: white;";
    idMO7.style.backgroundColor = "black";
    iconRedes.classList = "lead text-light";
    iconRedes1.classList = "lead text-light";
    iconRedes2.classList = "lead text-light";
  }
}

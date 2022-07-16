"use strict";
//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

//Constantes y variables
const listSerie = document.querySelector(".js-serie");
console.log(listSerie);
const buttonSearch = document.querySelector(".js-buttonSearch");

const listSerieFav = document.querySelector(".js-lists");
console.log(listSerieFav);

let animeSeriesList = [];
let favouriteSeries = [];

//FUNCTIONS
/* getDataApi:
fetch: pido los datos de la API, "then" espero una respuesta que convierto en json, "then" guardo los datos en un array .animeSeriesList. y los pinto con renderSeries*/

function getDataApi() {
  fetch("https://api.jikan.moe/v4/anime?q=") //al lado del "=" voy a tener que llamar una variable que obtendra el input. de js-inputSeacrh
    .then((response) => response.json())
    .then((data) => {
      animeSeriesList = data.data; //el segundo "data" es un elemento del array
      console.log(animeSeriesList);
      renderSeries();
    });
}

/*renderSeries:
Recorro el array .animeSeriesList. con un "for of" y recojo elementos para añadir en "html", con innerHTML selecciono un lugar en el que pintar "html", escucho en bucle con listenerSeries  */
function renderSeries() {
  let html = "";
  for (const oneResult of animeSeriesList) {
    html += `<li class="js-liSeries" id=${oneResult.mal_id}>`;
    html += `<img
    src=${oneResult.images.jpg.image_url}
    alt=${oneResult.title}
        />`;
    html += `<h2>${oneResult.title}</h2>`;
    html += `</li>`;
    listSerie.innerHTML = html;
    listenerSeries();
  }
}

/*listenerSeries:
Ponemos a todos los <li> la misma clase para seleccionarlos/  querySelectorAll me devuelv un array/ recorremos ese array con un bucle/ añadimos un evento escuchador a cada <li>*/
function listenerSeries() {
  const liSerie = document.querySelectorAll(".js-liSeries");
  for (const li of liSerie) {
    li.addEventListener("click", handleClickFav);
  }
}

/*handleClickFav:
 */
function handleClickFav(ev) {
  console.log(ev.currentTarget);
  console.log(ev.currentTarget.id);

  /*Con currentTarget obtenemos el Id del elemento clickado*/
  const idSelected = parseInt(ev.currentTarget.id);

  const serieFound = animeSeriesList.find(
    (serie) => serie.mal_id === idSelected
  );
  // (findIndex) me devuelve la posicion del elemento
  const favouriteFound = favouriteSeries.findIndex(
    (fav) => fav.mal_id === idSelected
  );

  if (favouriteFound === -1) {
    favouriteSeries.push(serieFound);
  } else {
    favouriteSeries.splice(favouriteFound, 1);
  }

  console.log(serieFound);
  console.log(favouriteSeries);
}

//EVENTOS
//Al esuchar el 'click' en el boton de busqueda nos traemos la API
buttonSearch.addEventListener("click", (ev) => {
  ev.preventDefault();
  getDataApi();
});

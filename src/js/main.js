"use strict";
//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

//Constantes y variables
const listSerie = document.querySelector(".js-serie");
console.log(listSerie);
const buttonSearch = document.querySelector(".js-buttonSearch");

const listSerieFav = document.querySelector(".js-listsFav");
console.log(listSerieFav);

let animeSeriesList = [];
let favouriteSeries = [];

//FUNCTIONS
/*1 getDataApi:
fetch: pido los datos de la API, "then" espero una respuesta que convierto en json, "then" guardo los datos en un array .animeSeriesList. y los pinto con renderSeries*/

function getDataApi() {
  const inputSearch = document.querySelector(".js-inputSearh");
  let inputValue = inputSearch.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      animeSeriesList = data.data; //el segundo "data" es un elemento del array
      console.log(animeSeriesList);
      renderSeries();
    });
}

/* 2 renderSeries:
Recorro el array .animeSeriesList. con un "for of" y recojo elementos para añadir en "html", con innerHTML selecciono un lugar en el que pintar "html", escucho en bucle con listenerSeries  */
function renderSeries() {
  let html = "";
  for (const oneResult of animeSeriesList) {
    html += `<li class="js-liSeries" id=${oneResult.mal_id}>`;
    if (
      oneResult.images.jpg.image_url ===
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
    ) {
      html += `<img
      src='
      https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
      alt='image notfound'
          />`;
    } else {
      html += `<img
      src=${oneResult.images.jpg.image_url}
      alt=${oneResult.title}
        />`;
    }
    html += `<h2>${oneResult.title}</h2>`;
    html += `</li>`;
    listSerie.innerHTML = html;
    listenerSeries();
  }
}

/* 3 listenerSeries:
Ponemos a todos los <li> la misma clase para seleccionarlos/  querySelectorAll me devuelv un array/ recorremos ese array con un bucle/ añadimos un evento escuchador a cada <li>*/
function listenerSeries() {
  const liSerie = document.querySelectorAll(".js-liSeries");
  for (const li of liSerie) {
    li.addEventListener("click", handleClickFav);
  }
}

/* 4 handleClickFav:
 */
function handleClickFav(ev) {
  console.log(ev.currentTarget);
  console.log(ev.currentTarget.id);

  /*Con currentTarget obtenemos el Id del elemento clickado*/
  const idSelected = parseInt(ev.currentTarget.id);

  const serieFound = animeSeriesList.find(
    (serie) => serie.mal_id === idSelected
  );
  const favouriteFound = favouriteSeries.findIndex(
    // (findIndex) me devuelve la posicion del elemento
    (fav) => fav.mal_id === idSelected
  );

  if (favouriteFound === -1) {
    favouriteSeries.push(serieFound);
    renderSeriesFav();
  } else {
    favouriteSeries.splice(favouriteFound, 1);
    renderSeriesFav();
  }
  console.log(serieFound);
  console.log(favouriteSeries);
}
// 5
function renderSeriesFav() {
  listSerieFav.innerHTML = "";
  let html = "";
  for (const oneResult of favouriteSeries) {
    console.log(oneResult.mal_id);
    html += `<li class="js-liSeriesFav" id=${oneResult.mal_id}>`;
    if (
      oneResult.images.jpg.image_url ===
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
    ) {
      html += `<img
      src='
      https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
      alt='image notfound'
          />`;
    } else {
      html += `<img
      src=${oneResult.images.jpg.image_url}
      alt=${oneResult.title}
        />`;
    }

    html += `<h2>${oneResult.title}</h2>`;
    html += `</li>`;
    html += `</ul>`;
    html += ` </div>`;
    listSerieFav.innerHTML = html;
  }
}

//EVENTOS
// 1 Al esuchar el 'click' en el boton de busqueda nos traemos la API

// inputSearch.addEventListener("keyup", (ev) => {
//   ev.preventDefault();
// });

// 1 Al esuchar el 'click' en el boton de busqueda nos traemos la API

buttonSearch.addEventListener("click", (ev) => {
  ev.preventDefault();
  getDataApi();
});

"use strict";

//Constantes y variables
const listSerie = document.querySelector(".js-lists");
const buttonSearch = document.querySelector(".js-buttonSearch");

const listSerieFav = document.querySelector(".js-favList");

const buttonReset = document.querySelector(".js-buttonReset");

let animeSeriesList = [];
let favouriteSeries = [];

//FUNCTIONS
/*1 getDataApi:
Inluida en el evento click de "buttonSearh"
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
Recorro el array .animeSeriesList. con un "for of" y recojo elementos para añadir en "html", con innerHTML selecciono un lugar en el que pintar "html", escucho en bucle con listenerSeries /le añado una clase para marcar que está en .favouriteSeries. */
function renderSeries() {
  let favTick = "";
  let html = "";
  html += `<div class="lists__searchResult ">`;
  html += `<h2 class="lists__searchResult--h2">¡Animes encontrados!</h2>`;
  html += `<ul class="js-serie lists__searchResult--ul">`;
  for (const oneResult of animeSeriesList) {
    let idFound = parseInt(oneResult.mal_id);

    const serieSelectedFound = favouriteSeries.find(
      (serie) => serie.mal_id === idFound
    );

    if (serieSelectedFound) {
      favTick = "classList2";
      html += `<li style="list-style-type:none" class="js-liSeries liSeries ${favTick}" id=${oneResult.mal_id}>`;
    } else {
      html += `<li style="list-style-type:none" class="js-liSeries liSeries " id=${oneResult.mal_id}>`;
    }
    if (
      oneResult.images.jpg.image_url ===
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
    ) {
      html += `<img class="liSeries__img"
      src='
      https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
      alt='image notfound'
          />`;
    } else {
      html += `<img class="liSeries__img"
      src=${oneResult.images.jpg.image_url}
      alt=${oneResult.title}
        />`;
    }
    html += `<h3 class="liSeries__title">${oneResult.title}</h3>`;
    html += `</li>`;
    listSerie.innerHTML = html;
    listenerSeries();
  }
  html += `</ul>`;
  html += `</div>`;
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
Atraves de"currentTarget.id" conseguimos esa propiedad"id" del elemento clickado/ serieFound nos encuentra(find) el elemento completo del "id" clickado/ favouriteFound verifico si el "id" clickado se encuentra en .favouriteSeries./ si favouriteFound no se encuentra en el array, su posicion sera -1,por lo que empujamos(push) serieFound al array y pintamos el nuevo listado , y si ya se encuentra en .favouriteSeries. la plegamos(splice).//En este momento que creo el array creo la variable en el local storage
 */
function handleClickFav(ev) {
  ev.preventDefault();
  console.log(ev.currentTarget.id);

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
    renderSeriesFav();
    renderSeries();
  } else {
    favouriteSeries.splice(favouriteFound, 1);

    renderSeriesFav();
    renderSeries();
  }

  localStorage.setItem("localFavList2", JSON.stringify(favouriteSeries));
}
/* 5 renderSeriesFav
Cuando .favouriteSeries. esta vacio solo vemos el resultado de la busqueda y si no, añade un valor a classFavourite y pinta el array en el innerHTML/el bucle funciona igual que en renderSeries/ escucho para eliminar las series*/
function renderSeriesFav() {
  let classFavourite = "";

  listSerieFav.innerHTML = "";
  if (favouriteSeries.length === 0) {
    console.log(favouriteSeries);
    renderSeries();
  } else {
    let html = "";
    html += '<div class="lists__favResult">';
    html += `<h2 class="${classFavourite} lists__favResult--h2"> ¡Tus favoritos! </h2>`;
    html += '<ul class="lists__favResult--ul js-listsFav">';
    for (const oneResult of favouriteSeries) {
      console.log(oneResult.mal_id);
      html += `<li style="list-style-type:none" class="js-liSeriesFav liSeriesFav" id=${oneResult.mal_id}>`;
      if (
        oneResult.images.jpg.image_url ===
        "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
      ) {
        html += `
        <img
        class="${classFavourite} liSeriesFav__img"
        src='
        https://via.placeholder.com/210x295/ffffff/666666/?text=TV'
        alt='image notfound'
            />`;
      } else {
        html += `
        <img
        
        class="${classFavourite} liSeriesFav__img"
        src=${oneResult.images.jpg.image_url}
        alt=${oneResult.title}
          />`;
      }

      html += `<div class="liSeriesFav__favouriteDiv"><h3 class="${classFavourite} liSeriesFav__title">${oneResult.title} </h3><input class="liSeriesFav__buttonFav js-buttonFav" type="button" value="X" id=${oneResult.mal_id}> </div>`;

      html += `</li>`;
    }
    html += `</ul>`;
    html += "</div>";
    listSerieFav.innerHTML += html;
    listenerButtonFav();
  }
}
/*6 getFavLocalStorage
Guardo mi array de favoritos en el local storage localFavList2
 */
function getFavLocalStorage() {
  const favLocalStorage = JSON.parse(localStorage.getItem("localFavList2"));
  if (favLocalStorage === null) {
    console.log("Bienvenido! ¿Es tu primera vez?");
  } else {
    favouriteSeries = favLocalStorage;
    renderSeriesFav();
  }
  console.log(localStorage);
}
getFavLocalStorage();

/*7 handleClickReset
Al pulsar buttonReset eliminamos la variable creada en el local storage/vaciamos nuestro array de series favorita/y pintamos de nuevo para que se apliquen los cambios*/
function handleClickReset(ev) {
  ev.preventDefault();
  localStorage.removeItem("localFavList2");
  favouriteSeries = [];
  renderSeriesFav();
}
/*8 listenerButtonFav
Ponemos a todos los <input type=button> la misma clase para seleccionarlos/  querySelectorAll me devuelv un array/ recorremos ese array con un bucle/ añadimos un evento escuchador a cada uno
*/
function listenerButtonFav() {
  const buttonFav = document.querySelectorAll(".js-buttonFav");
  for (const eachButton of buttonFav) {
    eachButton.addEventListener("click", handleButtonFav);
  }
}

/*9 handleButtonFav
Al pulsar buttonFav sacamos del Array de favoritos el elemento cuyo Id coincida/ modificamos el local storage con "setItem"/volvemos a pintar nuestros dos listados con las actualizaciones
 */
function handleButtonFav(ev) {
  ev.preventDefault();
  const idSelected = parseInt(ev.currentTarget.id);
  // (findIndex) me devuelve la posicion del elemento
  const favouriteFound = favouriteSeries.findIndex(
    (fav) => fav.mal_id === idSelected
  );
  console.log(favouriteFound);

  if (favouriteFound >= 0) {
    favouriteSeries.splice(favouriteFound, 1);
    console.log(favouriteSeries);

    localStorage.setItem("localFavList2", JSON.stringify(favouriteSeries));
    renderSeries();
    renderSeriesFav();
  }
}

//EVENTOS
// 1 Al esuchar el 'click' en el boton de busqueda nos traemos la API
buttonSearch.addEventListener("click", (ev) => {
  ev.preventDefault();
  getDataApi();
});

//2 Al esuchar el 'click' en el boton de reset ejecutamos la funcion manejadora
buttonReset.addEventListener("click", handleClickReset);

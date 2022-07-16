"use strict";
//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
//Constantes y variables
const listSerie = document.querySelector(".js-serie");
console.log(listSerie);
const buttonSearch = document.querySelector(".js-buttonSearch");

const listSerieFav = document.querySelector(".js-serieFav");
console.log(listSerieFav);

let animeSeriesList = [];
let favouriteSeries = [];

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
    //renderSeriesFav(); ??
  } else {
    favouriteSeries.splice(favouriteFound, 1);
  }

  console.log(serieFound);
  console.log(favouriteSeries);
}

buttonSearch.addEventListener("click", (ev) => {
  ev.preventDefault();
  getDataApi();
});

function getDataApi() {
  fetch("https://api.jikan.moe/v4/anime?q=") //al lado del igual voy a tener que llamar una variable que obtendra el input. de js-inputSeacrh
    .then((response) => response.json())
    .then((data) => {
      animeSeriesList = data.data; //el segundo data es un elemento del array
      console.log(animeSeriesList);
      renderSeries();
    });
}

/*Ponemos a todos los <li> la misma clase para seleccionarlos/  querySelectorAll me devuelv un array/ recorremos ese array con un bucle*/
function listenerSeries() {
  const liSerie = document.querySelectorAll(".js-liSeries");
  for (const li of liSerie) {
    li.addEventListener("click", handleClickFav);
  }
}

/*pinta en el Html las series, recorriendo el array a traves de un bucle y crea un <li>*/
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
    listSerie.innerHTML = html; //pinto
    listenerSeries(); //y escucho en bucle
  }
}
// getDataApi();

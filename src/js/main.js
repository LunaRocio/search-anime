"use strict";

const listSerie = document.querySelector(".js-serie");
const listSerieFav = document.querySelector("js-serieFav");
let animeSeriesList = [];
let favouriteSeries = [];

// function renderSeriesFav() {
//   let htmlFav = "";
//   for (const oneResultFav of favouriteSeries) {
//     console.log(oneResultFav);
//     //console.log(animeSeriesList);
//     htmlFav += `<li class="js-liSeriesFav" id=${oneResultFav.mal_id}>`;
//     //console.log(oneResult.mal_id);
//     htmlFav += `<img
//     src=${oneResultFav.images.jpg.image_url}
//     alt=${oneResultFav.title}
//         />`;
//     htmlFav += `<h2>${oneResultFav.title}</h2>`;
//     htmlFav += `</li>`;
//     listSerieFav.innerHTML = htmlFav; //pinto
//     // listenerSeries(); //y escucho en bucle
//   }
//   //console.log(htmlFav);
// }

function handleClick(ev) {
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

/*  const idFound = animeSeriesList.find(() => animeSeriesList.id === idSelected);
  console.log(idFound);*/

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
    li.addEventListener("click", handleClick);
  }
}

/*pinta en el Html las series, recorriendo el array a traves de un bucle y crea un <li>*/
function renderSeries() {
  let html = "";
  for (const oneResult of animeSeriesList) {
    //console.log(oneResult);
    //console.log(animeSeriesList);
    html += `<li class="js-liSeries" id=${oneResult.mal_id}>`;
    //console.log(oneResult.mal_id);
    html += `<img
    src=${oneResult.images.jpg.image_url}
    alt=${oneResult.title}
        />`;
    html += `<h2>${oneResult.title}</h2>`;
    html += `</li>`;
    listSerie.innerHTML = html; //pinto
    listenerSeries(); //y escucho en bucle
  }

  // console.log(html);
}
getDataApi();

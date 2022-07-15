"use strict";

const listSerie = document.querySelector(".js-serie");
let animeSeriesList = [];

function getDataApi() {
  fetch("https://api.jikan.moe/v4/anime?q=") //al lado del igual voy a tener que llamar una variable que obtendra el input. de js-inputSeacrh
    .then((response) => response.json())
    .then((data) => {
      animeSeriesList = data.data; //el segundo data es un elemento del array
      console.log(animeSeriesList);
      renderSeries();
    });
}

function renderSeries() {
  let html = "";
  for (const oneResult of animeSeriesList) {
    console.log(oneResult);
    html += `<li>`;
    html += `<img
    src=${oneResult.images.jpg.image_url}
    alt=${oneResult.title}
        />`;
    html += `<h2>${oneResult.title}</h2>`;
    html += `</li>`;
    listSerie.innerHTML = html;
  }
  console.log(html);
}
getDataApi();

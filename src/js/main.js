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

function listenerSeries() {
  const liSerie = document.querySelectorAll(".js-liSeries");
  for (const li of liSerie) {
    li.addEventListener("click", () => console.log(`Click en serie `));
  }
}

function renderSeries() {
  let html = "";
  for (const oneResult of animeSeriesList) {
    console.log(oneResult);
    html += `<li class="js-liSeries">`;
    html += `<img
    src=${oneResult.images.jpg.image_url}
    alt=${oneResult.title}
        />`;
    html += `<h2>${oneResult.title}</h2>`;
    html += `</li>`;
    listSerie.innerHTML = html; //pinto
    listenerSeries(); //y escucho
  }
  console.log(html);
}
getDataApi();

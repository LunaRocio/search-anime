'use strict';


const listSerie = document.querySelector('.js-serie');
let animeSeriesList =[];


fetch("https://api.jikan.moe/v4/anime?q=")
  .then((response=> response.json()))
  .then((data) =>{
    animeSeriesList=data.data;
    console.log(animeSeriesList);
    console.log(animeSeriesList[1].images.jpg.image_url);
    listSerie.innerHTML= `<li><img
      src=${animeSeriesList[1].images.jpg.image_url}
      alt=${animeSeriesList[1].title}
    />
    <h2>${animeSeriesList[1].title}</h2>
  </li>`;
    console.log(listSerie);
  });



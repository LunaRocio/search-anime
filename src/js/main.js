'use strict';


const listSerie = document.querySelector('.js-serie');
let animeSeriesList =[];


fetch("https://api.jikan.moe/v4/anime?q=")
  .then((response=> response.json()))
  .then((data) =>{
    animeSeriesList=data.data;
    console.log(animeSeriesList);

    let html= "";
    for(const oneResult of animeSeriesList ){
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
  });



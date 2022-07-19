"use strict";const listSerie=document.querySelector(".js-lists"),buttonSearch=document.querySelector(".js-buttonSearch"),listSerieFav=document.querySelector(".js-favList"),buttonReset=document.querySelector(".js-buttonReset");let animeSeriesList=[],favouriteSeries=[];function getDataApi(){let e=document.querySelector(".js-inputSearh").value;fetch("https://api.jikan.moe/v4/anime?q="+e).then(e=>e.json()).then(e=>{animeSeriesList=e.data,console.log(animeSeriesList),renderSeries()})}function renderSeries(){let e="",i="";i+='<div class="lists__searchResult ">',i+='<h2 class="lists__searchResult--h2">Resultado de la busqueda</h2>',i+='<ul class="js-serie lists__searchResult--ul">';for(const s of animeSeriesList){let t=parseInt(s.mal_id);favouriteSeries.find(e=>e.mal_id===t)?(e="classList2",i+=`<li style="list-style-type:none" class="js-liSeries liSeries ${e}" id=${s.mal_id}>`):i+=`<li style="list-style-type:none" class="js-liSeries liSeries " id=${s.mal_id}>`,"https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"===s.images.jpg.image_url?i+="<img class=\"liSeries__img\"\n      src='\n      https://via.placeholder.com/210x295/ffffff/666666/?text=TV'\n      alt='image notfound'\n          />":i+=`<img class="liSeries__img"\n      src=${s.images.jpg.image_url}\n      alt=${s.title}\n        />`,i+=`<h3 class="liSeries__title">${s.title}</h3>`,i+="</li>",listSerie.innerHTML=i,listenerSeries()}i+="</ul>",i+="</div>"}function listenerSeries(){const e=document.querySelectorAll(".js-liSeries");for(const i of e)i.addEventListener("click",handleClickFav)}function handleClickFav(e){e.preventDefault(),console.log(e.currentTarget),console.log(e.currentTarget.id);const i=parseInt(e.currentTarget.id),s=animeSeriesList.find(e=>e.mal_id===i),t=favouriteSeries.findIndex(e=>e.mal_id===i);-1===t?(favouriteSeries.push(s),renderSeriesFav(),renderSeries()):(favouriteSeries.splice(t,1),renderSeriesFav(),renderSeries()),localStorage.setItem("localFavList2",JSON.stringify(favouriteSeries))}function renderSeriesFav(){if(listSerieFav.innerHTML="",0===favouriteSeries.length)console.log(favouriteSeries),renderSeries();else{let e="";e+='<div class="lists__favResult">',e+='<h2 class=" lists__favResult--h2"> Favoritos </h2>',e+='<ul class="lists__favResult--ul js-listsFav">';for(const i of favouriteSeries)console.log(i.mal_id),e+=`<li style="list-style-type:none" class="js-liSeriesFav liSeriesFav" id=${i.mal_id}>`,"https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"===i.images.jpg.image_url?e+="<img\n        class=\" liSeriesFav__img\"\n        src='\n        https://via.placeholder.com/210x295/ffffff/666666/?text=TV'\n        alt='image notfound'\n            />":e+=`<img\n        class=" liSeriesFav__img"\n        src=${i.images.jpg.image_url}\n        alt=${i.title}\n          />`,e+=`<h3 class=" liSeriesFav__title">${i.title}</h3>`,e+="</li>";e+="</ul>",e+="</div>",listSerieFav.innerHTML+=e}}function getFavLocalStorage(){const e=JSON.parse(localStorage.getItem("localFavList2"));null===e?console.log("Bienvenido! ¿Es tu primera vez?"):(favouriteSeries=e,renderSeriesFav()),console.log(localStorage)}function handleClickReset(e){e.preventDefault(),localStorage.removeItem("localFavList2"),favouriteSeries=[],renderSeriesFav()}getFavLocalStorage(),buttonSearch.addEventListener("click",e=>{e.preventDefault(),getDataApi()}),buttonReset.addEventListener("click",handleClickReset);
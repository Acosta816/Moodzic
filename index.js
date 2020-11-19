'use strict';

const searchURL = 'http://api.weatherstack.com/current';

function formatQueryParams(parameters) {
  const queryItems = Object.keys(parameters)
    .map(key => `${key}=${parameters[key]}`);
  return queryItems.join('&');
}

async function getLocationWeather(query) {
  const weatherParams = {
    query: query,
    access_key: config.weatherApiKey
  };

  const queryString = formatQueryParams(weatherParams)
  const finalWeatherUrl = searchURL + '?' + queryString;

  try {
    const response = await fetch(finalWeatherUrl);
    const responseJson = await response.json();
    let iconVal = responseJson.current.weather_icons[0];
    let textVal = responseJson.current.weather_descriptions[0];
    $('#playListClimate').closest('img').attr('src', iconVal);
    $('#mySidenav').find('h4').text(`${textVal} Playlist`);
    STORE.weatherData = responseJson;
    displayLocation();
    createPlaylistFromCondition();
  }
  catch (err) {
    console.error(err);
  }
}

function createPlaylistFromCondition() {
  if (STORE.weatherData.current.weather_code < 1010 && STORE.weatherData.current.temperature > 30 && STORE.weatherData.current.is_day === "yes") {
    findGoodVibePlaylist();
  } else if (STORE.weatherData.current.weather_code < 1010 && STORE.weatherData.current.is_day === "no") {
    findGetLitPlaylist();
  } else {
    findFeelsPlaylist()
  }
}

<<<<<<< HEAD
function renderWeatherHtml() {
  let screenInjection = `
    <div class="weatherApiInfo">
      <div class="placeAndDate">
        <h3>${STORE.weatherData.location.name}, ${STORE.weatherData.location.region}<h3>
        <p>${STORE.weatherData.location.localtime}, <span>${STORE.weatherData.current.weather_descriptions[0]}</span> </p>
      </div>
      <div class="tempAndIcon">
        <img src="${STORE.weatherData.current.weather_icons[0]}">
        <h2>${STORE.weatherData.current.temperature}F</h2>
      </div>  
    </div>
    `;
=======
/*David ------------------------------------------------------------------------------------------------------------*/
function renderWeatherHtml (){

  let screenInjection =
                          `<div class="weatherApiInfo">
                            <div class="placeAndDate">
                              <h3>${STORE.weatherData.location.name}, ${STORE.weatherData.location.region}<h3>
                              <p>${STORE.weatherData.location.localtime}, <span>${STORE.weatherData.current.condition.text}</span> </p>
                            </div>
                            <div class="tempAndIcon">
                              <img src="${STORE.weatherData.current.condition.icon}">
                              <h2>${STORE.weatherData.current.temp_f}F</h2>
                            </div>
                          </div>
                          `;
>>>>>>> 376f5a48eed4d846de5e277abf222f0ca2ce4fd7

  return screenInjection;
}

function displayLocation() {
  const lat = STORE.weatherData.location.lat;
  const lon = STORE.weatherData.location.lon;
  const category = getYelpQueries();
  let limit = 4
  if (category.length > 2) {
    const term = `${category[0]},${category[2]}`;
    const searchValue = `${category[1]},${category[3]}`
    let limit = 6;
    fetchYelp(lat, lon, searchValue, term, limit);
  } else {
    fetchYelp(lat, lon, category[0], category[1], limit);
  }
}

async function fetchYelp(latitude, longitude, categories, term, limit) {
  const param = {
    term,
    categories,
    limit,
    latitude,
    longitude
  }

  const yelpParam = formatQueryParams(param);
  const searchUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
  const yelpUrl = `${searchUrl}?${yelpParam}`;
  const authorization = {
    headers: new Headers({
      'Authorization': `Bearer ${config.yelpApiKey}`
    })
  }

  try {
    const response = await fetch(yelpUrl, authorization);
    const responseJson = await response.json();
    STORE.yelpData = responseJson;
    displayResults();
  }
  catch (err) {
    console.log(err);
  }
}

function displayFoodServices() {
  return `<div class ="food-delivery">
  <a href="https://grubhub.com" target="blank"><img class="food-delivery-image" src="images/grubhub.jpg" ></a>
  <a href="https://ubereats.com" target="blank"><img class="food-delivery-image" src="images/ubereats.png" ></a>
  </div>`;
}

function checkWeather() {
  if (STORE.weatherData.current.weather_code < 1010 && STORE.weatherData.current.temperature > 38 && STORE.weatherData.current.is_day === "yes") {
    return 'good';
  }
  if (STORE.weatherData.current.weather_code < 1010 && STORE.weatherData.current.is_day === "no") {
    return 'good-night';
  }
  return 'bad';
}

function renderResults() {
  const weather = renderWeatherHtml();
  const title = displayTitle();
  const yelpResults = renderYelpResults();
  const foodServices = displayFoodServices();
  let html = ``;

  if (checkWeather() === 'good') {
    html = weather + title + yelpResults;
  } else if (checkWeather() === 'good-night') {
    html = weather + title + yelpResults;
  } else {
    html = weather + title + yelpResults + foodServices;
  }
  return html
}

function displayResults() {
  $('.screens').html(renderResults());
  // $('.screens').append(displayGallery());
}

function getYelpQueries() {
  if (checkWeather() === 'good') {
    return ['parks', 'parks', 'food', 'food'];
  }
  if (checkWeather() === 'good-night') {
    return ['bars', 'bars'];
  }
  return ['coffee', 'coffee'];
}

function displayTitle() {
  if (checkWeather() === 'good') {
    return `<h3>It's a nice day out, check out some local food or parks!</h3>`;
  }
  if (checkWeather() === 'good-night') {
    return `<h3 class="suggestionHeader">It's a clear night, how about checking out some of these local bars!</h3>`;
  }
  galleryFetch(); //calling gallery code
  return `<h3>It's not so nice out, check out some of these local coffee shops or order food from these delivery services</h3>`;
}

<<<<<<< HEAD
function renderYelpResults() {
=======
//-----------------------------------------------------------------***********Gallery Code START*****-------
 function galleryPOST() {

    const galleryPOSTParams = {
      client_id: config.galClientID,
      client_secret: config.galClientSecret
    };
    const galPostQueryString = formatQueryParams(galleryPOSTParams);

let galPostSettings = {
  "async": true,
  "crossDomain": true,
  "url": `https://api.artsy.net/api/tokens/xapp_token?${galPostQueryString}`,
  "method": "POST"
}

$.ajax(galPostSettings).done(function (galPostToken) {
  config.galApiKey = galPostToken.token;
  console.log(config.galApiKey);
});

galleryFetch();
}



 function galleryFetch() {

  for(let i=0; i<6; i++){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.artsy.net/api/artworks?sample=",
      "method": "GET",
      "headers": {
        "X-Xapp-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTU1OTg3NzYxNSwiaWF0IjoxNTU5MjcyODE1LCJhdWQiOiI1Y2YwMDA1MzFlM2U5MjE4Yjg0YTMyYjEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWNmMDlkNmYyZDk1YmMwMDExNWUxNjgwIn0.SkaD3E_-S9-51NcM-bOyhL71NKhCf3ZMqEM93hxycSo",

      }
    }

  $.ajax(settings).done(function (galJson) {
    galleryPieces.push(galJson);

  });

}
//end of for loop
console.log(galleryPieces.length);

} //END OF GALLERY FETCH

function displayGallery(){

    let galResults = ``;
  for(let i=0; i<galleryPieces.length; i++){

    galResults +=
    `<div class ="slide" >
      <p>${galleryPieces[i].title }</p>
      <img class="yelpImg" src="${galleryPieces[i]._links.thumbnail.href}" >
    </div>`
  ;

};//end of loop


    galResults = `<h3>Here you go, some culture</h3>
                  <div class="slider">
                  <div class ="slidePads"></div>
                  ${galResults}
                  <div class ="slidePads"></div>
                </div>`;

    return galResults;
  }


//-------------------------------------------------------------------------Gallery Code END**********



function renderYelpResults() {
>>>>>>> 376f5a48eed4d846de5e277abf222f0ca2ce4fd7

  let results = STORE.yelpData.businesses.map(i =>
    `<div >
    <a target="_blank" href="${i.url}"><h4>${i.name}</h4></a>
    <img class="yelpImg" src="${i.image_url}" >
    <div class="yelpTextContainer">
    ${i.location.display_address.map(i => `<p>${i}</p>`).join('')}
    </div>
  </div>`).join('');

  results = `
    <div class="yelp-result">

    ${results}
    </div>
  `;

  return results;
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
<<<<<<< HEAD
    const location = $('#js-location').val();
    getLocationWeather(location);
=======
    galleryPOST();
    const location = $('#js-location').val(); //taking user input and assigning to "location" variable
    getLocationWeather(location); //calling the getLocationWeather and passing user's location in
>>>>>>> 376f5a48eed4d846de5e277abf222f0ca2ce4fd7
  });
}

$(watchForm);

// $('.screens').append(displayGallery());
//CALL THIS FUNCTION ONCE EVERYTHING HAS BEEN THERE A WHILE(sill buggy)
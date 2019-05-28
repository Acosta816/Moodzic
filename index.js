'use strict';

function formatQueryParams (parameters) {
  const queryItems = Object.keys(parameters)
    .map(key => `${key}=${parameters[key]}`);
  return queryItems.join('&');
}

async function getLocationWeather (query) {
  const weatherParams = {
    q: query,
    key: config.weatherApiKey
  };

  const queryString = formatQueryParams(weatherParams)
  const searchURL = 'https://api.apixu.com/v1/current.json';
  const finalWeatherUrl = searchURL + '?' + queryString;

  try {
    const response = await fetch (finalWeatherUrl);
    const responseJson = await response.json();
    $('.screens').html(renderHtml(responseJson));
    fetchSpotifyToken();
    displayLocation(responseJson);
    assignPlayListHeader(responseJson);
  }
  catch(err) {
    console.log('error message', err);
  }
}

function assignPlayListHeader (responseJson) {
  let iconVal = responseJson.current.condition.icon; //assigning the weather icon to the playlist header
  let textVal = responseJson.current.condition.text; //assigning the weather text to the playlist header
  $('#playListClimate').closest('img').attr('src',iconVal);
  $('#mySidenav').find('h4').text(`${textVal} Playlist`);
}

function renderHtml (jsonObject) {

  let screenInjection =
  `
  <div class="weatherApiInfo">
    <div class="placeAndDate">
      <h3>${jsonObject.location.name}, ${jsonObject.location.region}<h3>
      <p>${jsonObject.location.localtime}, <span>${jsonObject.current.condition.text}</span> </p>
    </div>
    <div class="tempAndIcon">
      <img src="${jsonObject.current.condition.icon}">
      <h2>${jsonObject.current.temp_f}F</h2>
    </div>  
  </div>
   `;
  return screenInjection;
}

function displayLocation (jsonData) {
  const lat = jsonData.location.lat;
  const lon = jsonData.location.lon;
  fetchYelp(lat, lon);
}

async function fetchYelp (lat, lon) {
  const param = {
    term: 'food',
    categories: 'cafes',
    limit: 4,
    latitude: lat,
    longitude: lon
  }

  const yelpParam = formatQueryParams(param);
  const searchUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search';
  const yelpUrl = `${searchUrl}?${yelpParam}`;
  const authorization = {
    headers: new Headers ({
      'Authorization': `Bearer ${config.yelpApiKey}`
    })
  }

  try {
    const response = await fetch (yelpUrl, authorization);
    const responseJson = await response.json();

    for(let i = 0; i< responseJson.businesses.length; i++ ){
      $('.screens').append(`<div class ="flexBoxish"><p>${responseJson.businesses[i].name}</p>
                          <img class="yelpImg" src="${responseJson.businesses[i].image_url}" >
                          </div>`); //This is just temporary

    //David-----------------------------------
    //$('footer').html(displayYelpStuff(responseJson));
    //David-------------------------------------
    }

    renderResult(responseJson);
  }
  catch(err) {
    console.log('error message', err);
  }
}

function renderResult (responseJson) {
  responseJson.map(data => console.log(data));
}

//----------------------------------TODO***GET THIS WORKING TO PUSH OVER TO STORE
function displayYelpStuff(someData){
  console.log(`here you goooo ${someData.businesses[0].alias}`);
  let yelpInjection = `<p>${someData.businesses[0].alias}</p>`;

  return yelpInjection;
}
/*--------------------*/






function watchForm () {
  $('form').submit(event => {
    event.preventDefault();
    const location = $('#js-location').val();
    getLocationWeather(location);
  });
}

$(watchForm);

/*David--------------------------------------------------------------------------------------------------------------------------------------*/
// let appTitle = $('.le-projects'); //This code cycles through the RBB values of the shadow-text changing their colors over time

//         function runColorsAnm(){
//
//         $({'r':27,'g':213,'b':255, }).animate({'r':31,'g':255,'b':69},{queue:false,duration:3000, easing:'swing',
//           step: function(now) {
//             appTitle.css('text-shadow', '0 0 9px rgb('+this.r+','+this.g+','+this.b+')');

//           }, complete:function(){
//             $({'r':31,'g':255,'b':69}).animate({'r':255,'g':15,'b':15},{queue:false,duration:3000, easing:'swing',
//               step: function(now) {
//                   appTitle.css('text-shadow', '0 0 9px rgb('+this.r+','+this.g+','+this.b+')');

//               }, complete:function(){
//                 $({'r':255,'g':15,'b':15}).animate({'r':255,'g':15,'b':248},{queue:false,duration:3000, easing:'swing',
//                   step: function(now) {
//                       appTitle.css('text-shadow', '0 0 9px rgb('+this.r+','+this.g+','+this.b+')');

//                   }, complete:function(){
//                       //loop here
//                       console.log('restart');
//                       runColorsAnm();
//                   } //NEXT-SUB-SEQUENCE-.
//                 });
//               } //NEXT-SUB-SEQUENCE-.
//             });
//           } //NEXT-SUB-SEQUENCE-.
//         });

//         };//endloop

//         runColorsAnm(); //iife immediately invoked function event
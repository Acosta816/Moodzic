'use strict';

const weatherApiKey = "1e03aa605c2548559f2202802192505";

const searchURL = 'https://api.apixu.com/v1/current.json';


function formatQueryParams(parameters) {
  const queryItems = Object.keys(parameters)
    .map(key => `${key}=${parameters[key]}`)
  return queryItems.join('&');
}

async function getLocationWeather(query) {
  const weatherParams = {
    q: query,
    key: weatherApiKey,
  };

  const queryString = formatQueryParams(weatherParams)
  const finalWeatherUrl = searchURL + '?' + queryString;

  console.log(finalWeatherUrl);

  try {
    const response = await fetch (finalWeatherUrl);
    const responseJson = await response.json();
    console.log(`Here is the weather info: ${responseJson.location.name}`);
    //renderHtml(responseJson);

    displayLocation(responseJson);
  } 
  catch(err) {
    console.log('error message');
  }
}

/*David ------------------------------------------------------------------------------------------------------------*/
function renderHtml(jsonObject){
  
}

function displayLocation (jsonData) {
  const lat = jsonData.location.lat;
  const lon = jsonData.location.lon;
  fetchYelp(lat,lon);
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
    headers: new Headers({
      'Authorization': 'Bearer rKBleUfKJSjnRt4heyZ3KL_j1BOMSuKlZcev_lm1RlCDi9r3zXh-VVzOLAyHiUi3X8Kp_m4mqMtunsQwKeU6fIUJu1EogqIsZqCZP1kYYgeEqS59f1V8O3UUaKHpXHYx'
    })
  }

  try {
    const response = await fetch(yelpUrl, authorization);
    const responseJson = await response.json();
    console.log(responseJson);
    renderResult(responseJson);
  }
  catch(err) {
    console.log('error message');
  }
}

function renderResult (responseJson) {
  responseJson.map(data => console.log(data))
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const location = $('#js-location').val();
    getLocationWeather(location);
  });
}

$(watchForm);
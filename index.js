'use strict';

const searchURL = 'https://api.apixu.com/v1/current.json';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

async function getMusic(query) {
  const params = {
    q: query,
    key: config.weatherApiKey
  };

  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  try {
    const response = await fetch (url);
    const responseJson = await response.json();
    displayLocation(responseJson);
  } 
  catch(err) {
    console.log('error message');
  }
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
      'Authorization': `Bearer ${config.yelpApiKey}`
    })
  }

  try {
    const response = await fetch(yelpUrl, authorization);
    const responseJson = await response.json();
    console.log(responseJson);
    renderResult(responseJson);
  }
  catch(err) {
    console.log('error message', err);
  }
}

function renderResult (responseJson) {
  const result = responseJson.businesses.map(data => `
    <li> 
      <img src="${data.image_url}" alt="">
      <h1>Name: ${data.name}</h1>
      <h2>Address: ${(data.location.display_address).join('')}</h2>
      <p>Rating: ${data.rating}</p>
      <a href="${data.url}">Yelp reviews</a>
    </li>
  `);

  displayResult(result);
}

function displayResult (data) {
  $('.result').html(data);
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const location = $('#js-location').val();
    getMusic(location);
  });
}

$(watchForm);
'use strict';

const apiKey = "a45fabad12cf4d32baded670685ff29e"

const searchURL = 'https://newsapi.org/v2/everything';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function getMusic(query, maxResults=10) {
  const params = {
    q: query,
    language: "en",
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);
  
  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };

  fetch(url, options)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson));
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const location = $('#js-location').val();
    const maxResults = $('#js-max-results').val();
    getMusic(location, maxResults);
  });
}

$(watchForm);
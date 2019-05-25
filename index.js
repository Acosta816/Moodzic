'use strict';

const apiKey = "";

const searchURL = 'https://api.apixu.com/v1/current.json';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
  return queryItems.join('&');
}

function getMusic(query) {
  const params = {
    q: query,
    key: "",
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);
  
//   const options = {
//     headers: new Headers({
//       "key": apiKey})
//   };

  fetch(url)
    .then(response => response.json())
    .then(responseJson => console.log(responseJson));
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const location = $('#js-location').val();
    getMusic(location);
  });
}

$(watchForm);
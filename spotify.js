function fetchSpotifyToken () {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token",
    "method": "POST",
    "headers": {
      "Authorization": "Basic NDBmYjhjZjkxODk0NDYxMTg2ZWEzOTg2MWMwYzE3MTA6YmFkODFlZGQyN2Y5NDU3ZWI2ZWQ5NDg0MGY3M2MwMTQ=",
      "Accept": "*/*",
      "Cache-Control": "no-cache",
      "Postman-Token": "5e6611bd-3782-40c5-9601-ac2d9955d0e2,01974462-92d7-49ab-9519-c385e01054e9",
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache"
    },
    "data": {
      "grant_type": "refresh_token",
      "refresh_token": "AQBkDkhAKJfL7fL7sLDzXXDwOsXGfaQkpq9cwm_IeAHFFAE58bYbC6PBKTEZNaBeyY8eKU4OOw4DX5FZhz__kQyTvc8sTwoTMCkVGFa9ONO-rDzHFnCcroGX3N_hPJH4NeRwCQ"
    }
  }
  $.ajax(settings).done(function (response) {
    console.log(response.access_token);
  });

  getSpotifyArtist();
}

function getSpotifyArtist () {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/artists/0Y0QSi6lz1bPik5Ffjr8sd",
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Authorization": "Bearer BQCwhmuh6RzHXv6RFYhk8sSG1uRB75zBDWmUFO2gkcZZwTbCDevhqjYpLPkoI4Kk5fQOG0zsquZ5TlDTTqIXy_65UF99h4zyy22_j7-jcuEaIBBTEsU7cXLhdki_FJHWlv0V1km3pOopO3mG5ShW3c50cbnmIvTeqJHy3RGdc3W2hJ64dL8P_1pDWBG8BL_9_T0jwF4vfw",
      "cache-control": "no-cache",
      "Postman-Token": "6eb9baf5-ef28-4828-ae43-cc19abcdc28f"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response.external_urls.spotify);
  });
}
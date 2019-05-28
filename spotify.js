const store = {
  good: 'artist',
  bad: 'artist'
}

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
    getSpotifyArtist(response);
  });
}

async function getSpotifyArtist (response) {
  const authorization = {
    headers: new Headers ({
      'Authorization': `Bearer ${response.access_token}`
    })
  }
  try {
    const newResponse = await fetch (`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/artists/0Y0QSi6lz1bPik5Ffjr8sd`, authorization);
    const artistResponse = await newResponse.json();
    getRelatedArtists(response, artistResponse);
  }
  catch(err) {
    console.log('error', err);
  }


}

async function getRelatedArtists (token, artist) {
  const authorization = {
    headers: {
      'Authorization': `Bearer ${token.access_token}`
    }
  }

  try {
    const response = await fetch (`https://api.spotify.com/v1/artists/${artist.id}/related-artists`, authorization);
    const artists = await response.json();
    createPlayList(token, artists);
  }
  catch(err) {
    console.log('error', err);
  }
}

async function createPlayList (token, artists) {
  const authorization = {
    method: 'POST',
    body: JSON.stringify({name: "test", public: false}),
    headers: {
      'Accept': `application/json`,
      'Authorization': `Bearer ${token.access_token}`,
      'Content-Type': `application/json`
    }
  }
  try {
    const response = await fetch ('https://api.spotify.com/v1/users/1224174868/playlists', authorization);
    const playList = await response.json();
    getArtistTopTracks(token, artists, playList);
  }
  catch(err) {
    console.log(err);
  }
}

async function getArtistTopTracks (token, artists, playList) {
  const artistId = artists.artists.map(artistId => artistId.id).join(', ');
  console.log(artistId);
  const authorization = {
    headers: {
      'Authorization': `Bearer ${token.access_token}`,
      'Accept': 'application/json'
    }
  }

  try {
    const response = await fetch (`https://api.spotify.com/v1/artists/1kwGj7uDO5WXVXtQLvGJr0/top-tracks?country=US`, authorization);
    const artistTopTrack = await response.json();
    addTracks(token, playList, artistTopTrack);
  }
  catch(err) {
    console.log(err);
  }
}

async function addTracks (token, playList, artistTopTrack) {
  const uri = artistTopTrack.tracks.map(trackuri => `uris=${trackuri.uri}`).join('&');
  const playListId = playList.id;
  const authorization = {
    method: 'POST',
    headers: {
      'Accept': `application/json`,
      'Authorization': `Bearer ${token.access_token}`,
      'Content-Type': `application/json`
    }
  }

  try {
    const response = await fetch (`https://api.spotify.com/v1/users//playlists/${playListId}/tracks?uris=spotify:track:3mof6Z6vz6gonsuIEQXank`, authorization);
    const completePlayList = await response.json();
    appendMusic(playListId)
  }
  catch(err) {
    console.log(err);
  }
}

function appendMusic(playListId) {
  $('.sidenav').html(`<iframe src="https://open.spotify.com/embed/user/1224174868/playlist/${playListId}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)
}
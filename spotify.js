(function defaultPlayList() {
  const url = `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1gRalH1mWrP" width="200" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;

  $('.music-container').html(url);
})();

function loginSpot () {
  window.location=`https://accounts.spotify.com/authorize?client_id=40fb8cf91894461186ea39861c0c1710&response_type=code&redirect_uri=http://127.0.0.1:5500/index.html&scope=user-top-read&show_dialog=true`;
}


function getUserCode() {
  const x = location.search;
  const code = x.slice(6);

  if (code.length > 1) {
    getToken(code);
  }
}
$(getUserCode);
  
function getToken (userCode) {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token",
    "method": "POST",
    "headers": {
      "Authorization": "Basic NDBmYjhjZjkxODk0NDYxMTg2ZWEzOTg2MWMwYzE3MTA6YmFkODFlZGQyN2Y5NDU3ZWI2ZWQ5NDg0MGY3M2MwMTQ=",
    },
    "data": {
      "grant_type": "authorization_code",
      "code": `${userCode}`,
      "redirect_uri": "http://127.0.0.1:5500/index.html"
    }
  }
  $.ajax(settings).done(function (response) {
    findCurrentUser(response);
    getUserPlaylist(response);
  });
}


async function findCurrentUser(response) {
  const token = response.access_token;

  const authorization = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await fetch (`https://api.spotify.com/v1/me`, authorization);
    const userjson = response.json();
    console.log(userjson);
  }
  catch(err) {
    console.log(err);
  }
}

async function getUserPlaylist (response) {
  const token = response.access_token;
  const authorization = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const response = await fetch ('https://api.spotify.com/v1/users/1224174868/playlists', authorization);
    const playlist = await response.json();
    STORE.spotifyPlaylist = playlist;
    console.log(STORE);
  }
  catch(err) {
    console.log(err);
  }
}

function appendMusicButton (uriId, token) {
  const url = `<iframe src="https://open.spotify.com/embed/playlist/${uriId}" width="200" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;

  $('.music-container').html(`${url}`);
}

function findGoodVibePlaylist(store) {
  console.log(store);
  const goodVibe = store.spotifyPlaylist.items.find(name => name.name === "Good Vibe Moodsic");
  const goodVibeId = goodVibe.id;
    appendMusicButton(goodVibeId);

  

  // const authorization = {
  //   method: 'PUT',
  //   body: JSON.stringify({context_uri: `${goodVibe.uri}`}),
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  // }

//   // try {
//   //   const response = await fetch('https://api.spotify.com/v1/me/player/play', authorization)
//   //   const responsejson = await response.json();
//   // }
//   // catch(err) {
//   //   console.log(err);
//   // }
}

function findFeelsPlaylist(store) {
  const feels = store.spotifyPlaylist.items.find(name => name.name === "Feels");
  const feelsId = feels.id;
    appendMusicButton(feelsId);
}


// async function getSpotifyArtist (response) {
//   const authorization = {
//     headers: new Headers ({
//       'Authorization': `Bearer ${response.access_token}`
//     })
//   }
//   try {
//     const newResponse = await fetch (`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/artists/0Y0QSi6lz1bPik5Ffjr8sd`, authorization);
//     const artistResponse = await newResponse.json();
//     getRelatedArtists(response, artistResponse);
//   }
//   catch(err) {
//     console.log('error', err);
//   }


// }

// async function getRelatedArtists (token, artist) {
//   const authorization = {
//     headers: {
//       'Authorization': `Bearer ${token.access_token}`
//     }
//   }

//   try {
//     const response = await fetch (`https://api.spotify.com/v1/artists/${artist.id}/related-artists`, authorization);
//     const artists = await response.json();
//     createPlayList(token, artists);
//   }
//   catch(err) {
//     console.log('error', err);
//   }
// }

// async function createPlayList (token, artists) {
//   const authorization = {
//     method: 'POST',
//     body: JSON.stringify({name: "weatherapi", public: false}),
//     headers: {
//       'Accept': `application/json`,
//       'Authorization': `Bearer ${token.access_token}`,
//       'Content-Type': `application/json`
//     }
//   }
//   try {
//     const response = await fetch ('https://api.spotify.com/v1/users/1224174868/playlists', authorization);
//     const playList = await response.json();
//     getArtistTopTracks(token, artists, playList);
//   }
//   catch(err) {
//     console.log(err);
//   }
// }

// async function getArtistTopTracks (token, artists, playList) {
//   const artistId = artists.artists.map(artistId => artistId.id).join(', ');
//   console.log(artistId);
//   const authorization = {
//     headers: {
//       'Authorization': `Bearer ${token.access_token}`,
//       'Accept': 'application/json'
//     }
//   }

//   try {
//     const response = await fetch (`https://api.spotify.com/v1/artists/1kwGj7uDO5WXVXtQLvGJr0/top-tracks?country=US`, authorization);
//     const artistTopTrack = await response.json();
//     addTracks(token, playList, artistTopTrack);
//   }
//   catch(err) {
//     console.log(err);
//   }
// }

// async function addTracks (token, playList, artistTopTrack) {
//   const uri = artistTopTrack.tracks.map(trackuri => `uris=${trackuri.uri}`).join('&');
//   console.log(playList);
//   const playListId = playList.id;
//   const authorization = {
//     method: 'POST',
//     headers: {
//       'Accept': `application/json`,
//       'Authorization': `Bearer ${token.access_token}`,
//       'Content-Type': `application/json`
//     }
//   }

//   try {
//     const response = await fetch (`https://api.spotify.com/v1/users//playlists/${playListId}/tracks?uris=spotify:track:3mof6Z6vz6gonsuIEQXank`, authorization);
//     const completePlayList = await response.json();

//     appendMusic(playListId);
//   }
//   catch(err) {
//     console.log(err);
//   }
// }


// function appendMusic (playListId) {
//   $('.sidenav').html(`<iframe src="https://open.spotify.com/embed/user/1224174868/playlist/${playListId}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`)
// }



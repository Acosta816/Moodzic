(function defaultPlayList() {
  const url = `<iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1gRalH1mWrP" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> <button class="secondSpotLogin" onclick="loginSpot()">Login with Spotify</button>`;
  
  $('.music-container').html(url);
})();

function loginSpot () {
  window.location=`https://accounts.spotify.com/authorize?client_id=40fb8cf91894461186ea39861c0c1710&response_type=code&redirect_uri=http://127.0.0.1:5500/index.html&scope=user-top-read%20user-read-private%20user-read-email&show_dialog=true`;
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
  STORE.spotifytoken = token;
  const authorization = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  
  try {
    const response = await fetch (`https://api.spotify.com/v1/me`, authorization);
    const userjson = response.json();
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
  }
  catch(err) {
    console.log(err);
  }
}
  
function appendMusicButton (uriId) {
  const url = `<iframe src="https://open.spotify.com/embed/playlist/${uriId}" width="300px" height="380px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  
  $('.music-container').html(`${url}`);

}


  
function findGoodVibePlaylist(store) {
  const goodVibe = store.spotifyPlaylist.items.find(name => name.name === "Good Vibe Moodsic");
  const goodVibeId = goodVibe.id;
  const goodVibeuri = goodVibe.uri;
  appendMusicButton(goodVibeId);

}

function findFeelsPlaylist(store) {
  const feels = store.spotifyPlaylist.items.find(name => name.name === "Feels");
  const feelsId = feels.id;
  appendMusicButton(feelsId);
}

function findGetLitPlaylist(store) {
  const lit = store.spotifyPlaylist.items.find(name => name.name === "Get Lit");
  const litId = lit.id;
  appendMusicButton(litId);
}

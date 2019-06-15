function clickNotUsingSpot () {
  $('.overlay').on('click', 'button', function (event) {
    setOverLayDisplayNone();
    setBackgroundImg();
    setMainOpa();
  })
}

$(clickNotUsingSpot);

function initLogin() {
  const x = location.search;
  const code = x.slice(6);
  if (code.length > 1) {
    setOverLayDisplayNone();
    setBackgroundImg();
    setMainOpa();
  } 
}

$(initLogin);

function clickOnIcon () {
  $('.overlay').on('click', 'img', function (event) {
    window.location=`https://accounts.spotify.com/authorize?client_id=40fb8cf91894461186ea39861c0c1710&response_type=code&redirect_uri=https://jyin25.github.io/Moodzic/&scope=user-top-read&show_dialog=true`;
  })
}

$(clickOnIcon);

function setOverLayDisplayNone () {
  $('.overlay').css('display', 'none');

}

function setBackgroundImg () {
  $('body').css('background-image', `
  url("https://cdn.dribbble.com/users/1209414/screenshots/4468735/earth.gif"),
  url("https://media.giphy.com/media/xB2huFLKz1SeMFO4w2/giphy.gif"),
  url("https://media.giphy.com/media/xB2huFLKz1SeMFO4w2/giphy.gif")`);
}

function setMainOpa () {
  $('main').css('opacity', 1);
}

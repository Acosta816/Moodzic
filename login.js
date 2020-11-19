function clickNotUsingSpot() {
  $('.overlay').on('click', 'button', function (event) {
    setOverLayDisplayNone();
    setBackgroundImg();
    setMainOpa();
  })
}

$(clickNotUsingSpot);

function initLogin() {
  const x = location.search;
  console.log(location.search);
  const code = x.slice(6);
  if (code.length > 1) {
    setOverLayDisplayNone();
    setBackgroundImg();
    setMainOpa();
  }
}

$(initLogin);

function clickOnIcon() {
  $('.overlay').on('click', 'img', function (event) {
    window.location = `https://accounts.spotify.com/authorize?client_id=40fb8cf91894461186ea39861c0c1710&response_type=code&redirect_uri=http://www.jyin25.com`;
  })
}

$(clickOnIcon);

function setOverLayDisplayNone() {
  $('.overlay').css('display', 'none');

}

function setBackgroundImg() {
  $('body').css('background-image', `
  url("images/earth.gif"),
  url("images/stars.gif"),
  url("images/stars.gif")`);
}

function setMainOpa() {
  $('main').css('opacity', 1);
}

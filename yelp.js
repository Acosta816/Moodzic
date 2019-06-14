function clickOnYelpPic () {
  $('.screens').on('click', '.yelpImg', function (event) {
    let yelpImgUrl = $(this).closest('.screens').find('.yelpImg').attr('src');
    let clickYelp = STORE.yelpData.businesses.find(arr => arr.image_url === yelpImgUrl);
    openNewWindow(clickYelp);
  })
}
 
function openNewWindow (data) {
  const yelpUrl = data.url;
  window.open(yelpUrl);
}


function init() {
  clickOnYelpPic()
}

$(init);

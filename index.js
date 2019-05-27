'use strict';

const weatherApiKey = "1e03aa605c2548559f2202802192505";

const searchURL = 'https://api.apixu.com/v1/current.json';


function formatQueryParams(parameters) {
  const queryItems = Object.keys(parameters)
    .map(key => `${key}=${parameters[key]}`)
  return queryItems.join('&');
}

async function getLocationWeather(query) {
  const weatherParams = {
    q: query,
    key: weatherApiKey,
  };

  const queryString = formatQueryParams(weatherParams)
  const finalWeatherUrl = searchURL + '?' + queryString;

  console.log(finalWeatherUrl);

  try {
    const response = await fetch (finalWeatherUrl);
    const responseJson = await response.json();
    console.log(`Here is the weather info: ${responseJson.location.name}`);
    $('.screens').html(renderHtml(responseJson));

    displayLocation(responseJson);
  } 
  catch(err) {
    console.log('error message');
  }
}

/*David ------------------------------------------------------------------------------------------------------------*/
function renderHtml(jsonObject){
  console.log('here' +jsonObject.location.name);
   
    let screenInjection = `<div class="placeAndDate">
                           <h3>${jsonObject.location.name}, ${jsonObject.location.region}<h3>
                           <p>${jsonObject.location.localtime}, ${jsonObject.current.condition.text} </p>
                           </div>
                           <div class="tempAndIcon">
                          <img src="${jsonObject.current.condition.icon}">
                          <h2>
                          </div>  
                          `



    return screenInjection;
  
}
/*David----------------------------------------------------------------------------------------------------------------------*/
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
      'Authorization': 'Bearer rKBleUfKJSjnRt4heyZ3KL_j1BOMSuKlZcev_lm1RlCDi9r3zXh-VVzOLAyHiUi3X8Kp_m4mqMtunsQwKeU6fIUJu1EogqIsZqCZP1kYYgeEqS59f1V8O3UUaKHpXHYx'
    })
  }

  try {
    const response = await fetch(yelpUrl, authorization);
    const responseJson = await response.json();
    console.log(responseJson);
    renderResult(responseJson);
  }
  catch(err) {
    console.log('error message');
  }
}

function renderResult (responseJson) {
  responseJson.map(data => console.log(data))
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const location = $('#js-location').val();
    getLocationWeather(location);
  });
}

$(watchForm);






/*David--------------------------------------------------------------------------------------------------------------------------------------*/
let appTitle = $('.le-projects'); //This code cycles through the RBB values of the shadow-text changing their colors over time

        function runColorsAnm(){
                      //orange to blood orange slowly then to white flash large radius, then back down to 
        $({'r':27,'g':213,'b':255, }).animate({'r':31,'g':255,'b':69},{queue:false,duration:3000, easing:'swing',
          step: function(now) {
            appTitle.css('text-shadow', '0 0 9px rgb('+this.r+','+this.g+','+this.b+')');
            
            // appTitle.css({r:this.r});
          }, complete:function(){
            $({'r':31,'g':255,'b':69}).animate({'r':255,'g':15,'b':15},{queue:false,duration:3000, easing:'swing',
              step: function(now) {
                  appTitle.css('text-shadow', '0 0 9px rgb('+this.r+','+this.g+','+this.b+')');
                  // appTitle.css({r:this.r});
              }, complete:function(){
                $({'r':255,'g':15,'b':15}).animate({'r':255,'g':15,'b':248},{queue:false,duration:3000, easing:'swing',
                  step: function(now) {
                      appTitle.css('text-shadow', '0 0 9px rgb('+this.r+','+this.g+','+this.b+')');
                      
                      // appTitle.css({r:this.r});
                  }, complete:function(){
                      //loop here 
                      console.log('restart');
                      runColorsAnm();
                  } //NEXT-SUB-SEQUENCE-.
                });
              } //NEXT-SUB-SEQUENCE-.
            });
          } //NEXT-SUB-SEQUENCE-.
        });
        
        };//endloop

        runColorsAnm(); //iife immediately invoked function event
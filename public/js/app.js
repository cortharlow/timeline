'use strict';

// document.onload(function(){
//   navigator.geolocation.getCurrentPosition(reportPosition, error, geo_options);
// });

window.onload = function() {
  let navLogin = document.getElementsByClassName('nav-login');
  let navSignup = document.getElementsByClassName('nav-signup');
  let container = document.getElementsByClassName('form-container');
  let login = document.getElementsByClassName('form-login');
  let signup = document.getElementsByClassName('form-signup');
  let submitLogin = document.getElementsByClassName('submit-login');
  let submitSignup = document.getElementsByClassName('submit-signup');
  let test = document.getElementsByClassName('test');
  let name = document.getElementsByClassName('first-name')

  navLogin[0].addEventListener('click', function() {
    container[0].style.display = "inline";
    signup[0].style.display = "none";
    login[0].style.display = "inline";
  });

  navSignup[0].addEventListener('click', function() {
    container[0].style.display = "inline";
    login[0].style.display = "none";
    signup[0].style.display = "inline";
  });

  document.addEventListener('click', test[0], function(e) {
    e.preventDefault();
    console.log("clicked");
    let f_name        = name[0].value;
    //  var picture     = $('#input-picture').val();
    //  var nationality = $('#input-nationality').val();
    //  var birthYear   = $('#input-birthYear').val();
    //  var description = $('#input-description').val();
    //  var created_at  = Date.now;
    function callAjax(url, callback){
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("POST", "http://localhost:3000/users/signup", true);
    xmlhttp.send({f_name: f_name});
    }
  });

  //Talke a look at my CSS Style Guide in case you need to create any divs
}

function error(error) {
  alert("Unable to retrieve your location due to "+error.code + " : " + error.message);
};

function reportPosition(position) {
  socket.emit('current location', position);
}

function generateGoogleMap(position) {
  let map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: position.coords.latitude, lng: position.coords.longitude},
    zoom: 15,
    styles: [{"stylers": [
      { hue: "#00ffe6" },
      { saturation: -20 },
      { lightness: -20 },
      { gamma: 1.51 }
    ]}]
  });
  let marker = new google.maps.Marker({
    position: {lat: position.coords.latitude, lng: position.coords.longitude},
    map: map,
    animation: google.maps.Animation.DROP,
    // label: 'H',
    icon: 'http://www124.lunapic.com/do-not-link-here-use-hosting-instead/144823781631432?5066421535'
  });

  let geocoder = new google.maps.Geocoder;
  let infowindow = new google.maps.InfoWindow;
  geocoder.geocode({'location': {lat: position.coords.latitude, lng: position.coords.longitude}}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
};

function geoFindMe(){
  let geo_options = {
    enableHighAccuracy: true,
    maximumAge : 30000,
    timeout : 27000
  };
  navigator.geolocation.getCurrentPosition(generateGoogleMap, error, geo_options);
}

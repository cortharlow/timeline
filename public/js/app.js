'use strict';

// document.onload(function(){
//   navigator.geolocation.getCurrentPosition(reportPosition, error, geo_options);
// });

window.onload = function() {
  let container = document.getElementsByClassName('form-container');
  let login = document.getElementsByClassName('form-login');

  container[0].style.display = "inline"; //This is displaying the div immediately upon loading; need to set div to display: none and then change it when the Login and Sign divs are clicked; render the appropriate forms and inject either "Login" or "Signup" into the <h1> tag present in form-container

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

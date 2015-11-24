'use strict';

document.onload(function(){
  socket = io();
  var token = '';

});

socket.on('moment found', function(moment){
  //when a new moment shows up through the socket, the following code is run.
  renderMoment(moment);
});

function renderMoment(moment) {
  let map = document.getElementById('map');
  // if moment is a location
  if (moment.type == 'location') {
    dropPin(map, moment.data);
    //render on the timeline - cort?
  }
}

function loginSucceeded(token){
  navigator.geolocation.getCurrentPosition(reportPosition, error, geo_options);
}

function error(error) {
  alert("Unable to retrieve your location due to "+error.code + " : " + error.message);
};

function reportPosition(position){
  socket.emit('current location',
  {
    token: token,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });
}

function dropPin(map, location){
  let marker = new google.maps.Marker({
    position: {lat: location.latitude, lng: location.longitude},
    map: map,
    animation: google.maps.Animation.DROP,
    // label: 'H',
    icon: 'http://www124.lunapic.com/do-not-link-here-use-hosting-instead/144823781631432?5066421535'
  });
  return marker;
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

  // let marker = new google.maps.Marker({
  //   position: {lat: position.coords.latitude, lng: position.coords.longitude},
  //   map: map,
  //   animation: google.maps.Animation.DROP,
  //   // label: 'H',
  //   icon: 'http://www124.lunapic.com/do-not-link-here-use-hosting-instead/144823781631432?5066421535'
  // });
  let marker = dropPin(map, {lat: position.coords.latitude, lng: position.coords.longitude});
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

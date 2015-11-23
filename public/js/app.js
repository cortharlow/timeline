'use strict';

function initMap() {
  $('button').click(function() {
    let currentPosition = {lat: 40.7400804, lng: -73.98978029999999}; //change this to the moment.data
    let map;
    map = new google.maps.Map(document.getElementById('map'), {
      center: currentPosition,
      zoom: 15,
      styles: [{"stylers": [
        { hue: "#00ffe6" },
        { saturation: -20 },
        { lightness: -20 },
        { gamma: 1.51 }
      ]}]
    });
    let marker = new google.maps.Marker({
      position: currentPosition,
      map: map,
      animation: google.maps.Animation.DROP,
      // label: 'H',
      icon: 'http://www124.lunapic.com/do-not-link-here-use-hosting-instead/144823781631432?5066421535'
    });
    let geocoder = new google.maps.Geocoder;
    let infowindow = new google.maps.InfoWindow;
    geocoder.geocode({'location': currentPosition}, function(results, status) {
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
  });
};

// function geoFindMe(){
//   navigator.geolocation.getCurrentPosition(success, error, geo_options);
//
//   function success(position) {
//     let map;
//     map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: position.coords.latitude, lng: position.coords.longitude},
//       zoom: 15,
//       styles: [{"stylers": [
//         { hue: "#00ffe6" },
//         { saturation: -20 },
//         { lightness: -20 },
//         { gamma: 1.51 }
//       ]}]
//     });
//     let marker = new google.maps.Marker({
//       position: {lat: position.coords.latitude, lng: position.coords.longitude},
//       map: map,
//       animation: google.maps.Animation.DROP,
//       // label: 'H',
//       icon: 'http://www124.lunapic.com/do-not-link-here-use-hosting-instead/144823781631432?5066421535'
//     });
//     let geocoder = new google.maps.Geocoder;
//     let infowindow = new google.maps.InfoWindow;
//     geocoder.geocode({'location': {lat: position.coords.latitude, lng: position.coords.longitude}}, function(results, status) {
//       if (status === google.maps.GeocoderStatus.OK) {
//         if (results[1]) {
//           infowindow.setContent(results[1].formatted_address);
//           infowindow.open(map, marker);
//         } else {
//           window.alert('No results found');
//         }
//       } else {
//         window.alert('Geocoder failed due to: ' + status);
//       }
//     });
//   };
//
//   function error(error) {
//     alert("Unable to retrieve your location due to "+error.code + " : " + error.message);
//   };
//
//   var geo_options = {
//     enableHighAccuracy: true,
//     maximumAge : 30000,
//     timeout : 27000
//   };
// }

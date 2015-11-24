'use strict';

// <<<<<<< HEAD
// =======
// // document.onload(function(){
// //
// //
// // });
//
// // document.onload(function(){
// //   navigator.geolocation.getCurrentPosition(reportPosition, error, geo_options);
// // });
//
// >>>>>>> 053b36ec0abab87537b966f6aa3128074799e9f7
window.onload = function() {
  socket = io();
  token = '';
  let navLogin = document.getElementsByClassName('nav-login');
  let navSignup = document.getElementsByClassName('nav-signup');
  let xOut = document.getElementsByClassName('x');
  let container = document.getElementsByClassName('form-container');
  let login = document.getElementsByClassName('form-login');
  let signup = document.getElementsByClassName('form-signup');
  let submitLogin = document.getElementsByClassName('submit-login');
  let submitSignup = document.getElementsByClassName('submit-signup');
  let f_nameInput = document.getElementsByClassName('first-name');
  let l_nameInput = document.getElementsByClassName('last-name');
  let emailInput = document.getElementsByClassName('email');
  let passwordInput = document.getElementsByClassName('password');

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

  xOut[0].addEventListener('click', function() {
    container[0].style.display = "none";
    login[0].style.display = "none";
    signup[0].style.display = "none";
  });

  // user login
  submitLogin[0].addEventListener('click', function(e) {
    e.preventDefault();
    // get login credentials
    let email = emailInput[0].value;
    let password = passwordInput[0].value;

    let xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
        } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        container[0].style.display = "none";
        login[0].style.display = "none";
        navLogin[0].innerHTML = "Logout";
        navSignup[0].innerHTML = "Account";
      }
    };
    xhttp.open("POST", "http://localhost:3000/users/auth", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    // xhttp.setRequestHeader("Authorization", "Bearer " + token);
    let data = JSON.stringify({
      email: email,
      password: password
    });
    xhttp.send(data);
  });

  // user signup
  submitSignup[0].addEventListener('click', function(e) {
    e.preventDefault();
    // get new user parameters
    let f_name = f_nameInput[0].value;
    let l_name = l_nameInput[0].value;
    let email = emailInput[1].value;
    let password = passwordInput[1].value;
    let created_at = Date.now;
    let updated_at = Date.now;

    let xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
        } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        container[0].style.display = "none";
        signup[0].style.display = "none";
        navLogin.innerHTML = "Logout";
        navSignup.innerHTML = "Account";
      }
    };
    xhttp.open("POST", "http://localhost:3000/users/signup", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    let data = JSON.stringify({
      f_name: f_name,
      l_name: l_name,
      email: email,
      password: password,
      created_at: created_at,
      updated_at: updated_at
    });
    xhttp.send(data);
  });
}

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
  map = new google.maps.Map(document.getElementById('map-main'), {
    center: {lat: position.coords.latitude, lng: position.coords.longitude},
    zoom: 15,
    styles: [{"stylers": [
      //{ hue: "#00ffe6" },
      { saturation: -20 },
      { lightness: -20 },
      { gamma: 1.51 }
    ]}]
  });
<<<<<<< HEAD
  let marker = new google.maps.Marker({
    position: {lat: position.coords.latitude, lng: position.coords.longitude},
    map: map,
    animation: google.maps.Animation.DROP
    // label: 'H',
    //icon: 'http://www124.lunapic.com/do-not-link-here-use-hosting-instead/144823781631432?5066421535'
  });
=======
>>>>>>> 053b36ec0abab87537b966f6aa3128074799e9f7

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

var position = geoFindMe();
generateGoogleMap(position);

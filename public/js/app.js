'use strict';
let currentToken;
let currentUser;
let currentLatitude;
let currentLongitude;
let currentUserMoments = [];
// document.onload(function(){
//   navigator.geolocation.getCurrentPosition(reportPosition, error, geo_options);
// });

window.onload = function() {

  // SET DATES function
  let timelineDate = document.getElementsByTagName('h1');
  var dateAfterToday = new Date();
  for (var i = 4; i < timelineDate.length; i++) {
    dateAfterToday.setDate(dateAfterToday.getDate() - 1);
    var dd = dateAfterToday.getDate();
    var mm = dateAfterToday.getMonth() + 1;
    var y = dateAfterToday.getFullYear();
    var someFormattedDate = dd + '/'+ mm + '/'+ y;
    timelineDate[i].innerHTML = someFormattedDate;
  }



  // GET LOCATION function
  let getLocation = function() {
    let success = function(pos) {
      currentLatitude = pos.coords.latitude;
      currentLongitude = pos.coords.longitude;
    }
    navigator.geolocation.getCurrentPosition(success);
  };
  getLocation();
  if (currentToken) {
    createMoment();
  };

  let navLogin = document.getElementsByClassName('nav-login');
  let navSignup = document.getElementsByClassName('nav-signup');
  let navHome = document.getElementsByClassName('nav-home-link');
  let navHeader = document.getElementsByClassName('nav-header');
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
  let errorMessage = document.getElementsByClassName('error');

  // SHOW LOGIN FORM OR LOGOUT
  navLogin[0].addEventListener('click', function() {
    if (this.classList.contains('nav-logout')) {
      let xhttp;
      if (window.XMLHttpRequest) {
          xhttp = new XMLHttpRequest();
          } else {
          // code for IE6, IE5
          xhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          currentToken = null;
          currentUser = null;
          currentUserMoments = [];
          navLogin[0].classList.toggle('nav-logout');
          navLogin[0].innerHTML = "Login";
          navSignup[0].innerHTML = "Signup";
          let position = geoFindMe();
          generateGoogleMap(position);
        }
      };
      xhttp.open("GET", "http://localhost:3000/users/logout", true);
      xhttp.setRequestHeader("token", currentToken);
      xhttp.send();

    } else {
      container[0].style.display = "inline";
      signup[0].style.display = "none";
      login[0].style.display = "inline";
    }
  });

  // SHOW SIGN UP FORM OR SHOW USER PAGE
  navSignup[0].addEventListener('click', function() {
    if (this.classList.contains('nav-account')) {
      console.log('needs to go to the user page'); // need to route to the user page
      navSignup[0].classList.toggle('nav-account');
    } else {
    container[0].style.display = "inline";
    login[0].style.display = "none";
    signup[0].style.display = "inline";
    }
  });

  // EXIT OUT OF FORM
  xOut[0].addEventListener('click', function() {
    container[0].style.display = "none";
    login[0].style.display = "none";
    signup[0].style.display = "none";
  });

  // USER LOGIN
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
    xhttp.onreadystatechange = function(event) {
      if (xhttp.status == 401) {
        errorMessage[0].innerHTML = 'Error: Invalid Credentials';
      }
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        currentToken = (JSON.parse(event.currentTarget.response)).token;
        currentUser = (JSON.parse(event.currentTarget.response)).currentUser;
        container[0].style.display = "none";
        login[0].style.display = "none";
        navLogin[0].innerHTML = "Logout";
        navLogin[0].classList.toggle('nav-logout');
        navSignup[0].innerHTML = currentUser.f_name;
        navSignup[0].classList.toggle('nav-account');
        navHeader[0].innerHTML = "<h1>" + currentUser.f_name + "'s Timeline</h1>";
        navHeader[0].style = "margin-left: 41%";
        errorMessage[0].innerHTML = '';
        emailInput[0].value = '';
        passwordInput[0].value = '';
        // createMoment();
        getUserMoments();
      }
    };
    xhttp.open("POST", "http://localhost:3000/users/auth", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    let data = JSON.stringify({
      email: email,
      password: password
    });
    xhttp.send(data);
  });

  // USER SIGNUP
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
        navLogin[0].classList.toggle('nav-logout');
        navSignup.innerHTML = "Account";
        navSignup[0].classList.toggle('nav-account');
        createMoment();
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

  // CREATE MOMENT function
  let createMoment = function() {
    let xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
        } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function(event) {
      if (xhttp.readyState == 4 && xhttp.status == 200) {

      }
    };
    xhttp.open("POST", "http://localhost:3000/moments", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    let data = JSON.stringify({
      _userId: currentUser._id,
      source: "location",
      data: {
        latitude: currentLatitude,
        longitude: currentLongitude
      },
      created_at: Date.now,
      updated_at: Date.now
    });
    xhttp.send(data);
  };

  // GET MOMENTS (set user's moments)
  let getUserMoments = function() {
    let xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
        } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function(event) {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        let allMoments = JSON.parse(event.currentTarget.response);
        allMoments.forEach(function(moment) {
          if (moment._userId === currentUser._id) {
            currentUserMoments.push(moment);
          }
        });
        generateGoogleMapOfUserMoments();
      }
    };
    xhttp.open("GET", "http://localhost:3000/moments", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
  };

  // SHOW USER MOMENTS ON MAP
  let generateGoogleMapOfUserMoments = function() {
    document.getElementById('map-main').innerHTML = '';
    let map;
    map = new google.maps.Map(document.getElementById('map-main'), {
      center: {lat: currentLatitude, lng: currentLongitude},
      zoom: 15,
      styles: [{"stylers": [
        //{ hue: "#00ffe6" },
        { saturation: -20 },
        { lightness: -20 },
        { gamma: 1.51 }
      ]}]
    });
    let markers = [];
    currentUserMoments.forEach(function(moment) {
      let marker = new google.maps.Marker({
        position: {lat: moment.data.latitude, lng: moment.data.longitude},
        map: map,
        animation: google.maps.Animation.DROP
      });
      markers.push(marker);
    });
    let bounds = new google.maps.LatLngBounds();
    let i;
    for (i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }
    map.fitBounds(bounds);
  }
}

function error(error) {
  alert("Unable to retrieve your location due to " + error.code + " : " + error.message);
};

function reportPosition(position) {
  socket.emit('current location', position);
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
  let marker = new google.maps.Marker({
    position: {lat: position.coords.latitude, lng: position.coords.longitude},
    map: map,
    animation: google.maps.Animation.DROP
    // label: 'H',
    //icon: 'http://www124.lunapic.com/do-not-link-here-use-hosting-instead/144823781631432?5066421535'
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

let position = geoFindMe();
generateGoogleMap(position);

'use strict';
let mongoose = require('mongoose');

let momentSchema = new mongoose.Schema({
  type: {type: String, required: true},
  data: {type: Object, required: true}, //need to have a duration as well
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: Date,
  updated_at: Date,
});

function setLocation() {
  function success(position) {
    let currentPosition = {};
    currentPosition.lat = position.coords.latitude;
    currentPosition.lng = position.coords.longitude;
    moment.data = currentPosition;
  };
  function error(error) {
    alert("Unable to retrieve your location due to " + error.code + " : " + error.message);
  };
  var geo_options = {
    enableHighAccuracy: true,
    maximumAge : 30000,
    timeout : 27000
  };
  navigator.geolocation.getCurrentPosition(success, error, geo_options);
};

momentSchema.pre('save', function(next) {
  let moment = this;
  if (moment.type === "location") {
    setLocation();
  }
})

let Moment = mongoose.model('Moment', momentSchema);
module.exports = Moment;

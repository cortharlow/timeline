'use strict';
let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  f_name: {type: String, required: true},
  l_name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }]
})

let User = mongoose.model('User', userSchema);

module.exports = User;

'use strict';
let mongoose = require('mongoose');

let momentSchema = new mongoose.Schema({
  type: {type: String, required: true},
  data: {
    type: {},
    // required: true
  },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  created_at: Date,
  updated_at: Date,
});


let Moment = mongoose.model('Moment', momentSchema);
module.exports = Moment;

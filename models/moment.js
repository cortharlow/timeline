'use strict';
let mongoose = require('mongoose');

let momentSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  source: {
    type: String,
    required: true,
    validate: {
      validator: function(string) {
        return string == 'location' || string == 'twitter';
      },
      message: '{string} is not a valid source type!'
    }
  },
  data: {
    type: mongoose.Schema.Types.Mixed
  },
  created_at: Date,
  updated_at: Date,
});

momentSchema.pre('save', function(next) {
  let moment = this;
  if (this.source == 'location') {
    if (typeof this.data.latitude === 'number' && typeof this.data.longitude === 'number') {
      next();
    }
  }
  if (this.source == 'twitter') {
    if (typeof this.data._tweetId === 'number') {
      next();
    }
  }
});

let Moment = mongoose.model('Moment', momentSchema);
module.exports = Moment;

'use strict';
let mongoose = require('mongoose');
var bcrypt = require('bcrypt'); //*************

//************

User.pre('save', (next) => {
  let user = this;
  bcrypt.genSalt(12, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      if (err) return next(err);
      user.password = hashedPassword;
      next();
    })
  })
})

function authenticate(req, res) {
  bcrypt.compare(req.body.user.password, currentUser.password, (err, same) => {
    if (err) throw err;
    if (same) redirect_to
  })
}

//************

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

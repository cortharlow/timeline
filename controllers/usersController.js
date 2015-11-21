'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');

router.route('/signup')
  .post((req, res, next) => {
    let newUser = new User(req.body);
    newUser.save((err, createdUser) => {

    })
    next();
  })

  module.exports = router;

'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');

router.route('/')
  .post((req, res, next) => {
    let newUser = new User(req.body);
    newUser.save((err, createdUser) => {

    })
    next();
  })

  /////////////////////////

router.route('/login')
  .post((req, res, next) => {
    let userParams = req.body.user;

    User.findOne({email: userParams.email}, (err, currentUser) => {
      if (err) throw err;


    })
    next();
  })


  /////////////////////////

module.exports = router;

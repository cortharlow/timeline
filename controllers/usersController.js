'use strict';
let express = require('express');
let router = express.Router();
let User = require('../models/user');

router.route('/signup')
  .post(function (req, res, next) {
    let newUser = new User(req.body)
    newUser.save((err) => {
      if (err){
        res.send(err);
      }
      res.send(newUser)
      next();
    })
  })

router.route('/user/:id')
  .get((req, res, next) => {
    User.find({_id: req.params.id}, function(err, user){
      if (err) {
        res.send(err)
      }
      res.send(user)
      next();
    })
  })

  .put()

  module.exports = router;

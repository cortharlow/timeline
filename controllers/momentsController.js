'use strict';
let Moment = require('../models/moment');

function create(req, res){
  let newMoment = new Moment();
  newMoment.type = 'moment';
  //get the user id
  
  newMoment.userId = user._id
  newMoment.save((err) => {
    if (err){
      res.status(401).send(err);
    } else {
    res.status(200).send(newMoment) //we don't necessarily want to send anything when it saves, right?
    }
  })
}

function fetch(req, res){
  Moment.find({}, function(err, moments){
    res.send(moments);
  })
}

function update(req, res){
  let userParams = req.body.user;
  User.findOne({ email: userParams.email }, function(err, user) {
    user.update(
      { email: userParams.email },
      { email: userParams.newEmail, name: userParams.newName },
      function(err, user){
        res.send(user);
      });
  });
}

function destroy(req, res){
  let userParams = req.body.user;
  User.findOne({ email : userParams.email }, function (err, user) {
    if (err) {
      return;
    }
    user.remove(function (err) {
      res.send({"record" : "deleted"});
    });
  });
}

module.exports = {
  create: create,
  fetch: fetch,
  update: update,
  destroy: destroy,
}

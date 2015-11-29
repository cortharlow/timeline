'use strict';
let jwt = require('jsonwebtoken');
let User = require('../models/user');
const secret = "napcahmpc";

function create(req, res){
  let newUser = new User(req.body);

  newUser.save(function(err) {
    if (err){
      res.status(401).send(err);
    } else {
    res.status(200).send({token: jwt.sign(newUser, secret)})
    }
  })
}

function fetch(req, res){ //May not need this function -- need to transform data as results show password
  User.find({}, function(err, users){
    res.send(users);
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

function auth(req, res){
  var userParams = req.body;
  console.log(userParams);
  if (userParams.email == undefined || userParams.password == undefined)
  return res.status(401).send({message: "Incorrect Login Information"});

  User.findOne({ "email": userParams.email }, function(err, user) {
    // debugger;
    if(err) {
      throw err;
    }
    console.log(user);
    if (user)
    {
      user.authenticate(userParams.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return res.status(200).send({message: "Valid Credentials", token: jwt.sign(user, secret)});
        } else {
          return res.status(401).send({message: "Invalid Credentials"});
        }
      });
    } else {
      return res.status(401).send({message: "User is null"});
    }
  });
}

module.exports = {
  create: create,
  fetch: fetch,
  update: update,
  destroy: destroy,
  auth: auth
}

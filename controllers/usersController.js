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
  let userParams = req.body;
  if (userParams.email == undefined || userParams.password == undefined) {
    return res.status(401).send({message: "Incorrect Login Information"});
  }
  User.findOne({ email: userParams.email }, function(err, user) {
    if (user == null) {
      return res.status(401).send({message: "Invalid Credentials"});
    } else {
      user.authenticate(userParams.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return res.status(200).send({message: "Valid Credentials", token: jwt.sign(user, secret), currentUser: user});
        } else {
          return res.status(401).send({message: "Invalid Credentials"});
        }
      });
    }
  });
}

function logout(req, res) {
  console.log(req.headers.token);
  res.status(200).send();
  // res.status(200).send();
  // console.log(user.token);
  // if (utils.expire(req.headers)) {
  //   delete req.user;
  //   return res.status(200).json({
  //       "message": "User has been successfully logged out"
  //   });
  // } else {
  //   return new UnauthorizedAccessError("401");
  // }
}

module.exports = {
  create: create,
  fetch: fetch,
  update: update,
  destroy: destroy,
  auth: auth,
  logout: logout
}

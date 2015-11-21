'use strict';
let jwt = ('jsonwebtoken');
let User = require('../models/user');
const secret = "napcahmpc";

function create(req, res){
  console.log(req.body.user);
  let newUser = new User(req.body.user);

  newUser.save((err) => {
    if (err){
      res.status(401).send(err);
    } else {
    res.status(200).send(newUser)
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
  let userParams = req.body.user;
  console.log(req.body.user);
  if (userParams.email == undefined || userParams.password == undefined)
  return res.status(401).send({message: "Incorrect Login Information"});

  User.findOne({ email: userParams.email }, function(err, user) {
    console.log(user);
    user.authenticate(userParams.password, function (err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        return res.status(200).send({message: "Valid Credentials", token: jwt.sign(user, secret)});
      } else {
        return res.status(401).send({message: "Invalid Credentials"});
      }
    });
  });
}

module.exports = {
  create: create,
  fetch: fetch,
  update: update,
  destroy: destroy,
  auth: auth
}

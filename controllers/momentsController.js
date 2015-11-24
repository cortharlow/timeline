'use strict';
let Moment = require('../models/moment');

function create(req, res){
  let newMoment = new Moment();
  // mongoose.find({})//userid where token = req.token
  // newMoment.userId = user._id
  newMoment.save(function(err) {
    if (err){
      res.status(401).send(err);
    } else {
      res.status(200).send(newMoment)
    }
  });
}


module.exports = {
  create: create
}

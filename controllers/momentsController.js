'use strict';
let Moment = require('../models/moment');

function create(req, res){
  let newMoment = new Moment(req.body);
  newMoment.save(function(err) {
    if (err){
      console.log(err);
      res.status(400).send(err);
    } else {
      res.status(200).send(newMoment)
    }
  });
}

function fetch(req, res) {
  Moment.find({}, function(err, moments) {
    res.send(moments);
  });
}

function update(req, res) {
  let momentParams = req.body.moment;
  Moment.findOne({_id: momentParams.id }, function(err, user) {
    moment.update(
      {},
      function(err, moment) {
        res.send(moment);
      });
  });
}

function destroy(req, res) {
  let momentParams = req.body.moment;
  Moment.findOne({ _id: momentParams.id }, function(err, moment) {
    if (err) {
      return;
    }
    moment.remove(function (err) {
      res.send({"record" : "deleted"});
    });
  });
}

module.exports = {
  create: create,
  fetch: fetch,
  update: update,
  destroy: destroy
}

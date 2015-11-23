'use strict';
let express = require('express');
let router = express.Router();
let user = require('../controllers/usersController')
let moment = require('../controllers/momentsController');
let expressJWT = require('express-jwt');
const secret = "napcahmpc";

router.route('/moment')
  .all(expressJWT({
    secret: secret,
    userProperty: 'auth'
  }))
  .get(moment.fetch) //
  // .fetch specific 
  .post(moment.create)
  .put(moment.update)
  .delete(moment.destroy);

module.exports = router;


//need to figure out how to limit some of this stuff to the specific user

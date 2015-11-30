'use strict';
let express = require('express');
let router = express.Router();
let user = require('../controllers/usersController')
let moment = require('../controllers/momentsController');
let expressJWT = require('express-jwt');
const secret = "napcahmpc";

router.route('/')
  .get(moment.fetch)
  // .all(expressJWT({
  //   secret: secret,
  //   userProperty: 'auth'
  // }))
  .put(moment.update)
  .delete(moment.destroy)
  .post(moment.create);

module.exports = router;

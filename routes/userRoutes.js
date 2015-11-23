'use strict';
let express = require('express');
let router = express.Router();
let user = require('../controllers/usersController')
let expressJWT = require('express-jwt');
const secret = "napcahmpc";

router.route('/')
  .all(expressJWT({
    secret: secret,
    userProperty: 'auth'
  }))
  .get(user.fetch)        //Protected
  .put(user.update)       //Protected
  .delete(user.destroy);  //Protected

router.route('/auth')
  .post(user.auth);

router.route('/signup')
  .post(user.create);

module.exports = router;

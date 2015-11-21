'use strict';
let express = require('express');
let router = express.Router();
let user = require('../controllers/usersController')
let expressJWT = require('express-jwt');
const secret = "napcahmpc";

router.route('/user')
  .all(expressJWT({
    secret: secret,
    userProperty: 'auth'
  }))
  .get(user.fetch)        //Protected
  .put(user.update)       //Protected
  .delete(user.destroy);  //Protected

router.route('/user/auth')
  .post(user.auth);

router.route('/user/signup')
  .post(user.auth);

module.exports = router;

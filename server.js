'use strict';
let express = require('express');
let app = express();
var bodyParser = require('body-parser');
app.use(express.static('./public'));


let mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/timeline');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', (callback) => {
  console.log('mongoose connection');
});

let users = require('./controllers/usersController');
app.use('/', users);

app.listen(8888);

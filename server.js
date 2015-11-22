'use strict';
let express = require('express');
let logger = require('morgan');
let path = require('path');
let bodyParser = require('body-parser');

//Require routes
let userRoutes = require('./routes/userRoutes');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

let User = require('./models/user');

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/timeline');

/* get notified that the database has connected */
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Database Connection Established');
});

app.use('/', userRoutes);

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
});

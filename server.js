'use strict';
let express = require('express');
let logger = require('morgan');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

//Require routes
let userRoutes = require('./routes/userRoutes');
let momentRoutes = require('./routes/momentRoutes');


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

io.on('connection', function(client) {
  console.log('Client connected');

//   client.on('current location', function(location){
//     //save location to db under client name
//     // User.findById(client.id, function(err, user) {
//     //   if err throw err;
//     //   user.events.push(location);
//     //   user.save();
//     // });
//   });
//   client.on('new moment', function(moment){
//     //for adding a moment
//     //save moment for user
//     io.emit('moment added', moment);
//   });
//
});

app.use('/users', userRoutes);
// app.get('/moments', function(req, res){
//   Moment.find(null, function(err, moments){
//     io.emit('moment found', moments)
//   })
// })
app.use('/moments', momentRoutes);

server.listen(3000, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
});


//
// // seperate file
// module.exports = function(io) {
//   io.on('blah')
// };
//
// //server.js
// var ioStuff = require('./iofile.js')(io)

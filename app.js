var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var methodOverride = require('method-override');
var http = require("http");
var server = http.createServer(app);
var router = express.Router();
var app = express();
var session = require('express-session');
var passport = require('passport');

mongoose.connect('mongodb://localhost:27017/sandPit');

//app.get('*', function(req, res) {
//  res.redirect('/#' + req.originalUrl);
//});
//Needed for passport; copy after var app has been initialized
//configure passport object through config/passport.js
require('./config/passport')(passport);

app.use(session({ secret: 'zasentodalaboca', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.set('view engine', 'jade');
app.set('views', 'public/views');

//This goes before the routes are called
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(cookieParser());
app.use(methodOverride());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/public'));


// Cargamos los endpoints
require('./routes/index.js')(app);

app.listen(5000, function () {
  console.log('Listening on port 5000...');
});
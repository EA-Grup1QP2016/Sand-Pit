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

mongoose.connect('mongodb://localhost:27017/sandPit');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/bower_components',  express.static(__dirname + '/public/bower_components'));


// Cargamos los endpoints
require('./routes/index.js')(app);
require('./app/routes.js')(app);

app.listen(5000, function () {
    console.log('Listening on port 5000...');
});
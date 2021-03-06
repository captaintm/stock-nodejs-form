'use strict';

// CALL NODE PACKAGES
var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    morgan            = require('morgan'),
    mongoose          = require('mongoose'),
    config            = require('./config'),
    path              = require('path');

// APP CONFIGURATION
// use body parser so we can grap information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \ Authorization');
  next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to the database
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// API ROUTES -------------------------
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCHALL ROUTE ----------------
// SEND USERS TO THE FRONTEND ---------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER
app.listen(config.port);
console.log('Magic happens on port ' + config.port);

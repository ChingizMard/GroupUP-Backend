/*
 * Entry point for the backend
 *
 * Useful links for this application:
 *  *Mongoose documentation: http://mongoosejs.com/docs/index.html
 */

const express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  config = require('./config'),
  routes = require('./routes'),
  session = require('express-session'),
  cookieParser = require('cookie-parser');;

// Connect to MongoDB using a url from the config file
mongoose.connect(config.database.url);

mongoose.connection.on('error', function() {
  console.log('MongoDB connection error');
});
mongoose.connection.on('connecting', function() {
  console.log('connecting to MongoDB...')
});
mongoose.connection.on('connected', function() {
  console.log('successfully connected to MongoDB')
});

// Ensure that mongoose's promise system is the same as the global promise system
mongoose.Promise = global.Promise;

// Create Express app
var app = express();


 ////////////////////////////////////////////////////
 // Express App configuration and middleware setup //
 ////////////////////////////////////////////////////


app.set('port', config.server.port);
app.use(cookieParser());
app.use(express.json()); // JSON middleware; https://expressjs.com/en/api.html#express.json
app.use(express.static(path.join(__dirname, 'public')));// Static resources (e.g: CSS files)
app.use('/', routes); // Add router middleware
app.use(session({
  // See https://github.com/expressjs/session#options for documentation
  secret: config.server.secret,
  maxAge: 1000 * 60 * 15, // 15 minutes
  resave: true,
  saveUninitialized: true
}));

// Have the app listen on a port. The app is now ready to be interfaced with
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

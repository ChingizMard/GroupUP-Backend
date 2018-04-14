var express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  config = require('./config');

// Connect to MongoDB using a url from the config file
mongoose.connect(config.database.url);

mongoose.connection.on('error', function() {
  console.log('mongodb connection error');
});
mongoose.connection.on('connecting', function() {
  console.log('mongoose is connecting...')
});
mongoose.connection.on('connected', function() {
  console.log('mongodb has successfully connected')
});

// Ensure that mongoose's promise system is the same as the global promise system
mongoose.Promise = global.Promise;

// Create Express app
var app = express();


 ////////////////////////////////////////////////////
 // Express App configuration and middleware setup //
 ////////////////////////////////////////////////////


app.set('port', config.server.port);
app.use(express.json()); // JSON middleware; https://expressjs.com/en/api.html#express.json

// Have the app listen on a port. The app is now ready to be interfaced with
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

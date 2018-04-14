var User = require('../models/user.js'),
  mongoose = require('mongoose'),
  sanitize = require('mongo-sanitize'),
  bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Signs the user up.
 *
 * This function validates user input and then creates a new user document
 * inside of the database
 * @param  {Object}   data      An object containing the data required to make
 *                              the new user
 * @param  {Function} callback  The callback function
 * @return {Void}               Nothing
 */
module.exports.signup = function(data, callback) {
  if (!validate(data)) {
    callback(Error('You must pass a username and a password.'), false);
  }

  /*
   * Check for an existing user with the requested username
   * to prevent two users from having the same username
   */
  User.find({
    'username': data.username
  }).exec(function(err, user) {
    if (err) {
      callback('An error occured on user lookup.', null);
      return;
    }
    if (user) {
      callback('A user with this username already exists.', null);
      return;
    }

  });

  // Create the new user document
  User.create({
    username: data.username,
    password: bcrypt.hashSync(data.password, saltRounds),
    age: data.age,
    description: data.description,
    acceptedActivities: [],
    lastSeen: Date.now()
  }, function(err, newUser) {
    if (err) {
      callback(err, null);
      return;
    }

    // New user created successfully, run callback and end function
    callback(null, newUser);
    return;
  });
}

module.exports.signin = function(data, callback) {

}

module.exports.update = function(data, callback) {

}

/**
 * Validates and sanitizes the data object passed to all userController functions.
 * @param  {Object} data the user data object
 * @return {Boolean}      true if the data is valid, false otherwise
 */
var validate = function(data) {
  if (!data.username || !data.password) {
    return false;
  }

  // Sanitize any strings, just in case
  data.username = sanitize(data.username);
  data.password = sanitize(data.password);

  //TODO add any additional validation we need
  return true;
}

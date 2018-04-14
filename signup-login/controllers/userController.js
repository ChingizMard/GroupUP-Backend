var User = require('../models/user.js'),
  mongoose = require('mongoose'),
  sanitize = require('mongo-sanitize'),
  bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * Signs the user up for the service.
 *
 * This function validates user input and then creates a new document
 * inside of the user collection.
 *
 * The data object is as follows:
 *
 *      Name        Type    Required             Description
 * ------------- -------- ---------- ----------------------------------
 * username      String   Yes        The user's username
 * password      String   Yes        The user's password in plaintext
 * age           Number   No         The user's age
 * description   String   No         The user's profile description
 *
 *
 * The callback function is as follows:
 *
 *  Parameters                  Description
 * ------------ --------------------------------------------
 * err          Any error object thrown during creation.
 *              If no errors occurred, this object is null
 *
 * user         The new user document created
 *
 * @param  {Object}   data      An object containing the data required to make
 *                              the new user
 * @param  {Function} callback  The error-first callback function
 * @return {Void}               Nothing
 */
module.exports.signup = function(data, callback) {
  // Run validation checks on the input
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

/**
 * Logs a user in.
 *
 * Searches the database for the requested user and sends it to the
 * user defined callback function.
 *
 * The data object is as follows:
 *
 *      Name        Type    Required             Description
 * ------------- -------- ---------- ----------------------------------
 * username      String   Yes        The user's username
 * password      String   Yes        The user's password in plaintext
 *
 *
 * The callback function is as follows:
 *
 *  Parameters                  Description
 * ------------ --------------------------------------------
 * err          Any error object thrown during creation.
 *              If no errors occurred, this object is null
 *
 * user         The now logged in user
 *
 * @param  {Object}   data     Object containing user lookup data
 * @param  {Function} callback [description]
 * @return {Void}            None
 */
module.exports.login = function(data, callback) {
  // Run validation checks on the input
  if (!validate(data)) {
    callback(Error('You must pass a username and a password.'), false);
  }

  // Look up the username in the database for the corresponding user document
  User.findOne({
    'username': data.username
  }, function(err, user) {
    if (err) {
      callback(err, null);
      return;
    }

    // If no user with that username exists, throw an error
    if (!user) {
      callback(new Error('Incorrect username or password'), null);
      return;
    }

    // If the password is incorrect, throw an error
    let passEqual = bcrypt.compareSync(data.password, user.password);
    if (!passEqual) {
      callback(new Error('Incorrect username or password'), null);
      return;
    }

    // Update the lastSeen attribute to now and run the callback function
    user.lastSeen = Date.now();
    user.save(callback);

  });
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

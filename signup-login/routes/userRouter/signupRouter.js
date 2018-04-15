const router = require('express').Router();
const userController = require('../controllers/userController');

/**
 * API call to sign up a new user.
 *
 * The signup JSON response is structured as follows:
 *
 * ┌──────────┬─────────────────────────────────────────────────────┐
 * │ Key Name │                     Description                     │
 * ├──────────┼─────────────────────────────────────────────────────┤
 * │ success  │ True if the signup was successful, false otherwise  │
 * │ message  │ The error message if and only if an error is thrown │
 * └──────────┴─────────────────────────────────────────────────────┘
 *
 * @type {Boolean}
 */
router.route('/')
  .post(function(req, res) {
    userController.signup(req.body, function(err, user) {
      if (err) {
        res.status(400).json({
          success: false,
          message: err
        });
      } else {
        //TODO make session a randomly generated token
        req.session.user = user;
        res.status(200).json({
          success: true
        });
      }
    });

  });
module.exports = router;

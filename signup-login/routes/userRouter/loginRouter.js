const router = require('express').Router();
const userController = require('../controllers/userController');

/**
 * API call to log the user in.
 *
 * The login JSON response is structured as follows:
 *
 * ┌──────────┬─────────────────────────────────────────────────────┐
 * │ Key Name │                     Description                     │
 * ├──────────┼─────────────────────────────────────────────────────┤
 * │ success  │ True if the login was successful, false otherwise   │
 * │ message  │ The error message if and only if an error is thrown │
 * └──────────┴─────────────────────────────────────────────────────┘
 *
 * @type {Boolean}
 */
router.route('/')
  .post(function(req, res) {
    userController.login(req.body, function(err, user) {
      if (err) {

        /*
         * There was an error thrown while logging in, send back the
         * failiure status
         */
        res.status(400).json({
          success: false,
          message: err
        });

      } else {

        /*
         * Login was successful, add the user document to the session and return
         * a successful status
         */
        req.session.user = user; //TODO make session a randomly generated token
        res.status(200).json({
          success: true
        });
      }
    });

  });

module.exports = router;

const router = require('express').Router();
const userController = require('../../controllers/userController');


/**
 * API call to log the user out.
 *
 * Users are logged out by removing the user object from their session.
 *
 * The signout JSON response is structured as follows;
 *
 * ┌──────────┬────────────────────────────────────────────────────┐
 * │ Key Name │                    Description                     │
 * ├──────────┼────────────────────────────────────────────────────┤
 * │ success  │ True if the signup was successful, false otherwise │
 * └──────────┴────────────────────────────────────────────────────┘
 *
 */
router.route('/')
  .post(function(req, res) {

    if(req.session.user)
      delete req.session.user;

    // This won't ever not work, so always return true
    res.json({success: true});
  });
module.exports = router;

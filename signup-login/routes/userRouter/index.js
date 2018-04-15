const router = require('express').Router();

router.use('/signup', require('./signupRouter'));
router.use('/login', require('./loginRouter'));
router.use('/signout', require('./signupRouter'));

module.exports = router;

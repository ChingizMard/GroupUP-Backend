const router = require('express').Router();

// User routes
router.use('/user', require('./userRouter'));

// Activity routes
router.use('/activity', require('./activityRouter'));

module.exports = router;

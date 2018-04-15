const router = require('express').Router();

router.use('/signup', require('./signupRouter'));
router.use('/login', require('./loginRouter'));
router.use('/signout', require('./signupRouter'));
router.use('/getAttendedActivities', require('./getAttendedActivitiesRouter'));

module.exports = router;

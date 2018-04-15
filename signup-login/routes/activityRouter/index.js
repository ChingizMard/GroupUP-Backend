const router = require('express').Router();

router.use('/find_activity', require('./findActivityRouter'));
router.use('/create_activity', require('./createActivityRouter'));
router.use('/add_attendee', require('./addAttendeeRouter'))

module.exports = router;

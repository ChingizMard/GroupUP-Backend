const router = require('express').Router();

router.use('/find_activity', require('./findActivityRouter'));
router.use('/create_activity', require('./createActivityRouter'));

module.exports = router;

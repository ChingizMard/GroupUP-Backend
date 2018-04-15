const router = require('express').Router();

router.use('/find_activity', require('./findActivityRouter'));

module.exports = router;

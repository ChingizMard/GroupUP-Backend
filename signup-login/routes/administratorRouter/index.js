const router = require('express').Router();

router.use('/system', require('./systemRouter'));

module.exports = router;

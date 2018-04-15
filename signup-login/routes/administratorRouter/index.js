const router = require('express').Router();

//TODO prevent randos from being able to access this
router.use('/system', require('./systemRouter'));

module.exports = router;

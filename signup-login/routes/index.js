const router = require('express').Router();

router.route('/')
.get(function(req, res, next){
  res.status(200).json({message: 'GET received at "/"'});
  console.dir(req.body);
  next();
}).post(function(req, res, next){
  res.status(200).json({message: 'POST received at "/"'});
  next();
});


// User routes
router.use('/user', require('./userRouter'));

// Activity routes
router.use('/activity', require('./activityRouter'));

// Administrator routes
router.use('/administrator', require('./administratorRouter'));

// 404
router.use(function(req, res){
  res.status(404).json({success: false, message: '404: No API calls could be found at the url '+req.url});
});

module.exports = router;


module.exports = router;

const express = require('express'),
  userController = require('../controllers/userController')
  router = express.Router();

router.route('/')
.post(function(req, res){
  userController.signup(req.body, function(err, user){
    if(err){
      res.status(400).json({success: false});
    } else{
      //TODO make session a randomly generated token
      req.session.user = user;
      res.status(200).json({success: true});
    }
  });

});
module.exports = router;

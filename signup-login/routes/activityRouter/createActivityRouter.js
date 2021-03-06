const router = require('express').Router();
const Activity = require('../../models/activity');
var User = require('../../models/user.js')

router.route('/')
  .post(function(req, res) {
    if(req.session.user){
    // TODO validate input from req.body
    var data = req.body;
    data.hostUser = req.session.user._id;
    data.attendees = req.session.user.attendees || [req.session.user._id];
    data.description = data.description || "No description :(";
    //data.loc = req.body.loc || [];

    var newActivity = new Activity(data);
    newActivity.save(function(err, activity) {
      if (err) {
        res.status(400).json({
          success: false,
          message: err
        });
      } else {
        User.findOne({'_id': req.session.user._id}, function(err,user){
          if (err){
            console.log("Error thrown while appending created id to host accepted activities");
            res.status(400).json({
              success: false,
              message: err
            });
          }else{
            console.log("Acceptied activities - " + user.acceptedActivities);
            console.log("ID - " + newActivity._id);
            user.acceptedActivities.push(newActivity._id);
            res.status(200).json({
              success: true
            });
          }
        });
      }
    });
  } else {
    res.status(401).json({success: false, message: 'You must be logged in to access this functionality.'});
  }
  });

module.exports = router;

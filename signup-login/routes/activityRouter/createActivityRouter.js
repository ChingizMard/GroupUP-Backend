const router = require('express').Router();
const Activity = require('../../models/activity');

router.route('/')
  .post(function(req, res) {
    if(req.session.user){
    // TODO validate input from req.body
    var data = req.body;
    data.hostUser = req.session.user._id;
    data.attendees = req.session.user.attendees || [];
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
        res.status(200).json({
          success: true
        });
      }
    });
  } else {
    res.status(401).json({success: false, message: 'You must be logged in to access this functionality.'});
  }
  });

module.exports = router;

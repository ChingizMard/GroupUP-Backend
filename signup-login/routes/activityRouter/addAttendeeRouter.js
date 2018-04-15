const router = require('express').Router();
const Activity = require('../../models/activity');
const ObjectId = require('mongoose').Types.ObjectId;

router.route('/')
  .post(function(req, res) {
    // This is right about where I discovered promises :T
    Activity
      .findOne({
        "_id": new ObjectId(req.body.activityID)
      })
      .exec()
      .then(function(activity) {
        console.log(req.body);
        activity.addAttendee(new ObjectId(req.body.userID), function(err, activity) {
          if (err) {
            res.status(400).json({
              success: false,
              message: err
            });
          } else {
            res.status(200).json({
              success: true,
            })
          }
        });
      })
      .catch(function(err) {
        res.status(200).json({
          success: false,
          message: err
        });
      })
  });

module.exports = router;

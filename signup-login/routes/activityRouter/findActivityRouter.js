const router = require('express').Router();
const Activity = require('../../models/activity');

router.route('/')
  .post(function(req, res) {
    Activity.findAvailableActivities(req.body, function(err, activities) {
      if (err)
        res.status(400).json({
          success: false,
          message: err
        });
      else {
        res.status(200).json({
          success: true,
          activities: activities
        });
      }
    });
  });

module.exports = router;

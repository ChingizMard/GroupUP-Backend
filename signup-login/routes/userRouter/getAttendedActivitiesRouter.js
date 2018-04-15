const router = require('express').Router();
const User = require('../../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const Activity = require('../../models/activity');

router.route('/').post(function(req, res){
	console.log(req.session.user._id)
	// User.findOne({
	// 	"_id": new ObjectId(req.session.user._id)
	// })
	// 	.exec()
	// 	.then(function(user) {
	// 		res.status(200).json({
	// 			success: true,
	// 			message: user.acceptedActivities
	// 		})
	// 		console.log(user.acceptedActivities);
	// 	})
	// 	.catch(function(err) {
	// 		res.status(400).json({
	// 			success: false,
	// 			message: err
	// 		});
	// 	})
	Activity.findAttendedActivities(req.session.user._id, function(err, activities){
		if (err){
			res.status(400).json({
				success: false,
				message: err
			});
		}else{
			res.status(200).json({
				success: true,
				activities: activities
			});
		}
	});

});


module.exports = router;

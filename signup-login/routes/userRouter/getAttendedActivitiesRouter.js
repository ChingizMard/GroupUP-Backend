const router = require('express').Router();
const User = require('../../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

router.route('/').post(function(req, res){
	console.log(req.session.user._id)
	User.findOne({
		"_id": new ObjectId(req.session.user._id)
	})
		.exec()
		.then(function(user) {
			console.log(user.acceptedActivities);
		})
		.catch(function(err) {
			res.status(200).json({
				success: false,
				message: err
			});
		})
})

module.exports = router;

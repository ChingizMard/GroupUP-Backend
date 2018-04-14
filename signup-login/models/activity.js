var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  activitySchema;

activitySchema = new Schema({
  hostUser: Schema.Types.ObjectId,
  startTime: Date,
  endTime: Date,
  name: String,
  description: String,
  attendees: [Schema.Types.ObjectId],

});

/**
 * Adds a user to the activity's attendee list.
 *
 * This method also updates the user's activity list.
 *
 * The callback function is as follows:
 *
 *  Parameters                               Description
 * ------------ ---------------------------------------------------------------------
 * err          Any error object thrown. If no errors occurred, this object is null
 * user         The user document who is now attending this activity
 *
 * @param  {User}   user     The user document to add to the attendee list
 * @param  {Function} callback The callback function detailed above
 * @return {Void}            None
 */
activitySchema.methods.addUserToAttendees = function(user, callback){
  this.attendees.append(user._id)
  this.save(function(err, activity){
    if(err)
      callback(err, null);
  });

  user.acceptedActivities.append(this._id);
  user.save(callback);
}
// Turn the schema into a model and export it
module.exports = mongoose.model('Activity', activitySchema);

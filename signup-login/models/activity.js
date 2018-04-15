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
  maxAttendees: Number,
  loc: [Number],
  chat: Schema.Types.ObjectId

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

/**
 * Finds available events near the user.
 *
 * An available event is defined as an event where the number of attendees
 * does not exceed the maximum number of allowed attendees.
 *
 * The area object is specified as follows:
 *
 * ┌────────┬──────────┬──────────┬────────────────────────────────────────────────────────────────────────┐
 * │  Name  │   Type   │ Required │                              Description                               │
 * ├────────┼──────────┼──────────┼────────────────────────────────────────────────────────────────────────┤
 * │ center │ [Number] │ Yes      │ The location to check from as [longitude, latitude].                   │
 * │        │          │          │ Must have a length of exactly 2.                                       │
 * │ radius │ Number   │ Yes      │ The radius to search in degrees. Each degree is approximately 69 miles │
 * │ unique │ Boolean  │ No       │ Defaults to true. Specifies if entries should be unique.               │
 * └────────┴──────────┴──────────┴────────────────────────────────────────────────────────────────────────┘
 *
 * The callback function is specified as follows:
 *
 * ┌────────────┬──────────────────────────────────────────────┐
 * │ Parameters │                 Description                  │
 * ├────────────┼──────────────────────────────────────────────┤
 * │ err        │ Any err object thrown during the query.      │
 * │            │ Null if no errors were thrown                │
 * │ activities │ The result of the query as an activity array │
 * └────────────┴──────────────────────────────────────────────┘
 *
 * @param  {Object}   area     The object specifying the area, specified above
 * @param  {Function} callback The error-first callback function, specified above
 * @return {Void}              None
 */
activitySchema.static('findAvailableActivities', function(area, callback){
  if(!area.center || !area.radius){
    callback(new Error('You must pass the required information.'), null);
    return;
  }
  if(area.center.length != 2){
    callback(new Error('area.center must have exactly two entries.'), null);
    return;
  }
  //TODO validate area object
  return this.
  find().
  circle('loc', area).
  $where('this.attendees.length < this.maxAttendees').
  exec(callback);
})

// Turn the schema into a model and export it
module.exports = mongoose.model('Activity', activitySchema);

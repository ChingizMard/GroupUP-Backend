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

// Turn the schema into a model and export it
module.exports = mongoose.model('Activity', activitySchema);

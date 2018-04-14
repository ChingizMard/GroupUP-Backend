var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  userSchema;

userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  name: {
    first: String,
    last: String
  },
  age: Number,
  description: {type: String, default: 'No description :('},
  acceptedActivities: [Schema.Types.ObjectId],
  lastSeen: Date

});

// Turn the schema into a model and export it
module.exports = mongoose.model('User', userSchema);

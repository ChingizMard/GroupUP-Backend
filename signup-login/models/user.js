var mongoose = require('mongoose');
var Schema = mongoose.Schema,
  userSchema;

userSchema = new Schema({
  username: String,
  password: String,
  name: {
    first: String,
    last: String
  },
  age: Number,
  description: String,
  acceptedActivity: [Schema.Types.ObjectId]

});

module.exports = mongoose.model('User', userSchema);

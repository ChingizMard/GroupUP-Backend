var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  chatSchema,
  messageSchema,

  messageSchema = new Schema({
    sender: {
      type: Schema.Types.ObjectId,
      required: true
    },
    message: String,
    dateSent: {type: Date, default: Date.now()}
  });

chatSchema = new Schema({
  messages: [messageSchema]
});

// Turn the schema into a model and export it
module.exports = mongoose.model('Chat', chatSchema);

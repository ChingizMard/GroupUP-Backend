var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  chatSchema,
  messageSchema,

  messageSchema = new Schema({
    sender: {
      type: Schema.Types.ObjectId,
      required: true
    },
    message: String
  });

chatSchema = new Schema({
  messages: [messageSchema]
});

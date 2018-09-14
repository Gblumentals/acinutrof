const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

var Schema = mongoose.Schema;


var questionsSchema = new Schema({
  content: String,
  type: String,
  clientID: {
    type: Schema.Types.ObjectId,
    ref: 'Clients'
  },
  userID: String,
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: String,
  clientName: String,
  answerID: {
    type: Schema.Types.ObjectId,
    ref: 'Answers'
  }
}, { collection: 'Questions'});


module.exports = mongoose.model('Questions', questionsSchema);

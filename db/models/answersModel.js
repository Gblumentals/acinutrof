const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

let Schema = mongoose.Schema;


let answersSchema = new Schema({
  content: String,
  type: String,
  clientID: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
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
  questionID: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }
}, { collection: 'Answers' });






  // autoincrement plugin is used to increment the itemId
//toDoSchema.plugin(autoIncrement.plugin, { model: 'ToDo', field: 'itemId' });
// we need to create a model using it
module.exports = mongoose.model('Answers', answersSchema);

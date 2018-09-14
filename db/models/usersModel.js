const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

var Schema = mongoose.Schema;


var usersSchema = new Schema({
  _id: String,
  profileName: String,
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
  lastActivity: {
    type: Date,
    required: true,
    default: Date.now
  },

}, { collection: 'Users' })

module.exports = mongoose.model('Users', usersSchema);

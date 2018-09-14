const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

var Schema = mongoose.Schema;

var clientsSchema = new Schema({
  firstName: String,
  lastName: String,
  info: String,
  password: String,
  zodiac: String,
  zodiacImageURL: String,
  birthdate: Date,
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
  email: String,
  shortUserID: String,
  country: String,
  gender: String,
  // lastLogin​: Date,
  // pushTokens​: [​pushTokenSchema],​

}, { collection: 'Clients' });



module.exports = mongoose.model('Clients', clientsSchema);

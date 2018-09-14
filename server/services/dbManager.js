"user strict"

const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const Config = require('config').Config


// const todoModel = require('./db/models/todoModel')  //todo model


const DB = {
  Clients: require('../../db/models/clientsModel'),
  Users: require('../../db/models/usersModel'),
  Questions: require('../../db/models/questionsModel'),
  Answers: require('../../db/models/answersModel'),
  db: null
}



// MONGOOSE CONNECT
// ===========================================================================
// Using `mongoose.connect`...
let promise = mongoose.connect(`${Config.db.protocol}://${Config.db.address}:${Config.db.port}/${Config.db.db}`, { useNewUrlParser: true })

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('- connectted to database successfully');
});

DB.db = db

module.exports = DB

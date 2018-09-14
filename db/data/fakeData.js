process.env.UV_THREADPOOL_SIZE = 32

const mongoose = require('mongoose')
const Config = require('config').Config
const autoIncrement = require('mongoose-auto-increment')
const random = require('random-name')
const async = require('async')


const DB = {
	Clients: require('../models/clientsModel'),
	Users: require('../models/usersModel'),
	Questions: require('../models/questionsModel'),
	Answers: require('../models/answersModel')
}


mongoose.connect(`${Config.db.protocol}://${Config.db.address}:${Config.db.port}/${Config.db.db}`)

var db = mongoose.connection
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', () => {
	console.log( '+++connected to mongoose')
})


const makeUsers = (count, callback) => {
  let users = []

  for (var i = 0; i < count; i++) {
    var newUser = new DB.Users({
      _id: i,
      profileName: random.first() + ' ' + random.last(),
    })

    users.push(newUser)
  }

  async.eachOf(users, (user, i, next) => {
    console.log(i);
    user.save(next)
  }, (err) => {
    if (err) return callback(err)

    callback()
  })
}



const makeClients = (count, callback) => {
  let clients = []

  for (var i = 0; i < count; i++) {
    var newClient = new DB.Clients({
      firstName: random.first(),
      lastName: random.last()
    })

    clients.push(newClient)
  }

  async.eachOf(clients, (client, i, next) => {
    console.log(i);
    client.save(next)
  }, (err) => {
    if (err) return callback(err)

    callback()
  })
}


async.series([
	(done) => makeClients(10, done),
	(done) => makeUsers(10, done)
], (err) => {
  if (err) throw err

  db.close()

  console.log('---- Inserted fake data successfully');
})

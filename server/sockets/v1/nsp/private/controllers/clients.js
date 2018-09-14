const manager = require('../../../../../services/swManager')
const DB = require('../../../../../services/dbManager')


const ctrl = {
  userHistory: (data) => {
    let user = data.user
    let client = data.client

    let pkg = {
      activeUser: user,
      chain: [],
      unAnsweredQuestion: {}
    }

    let session = manager.getConnection('private', 'clients', client)

    DB.Users.findOne({ _id: client._id }, '' , (err,result) => {
      if (err) throw err

      session.connection.socket.emit('userHistory', pkg)
    })
  },

  addQuestion: (data) => {
    let q = {
      content: data.content,
      userID: data.user._id,
      clientID: data.client._id,
      cType: 'question'
    }

    let session = manager.getConnection('private', 'clients', data.client)

    let Question = new DB.Questions(q)

    Question.save((err,result)=> {
      if (err) { throw err }
      else {

        session.connection.socket.emit('addQuestion', { unansweredQuestion: q })
      }
    })
  },
}


module.exports = ctrl

process.env.UV_THREADPOOL_SIZE = 32

if (!process.env.NODE_ENV) require('dotenv').config({ silent: true })


if (process.env.NODE_ENV !== 'test') {
  console.log('FATAL: Please set NODE_ENV to "test" when testing!')
  return
}


const DB = require('../../services/dbManager')
const assert = require('assert')
const should = require('should')
const io = require('socket.io-client')
let server



describe('Fortunica server tests', function() {
  this.timeout()

  let client // client which is logged in
    , user // user we wish to connect to


  // move this into specific context?
  before(() => {
    // init server in test mode
    server = require('../../server').init()
  })


  describe('Client Socket API', () => {
    const socket = io.connect("http://localhost:3000/clients") // move url to config file, also prefix io routes in TestMode

    describe('Event:connection', () => {
      it('should receive initialList event with a client object and users Array after connection', (done) => {

        socket.on('initialList', (res) => {
          client = res.client
          user = res.user

          res.should.have.property('client').which.is.a.Object()
          res.should.have.property('users').which.is.a.Array().length(10)

          done()
        })
      })
    })


    describe('Event:userHistory', () => {
      it('should receive userHistory event after emitting userHistory', (done) => {
        socket.emit('userHistory', {client, user})


        socket.on('userHistory', (res) => {
          res.should.have.property('unAnsweredQuestion').which.is.a.Object()
          res.should.have.property('chain').which.is.a.Array().length(0)
          done()
        })
      })
    })
  })
})

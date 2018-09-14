const ctrl = require('../controllers/clients')
let manager = require('../../../../../services/swManager')
let DB = require('../../../../../services/dbManager')




const welcome = (socket) => {
	let welcomePkg = {
		user: {},
		clients: {}
	}

  // emit welcome package
	DB.Users.find({},"_id profileName", (err,users) => {
		if (err) {
			return console.trace(err);
		}


		DB.Clients.findOne({},"_id firstName lastName", (err,client) => {
			if (err) {
				return console.trace(err);
			} else {
				welcomePkg = {
					client,
					users
				}

        manager.addConnection('private', 'clients', socket, client)

				socket.emit('initialList', welcomePkg)

			}
		})
	})


	// DIsconnect event
  console.log("Connected to Socket!!"+ socket.id)

  socket.on('disconnect', () => {
    console.log('Disconnected - '+ socket.id);
  });



  // Event listeners
  socket.on('userHistory', ctrl['userHistory'])
	socket.on('addQuestion', ctrl['addQuestion'])
}


const init = (io) => {
  io.of('/clients').on('connection', welcome);
}


module.exports = init

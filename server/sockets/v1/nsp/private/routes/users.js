





io.of('/users').on('connection', function (socket) {
	let welcomePkg = {
		user: {},
		clients: {}
	}


	console.log("Connected to Socket!!"+ socket.id)

	socket.on('disconnect', function(){
		console.log('Disconnected - '+ socket.id);
	});

	DB.Clients.find({},"_id firstName lastName info",(err,clients)=>{
		if (err){
			console.trace(err);
		}

		DB.Users.findOne({},"_id profileName",(err,user)=>{
			if (err){
				console.trace(err);
			}
			else {
				welcomePkg = {
					user,
					clients
				}

				let userConnection = {
					socket,
					user
				}
				connections.users.push(userConnection)
				socket.emit('initialList',welcomePkg)
				console.log("+++Gethyl GET worked!!")
			}

		})
	})


	socket.on('clientHistory',(data)=>{
		console.log(data);
		let user = data.user
		let client = data.client

		let pkg = {
			activeClient: client,
			chain: [],
			unAnsweredQuestion: {}
		}


		DB.Clients.findOne({ _id: client._id }, '' , (err,result)=> {

			console.log(pkg);
			socket.emit('clientHistory',pkg)

		})

	})


	// socket.on('addItem',(addData)=>{
	// 	var todoItem = new todoModel({
	// 		itemId:addData.id,
	// 		item:addData.item,
	// 		completed: addData.completed
	// 	})
	//
	// 	todoItem.save((err,result)=> {
	// 		if (err) {console.log("---Gethyl ADD NEW ITEM failed!! " + err)}
	// 		else {
	// 			// connections.forEach((currentConnection)=>{
	// 			// 	currentConnection.emit('itemAdded',addData)
	// 			// })
	// 			io.emit('itemAdded',addData)
	//
	// 			console.log({message:"+++Gethyl ADD NEW ITEM worked!!"})
	// 		}
	// 	})
	// })

	socket.on('markItem',(markedItem)=>{
		var condition   = {itemId:markedItem.id},
			updateValue = {completed:markedItem.completed}

		todoModel.update(condition,updateValue,(err,result)=>{
			if (err) {console.log("---Gethyl MARK COMPLETE failed!! " + err)}
			else {
				// connections.forEach((currentConnection)=>{
				// 	currentConnection.emit('itemMarked',markedItem)
				// })
				io.emit('itemMarked',markedItem)

				console.log({message:"+++Gethyl MARK COMPLETE worked!!"})
			}
		})
	})

});

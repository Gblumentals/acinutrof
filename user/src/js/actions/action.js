import axios from "axios"


const publicVapidKey =
  "BCun5wyPLnKU9PZP9K2lmwSeY9NkAIQPSWSkRdHqSDT6HsUUCgDXp1zaen9fer4azogULpsUTIlqix0Te_iP_u8";



function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}




export const AddItem = (data) => ({
	type: "ADD_ITEM",
	item: data.item,
	itemId:data.id,
	completed:data.completed
})

export const completeItem = (data) => ({
	type: "COMPLETED_ITEM",
	itemId: data.id,
	completed:data.completed
})

/* Used only by actions for sockets */
export const initialItems = (data) => ({
	type: "INITIAL_ITEMS",
	clients: data.clients,
	user: data.user,
	items: data.clients,
})

export const clientHistory = (data) => ({
	type: "CLIENT_HISTORY",
	chain: data.chain,
	activeClient: data.activeClient,
	unansweredQuestion: data.unansweredQuestion,
})

export const subscribeToPushNotifications = (data) => ({
	type: "SUBSCRIBE_PUSH_NOTIFICATIONS"
})





export const subscribePush = () => {
	return (dispatch) => {


		// console.log('doing');
		// console.log(navigator);
		// navigator.serviceWorker.ready.then(registration => {
		// 	console.log('not getyting fired');
		// 	if (!registration.pushManager) {
		// 		alert("Push Unsupported")
		// 		return
		// 	}
		//
		// 	console.log('registering');
		// 	registration.pushManager
		// 	.subscribe({
		// 		userVisibleOnly: true, //Always display notifications
		// 		applicationServerKey: convertedVapidKey
		// 	})
		// 	.then(subscription => axios.post("/api/push/register", subscription))
		// 	.catch(err => console.error("Push subscription error: ", err))
		// })
		// 	.catch(err => console.error("Push subscription error: ", err))
	}
}

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */
export const loadInitialDataSocket = (socket) => {
	return (dispatch) => {
		// dispatch(clearAllItems())
		socket.on('initialList',(res)=>{
		   console.dir(res)
		   dispatch(initialItems(res))
	   })
	}
}

export const addNewItemSocket = (socket,id,item) => {
	return (dispatch) => {
		let postData = {
				id:id+1,
				item:item,
				completed:false
		     }
	    socket.emit('addItem',postData)
	}
}

export const markItemCompleteSocket = (socket,id,completedFlag) => {
	return (dispatch) => {
		let postData = {
				id:id,
				completed:completedFlag
		     }
		socket.emit('markItem',postData)
	}
}


export const clientHistoryDataSocket = (socket, client, user) => {
	return (dispatch) => {
		// dispatch(clearAllItems())
		socket.emit('clientHistory', { client, user })
	}
}

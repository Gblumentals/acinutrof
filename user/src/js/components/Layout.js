import React from "react";
import ReactDOM from "react-dom"
import {connect} from 'react-redux'
import {addNewItem, loadInitialData, markItemComplete
	   , loadInitialDataSocket, addNewItemSocket, markItemCompleteSocket
		 , clientHistory, clientHistoryDataSocket
		 , subscribePush
	   , AddItem,completeItem} from '../actions/action'
import io from "socket.io-client"


import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'

import Avatar from 'material-ui/Avatar';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
// import {List as List} from 'immutable';

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()





let usersStyles = {
	width: '20%',
	  margin: 20,
	  textAlign: 'center',
	  display: 'inline-block',
		float: 'left',
		flex: 'flex-grow',
}

let messagesStyle = {
	  width: '75%',
	  margin: 20,
		padding: 10,
	  textAlign: 'center',
	  display: 'inline-block',
		float: 'right',
		flex: 'flex-grow'
}

let contentStyle = {
	'height': '100%',
	display: 'flex'
}

let sendMessageContainerStyle = {
	float: 'right',
	width: '100%',

}

let sendMessageInputStyle = {
	'min-width': '90%',
}




let robotFontStyle = {
	fontFamily: "Roboto, sans-serif",
	color: "rgba(0, 0, 0, 0.870588)"
}
let markCompleteStyle = {
  textDecoration: "line-through"
}
let socket
const mapStateToProps = (state = {}) => {
	// console.dir(state)
    return {...state};
};

let worker

export  class Layout extends React.Component{

   constructor(props)
   {
	   super(props)
	   const {dispatch} = this.props


		 self.addEventListener("push", e => {
			 console.log('yo');
		   const data = e.data.json();
		   console.log("Push Recieved...");
		   self.registration.showNotification(data.title, {
		     body: data.body,
		     icon: "http://image.ibb.co/frYOFd/tmlogo.png"
		   });
		 });

	//    dispatch(loadInitialData())
	   socket = io.connect("http://localhost:3000/users")
	   console.dir(socket)
		 dispatch(loadInitialDataSocket(socket))

	   socket.on('itemAdded',(res)=>{
		   console.dir(res)
		   dispatch(AddItem(res))
	   })

	   socket.on('itemMarked',(res)=>{
		   console.dir(res)
		   dispatch(completeItem(res))
	   })


 	   socket.on('clientHistory',(res)=>{
 		   console.dir(res)
 		   dispatch(clientHistory(res))
 	   })


		 worker = () => {
			 dispatch(subscribePush())
		 }
   }

   componentWillUnmount() {
       socket.disconnect()
	   alert("Disconnecting Socket as component will unmount")
   }

	 componentDidMount() {
		 worker()
	 }

   render(){
		 const {dispatch,items, clients, user, activeClient} = this.props

		return (
			<div>

				<AppBar
					title="User App"
				/>
                <Divider/>

								<div style={contentStyle}>


								<Paper style={usersStyles} zDepth={1}>
									<Subheader>Logged in as {user.profileName}</Subheader>

									<List>{clients.map((client,key)=>{
										return <ListItem key={key}
											onClick={ (event) => {
											{/*dispatch(markItemComplete(key+1,!todo.completed))*/}
											dispatch(clientHistoryDataSocket(socket, client, user))
										}
									}
									leftAvatar={<Avatar src="https://picsum.photos/200" />}
			 						rightIcon={<CommunicationChatBubble />}
									primaryText={client.firstName + ' ' +client.lastName  }>
								</ListItem>})
							}</List>
						</Paper>


						<Paper style={messagesStyle} zDepth={1}>
							{activeClient._id ? <Subheader>Chatting with {activeClient.firstName + ' ' + activeClient.lastName}</Subheader> : ''}






							<div>
								<Paper  zDepth={1}>
									<List>{items.map((todo,key)=>{
										return <ListItem key={key} style={todo.completed?markCompleteStyle:{}} onClick={ (event) => {
											{/*dispatch(markItemComplete(key+1,!todo.completed))*/}
											dispatch(markItemCompleteSocket(socket,key+1,!todo.completed))
										}
									} primaryText={todo.item}>
								</ListItem>})
							}</List>
						</Paper>

						<div style={sendMessageContainerStyle}>

								<TextField
									hintText="Add New Item"
									floatingLabelText="Enter the new item"
									floatingLabelStyle={{float: 'right'}}
									ref="newTodo"
									style={sendMessageInputStyle}
								/>

							{" "}

							<RaisedButton
								label="Click to add!" secondary={true}
								onClick={ () => {
									const newItem = ReactDOM.findDOMNode(this.refs.newTodo.input).value
									newItem === "" ?  alert("Item shouldn't be blank")
									:  dispatch(addNewItemSocket(socket,items.size,newItem))
									{/*: dispatch(addNewItem(items.size,newItem))*/}
									ReactDOM.findDOMNode(this.refs.newTodo.input).value = ""
								}
							}
						/>
					</div>

							</div>



					</Paper>

				</div>



			</div>
		);
	}
}

export default  connect(mapStateToProps)(Layout)

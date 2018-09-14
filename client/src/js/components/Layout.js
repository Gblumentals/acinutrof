import React from "react";
import ReactDOM from "react-dom"
import {connect} from 'react-redux'
import {addNewItem, loadInitialData, markItemComplete
	   , loadInitialDataSocket, addNewItemSocket, markItemCompleteSocket, addQuestionSocket, addQuestion
		 , userHistory, userHistoryDataSocket
		 , subscribePush
	   , AddItem,completeItem} from '../actions/action'
import io from "socket.io-client"

import { orange500 } from 'material-ui/styles/colors';

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
	'min-width': '80%',
}

let errorStyle = {
	color: orange500,
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



	//    dispatch(loadInitialData())
	   socket = io.connect("http://localhost:3000/clients")
	   console.dir(socket)
		 dispatch(loadInitialDataSocket(socket))

	   socket.on('addQuestion',(res)=>{
		   console.dir(res)
		   dispatch(addQuestion(res))
	   })

	   socket.on('itemMarked',(res)=>{
		   console.dir(res)
		   dispatch(completeItem(res))
	   })

 	   socket.on('userHistory',(res)=>{
 		   console.dir(res)
 		   dispatch(userHistory(res))
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
		 const {dispatch,items, client, users, activeUser, chain, unansweredQuestion} = this.props

		return (
			<div>

				<AppBar
					title="Client App"
				/>
				<Divider/>

				<div style={contentStyle}>


					<Paper style={usersStyles} zDepth={1}>
						<Subheader>Logged in as {client.firstName + ' ' + client.lastName}</Subheader>

						<List>{users.map((user,key)=>{
							return <ListItem key={key}
								onClick={ (event) => {
									{/*dispatch(markItemComplete(key+1,!todo.completed))*/}
									dispatch(userHistoryDataSocket(socket, user, client))
								}
							}
							leftAvatar={<Avatar src="https://picsum.photos/200" />}
							rightIcon={<CommunicationChatBubble />}
							primaryText={ user.profileName  }>
						</ListItem>})
					}</List>
				</Paper>


				<Paper style={messagesStyle} zDepth={1}>
					{activeUser._id ? <Subheader>Chatting with {activeUser.profileName}</Subheader> : ''}

					<div>
						<Paper zDepth={1}>
							<List>{chain.map((elem,key)=>{
								return <ListItem key={key}
									primaryText={ elem.cType == 'question' ? client.firstName + ' ' + client.lastName : activeUser.profileName  }
									secondaryText={ elem.content }
									>
								</ListItem>})
							}</List>
						</Paper>

						<div style={sendMessageContainerStyle}>

							<TextField
								hintText="Send a question Question"
								floatingLabelText="Enter new question"
								floatingLabelStyle={{float: 'right'}}
								ref="newQuestion"
								errorStyle={errorStyle}
								errorText={unansweredQuestion ? 'Wait until the expert answers your previous question' : ''}
								style={sendMessageInputStyle}
							/>

							{" "}

							<RaisedButton
								label="Click to Send!" secondary={true}
								onClick={ () => {
									const newQuestion = ReactDOM.findDOMNode(this.refs.newQuestion.input).value
									newQuestion === "" ?  alert("Question shouldn't be blank")
									:  dispatch(addQuestionSocket(socket, activeUser, newQuestion, client))
									{/*: dispatch(addNewItem(items.size,newItem))*/}
									ReactDOM.findDOMNode(this.refs.newQuestion.input).value = ""
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

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './reducers/reducer'
import Layout from "./components/Layout";

// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import { getMuiTheme,  } from 'material-ui/styles'
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles'
import { lightGreen500, purple500 } from 'material-ui/styles/colors';

const app = document.getElementById('app')

const store = createStore(reducer, applyMiddleware(thunk))

//
// if ("serviceWorker" in navigator) {
//   // send().catch(err => console.trace(err));
//   console.log("Registering service worker...");
//   const registration = runtime.register();
//   console.log("Service Worker Registered...");
//   console.log("Registering Push...");
//   const subscription = register.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
//   });
//   console.log("Push Registered...");
//
//   fetch("/subscribe", {
//     method: "POST",
//     body: JSON.stringify(subscription),
//     headers: {
//       "content-type": "application/json"
//     }
//   });
//   console.log("Push Sent...");
// }



let muiTheme = getMuiTheme({
  palette: {
		primary1Color: purple500,
    accent1Color: lightGreen500
  }
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider muiTheme={muiTheme}>
			<Layout/>
		</MuiThemeProvider>
	</Provider>
	, app);

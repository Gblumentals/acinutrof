"use strict"

const hapi = require('hapi')
const io = require('socket.io')
const Config = require('config').Config
const app = require('./app')
const DB = require('./services/dbManager')


const DevMode = process.argv.indexOf('dev') >= 0
const TestMode = process.argv.indexOf('test') >= 0

const init = async () => {

  console.log('Initializing server')
  console.log('- listening on: ' + Config.port)

  // SERVER level logic
  if (DevMode) console.log('- devmode confirmed')

  const HapiOptions = {}
  if (DevMode) HapiOptions.debug = { request: ['error'] }


  const ConnectionOptions = {
    host: Config.host,
    port: Config.port
  }

  const SocketIOOptions = {}

  const server = new hapi.Server(ConnectionOptions)

	// link server and io, IO is the socket server
  const IO = io(server.listener, SocketIOOptions)

	//initialize application level logic (routers/controllers)
	app.init(IO)

	//register plugins
	await server.register(require('inert'))

	//gogogo
	await server.start()

  // in testing return the server for injections, mock/stuck, etc
  if (TestMode) return server

	console.log(`- static and socket server is up on: ${server.info.uri}`)
}


process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});


exports.init = init

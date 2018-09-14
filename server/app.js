"use strict"

const Config = require('config').Config

const initSocketApp = require(`./sockets/${Config.sockets.currentAPIVersion}/nsp/${Config.sockets.nsp[0]}/index`)


exports.init = (io) => {
  initSocketApp(io)

  // init all API controllers and routes here from the directory 'api'
}

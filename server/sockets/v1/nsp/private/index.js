"use strict"
const Router = {
  Clients: require('./routes/clients')
}


const init = (io) => {
  Router.Clients(io)
}

module.exports = init

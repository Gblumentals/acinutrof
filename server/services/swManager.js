// "acts as sessions" currently
let sessions = {
  connections: {
    // pools
    private: {
      //user types/rooms
      users: [],
      clients: [],
    }
  }
}

//since we have the pool name we can locate them where we saved them once they ender
const addConnection = (pool, nsp, socket, user) => {
  let connection = { socket }

  if (nsp === 'clients') connection.client = user
  if (nsp === 'users') connection.user = user

  sessions.connections[pool][nsp].push(connection)
}


const getConnection = (pool, nsp, user) => {
  let connection = {
    isOnline: false,
    connection: {}
  }

  sessions.connections[pool][nsp].forEach((c) => {
    if (nsp === 'clients') {
      if (c.client._id.toString() === user._id.toString())  {
        connection.connection = c
        connection.isOnline = true
      }
    }

    if (nsp === 'users') {
      if (c.user._id === user._id)  {
        connection.connection = c
        connection.isOnline = true
      }
    }
  })

  return connection
}


// TODO: implement delete, update or upsurt

module.exports = {
  sessions,
  getConnection,
  addConnection
}

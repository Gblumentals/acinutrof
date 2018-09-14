# Repo structure

Theres 3 apps in this repo - a server and 2 clients (client, user).

## Requirements
1. Mongodb 4.0
2. Node.js ^8.x.x

## Setup
After cloning the repo:

1. run ``` npm i ``` in the root project directory, in the client and user directtories as well

2. make a directory named 'config' in the main project directory

3. in the config directory create 2 files: default.js and dev.js, with the following code. Put your environment variables here
```
const Config = {

  host: <host>,
  port: <port>,


  db: {
    protocol: 'mongodb',
    address: <address> | localhost,
    port: <port>,
    db: <dbName>
  },

  sockets: {
    currentAPIVersion: 'v1',
    nsp: ['private'],
    pools: {
      private: ['users', 'clients']
    }
  }
}

exports.Config = Config
```

4. create a file named '.env' in the root directory of the project and set the NODE_ENV variable
```
NODE_ENV=dev
```


## Start
Starting different apps

1. To start the server run ``` npm start ``` in the root directory
1. To start the user UI run ``` npm start ``` in the user directory (default port 3002)
1. To start the client UI run ``` npm start ``` in the client directory (default port 3001)

## TODO
- Mocha testing
- Artillery testing
- Add user socket logic to socket server
- Add database authentication
- Split db requests into a seperate folder
- Add module aliases for services
- Combine all clients and server into 1 managable directory
- Add authentication logic in socket manager
- Abstract further socket initialization for easier functionality integration
- Add logger middleware to hapi
- Add payload validation to sockets

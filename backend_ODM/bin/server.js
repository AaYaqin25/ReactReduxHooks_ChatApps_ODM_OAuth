#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('backend-odm:server');
var http = require('http');
// var { SaveMessageStore } = require('../APISocket/api.js')
// var { v4 } = require('uuid')
// var chatMessage = new SaveMessageStore()

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/**
 * Create HTTP server.
 */

var server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3001'
  }
})

io.on('connection', (socket) => {
  socket.on('join room', (data) => {
    socket.join(data)
    console.log(`User ${socket.id} has join room ${data}`);
  })

  socket.on('send message', (data) => {
    socket.broadcast.to(data.to).emit('receive message', { _id: data._id, message: data.message })
  });

  socket.on('delete message', (data) => {
    socket.broadcast.to(data.to).emit('delete message', data._id)
  })
});


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// PACKAGE HTTP
const http = require('http');

// APPLICATION CALL
const app = require('./appServer');

// DOTENV
require('dotenv').config({
    path : './config/.env'
})

// CHECK PORT USED
const selectPort = portData => {
  const port = parseInt(portData, 10);

  if (isNaN(port)) {
    return portData;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = selectPort(process.env.PORT_SERVER || '8000');
app.set('port', port);

// ERRORS
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

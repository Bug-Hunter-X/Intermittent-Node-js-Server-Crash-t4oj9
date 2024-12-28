const http = require('http');
const fs = require('fs');

const requestListener = function (req, res) {
  res.writeHead(200);
  try {
    res.end('Hello, World!');
  } catch (err) {
    console.error('Error handling request:', err);
    res.writeHead(500);
    res.end('Internal Server Error');
  }
};

const server = http.createServer(requestListener);

// Handle potential errors during server startup.

const port = 8080; 

const onListening = () => {
  console.log(`Server is listening on port ${port}`);
};

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on('error', onError);

server.on('listening', onListening);

server.listen(port);
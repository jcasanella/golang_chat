const WebSocket = require('ws');
let socket = new WebSocket("ws://localhost:3000/ws");

socket.on('open', function open() {
  console.log('Connected to WebSocket Server');

  socket.send('Hello from nodeJS client');
});

socket.on('message', function incoming(data) {
  console.log('Received from server: ', data.toString());
});


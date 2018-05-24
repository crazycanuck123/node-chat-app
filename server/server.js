const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('New User connected');

  // socket.emit from admin text Welcome to the Chat app
  // socket.broadcast.emit from Admin text New user joined
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the App.'));
  socket.broadcast.emit('newUser', generateMessage('Admin', 'New user joined'));
  socket.on('createMessage', (newMessage, callback) => {
    console.log('newMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback();
  });


  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

    socket.on('disconnect', () =>{
      console.log('User Disconnected');
    });
});


app.get('/', (req, res) =>{

  res.render('index.html');
  });

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var {generateMessage} = require('./utils/message');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('New User connected');

  // socket.emit from admin text Welcome to the Chat app
  // socket.broadcast.emit from Admin text New user joined
  socket.emit('welcome', generateMessage('Admin', 'Welcome to the App.'));
  socket.broadcast.emit('newUser', generateMessage('Admin', 'New user joined'));
  socket.on('createMessage', (newMessage) => {
    console.log('newMessage', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
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

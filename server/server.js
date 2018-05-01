const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('New User connected');

  socket.on('createMessage', (newMessage) => {
    console.log('newMessage', newMessage);
    socket.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createAt: new Date()
    });
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

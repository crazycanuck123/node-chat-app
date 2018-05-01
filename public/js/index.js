  var socket = io();

  socket.on('connect', function() {
    console.log('Connected to the server');
    socket.on('welcome', function(message) {
      console.log(message);
    });
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });


  socket.on('newMessage', function(message) {
    console.log('Message', message);
  });

  socket.on('newUser', function(message) {
    console.log(message);
  });

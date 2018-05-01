  var socket = io();

  socket.on('connect', function() {
    console.log('Connected to the server');
      socket.emit('createMessage', {
        from: 'jjabrahams@badmovies.com',
        text: 'I make bad star wars movies'
      });
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });


  socket.on('newMessage', function(message) {
    console.log('Message', message);
  });

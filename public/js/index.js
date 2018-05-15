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
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
  });

  socket.on('newUser', function(message) {
    console.log(message);
  });


  $('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from:'User',
      text: $('[name=message]').val()
    }, function() {

    });
  });

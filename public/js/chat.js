  var socket = io();


  function scrollToBottom() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + lastMessageHeight + newMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }
  socket.on('connect', function() {
    var params = $.deparam(window.location.search);
    socket.emit('join', params, function (err) {
      if (err) {
        alert(err);
        window.location.href = '/';
      } else {
        console.log('no error');
      }
    });
  });

  socket.on('disconnect', function() {
    console.log('Disconnected from server');
  });

  socket.on('updateUserList', function (users) {
    var template = $('#people-template').html();
    $('#userList').empty();
    users.forEach(function (user){
      var html = Mustache.render(template, {
        userName: user
      });
      $('#userList').append(html);
    })

  });

  socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
  });

  socket.on('newUser', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
  });

  socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime,
      url: message.url
    });
    $('#messages').append(html);
    scrollToBottom();
  });

  var messageTextbox = $('[name=message]');
  var locationButton = $('#send-location');


  $('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
      from:'User',
      text: messageTextbox.val()
    }, function() {
      messageTextbox.val('');
    });
  });




locationButton.on('click',function() {
  if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location')
  })
});

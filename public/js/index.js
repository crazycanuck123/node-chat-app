  var socket = io();

socket.on('updateRoomsList', function (users) {
  var template = $('#rooms-list-template').html();
  $('#current-rooms').empty();
  console.log(users)
  users.forEach(function (user){
    var html = Mustache.render(template, {
      room: user
    });
    $('#current-rooms').append(html);
  });

});

$('#current-rooms').on('click', '.room', function(){
  var roomName = $(this).html();
  $('input[name=room]').val(roomName);
});

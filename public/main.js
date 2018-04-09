$(document).ready(function(){

$.ajax({url: "/hm", success: function(result){
  result.forEach(function(msg){$('#messages').append($('<li>').text(msg));})
}});
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0,document.body.scrollHeight);
  });
});

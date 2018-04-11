$(document).ready(function(){

$.ajax({url: "/hm", success: function(result){
  result.messages.forEach(function(msg){$('#messages').append($('<li>').text(msg));})
  scrollToBottom();
  $('.signal').addClass('hide');
}});
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    scrollToBottom();
  });
});

var scrollToBottom = function(){
  $("html, body").animate({ scrollTop: $(document).height() }, 500);
}

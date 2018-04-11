$(document).ready(function(){

$.ajax({url: "/hm", success: function(result){
  result.messages.forEach(function(msg){$('#messages').append($('<li>').text(msg));})
  scrollToBottom();
  $('.signal').addClass('hide');
}});

  var socket = io();
  $('form').submit(function(){
    var message = $('#m').val();
    if(message.trim() !== ""){
      socket.emit('chat message', message);
      $('#m').val('');
      return false;
    }
    else {
      alert("no se puede ser hacker aca...")
      return false;
    }
  });

  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    scrollToBottom();
  });
});

var scrollToBottom = function(){
  $("html, body").animate({ scrollTop: $(document).height() }, 500);
}

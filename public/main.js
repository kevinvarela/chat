$(document).ready(function(){

$.ajax({url: "/hm", success: function(result){
  result.messages.forEach(function(msg){
    renderMessages(msg);
  })
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
      alert("no se puede enviar mensajes vacios...")
      return false;
    }
  });

  socket.on('chat message', function(msg){
    renderMessages(msg);
    scrollToBottom();
  });
});

var scrollToBottom = function(){
  $("html, body").animate({ scrollTop: $(document).height() }, 500);
}

var renderMessages = function(msg){
  if(msg.includes('giphy.com')){
    var gifId = msg;
    $('#messages').append($('<div class="gif"><img src="'+msg+'"></div>'));
  }else{
    $('#messages').append($('<li>').text(msg));
  }
}

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var historyMessages = ["Bienvenido al chat..."];

app.get('/', function(req, res){
  res.sendFile('public/index.html' , { root : __dirname});
});

app.get('/hm', function(req, res){
  res.send(historyMessages);
});

app.get('/reset', function(req, res){
  historyMessages = ["Bienvenido al chat..."];
  res.send("History reset")
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    historyMessages.push(msg)
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

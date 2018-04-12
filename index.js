var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
var historyMessages = {'messages':["Historial vacio"]};
var urlDB = "https://api.myjson.com/bins/ui2pb";
var usersConnected = 0;
const LIMITE_DE_MENSAJES = 3000;

app.use('/static', express.static(__dirname + '/dist'));

app.get('/', function(req, res){
  res.sendFile('dist/index.html' , { root : __dirname});
});

app.get('/hm', function(req, res){
  request.get(urlDB, function(err, httpResponse, body) {
    historyMessages = JSON.parse(body);
    res.send(historyMessages);
  })
});

app.get('/resetK', function(req, res){
  var historyMessagesReset = {'messages':["Bienvenido a KVA-CHAT 1.2..."]};
  request({url:urlDB, method:'PUT', json: historyMessagesReset}, function(request, response){
    console.log("Method PUT: 'Reset DB'");
    res.send("History reset")
  })
});

io.on('connection', function(socket){
  usersConnected += 1;
  console.log("Users Online = " + usersConnected);
  socket.on('disconnect', function(){
    usersConnected -= 1;
    console.log("Users Online = " + usersConnected);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    updateDB(msg);
    io.emit('chat message', msg);
  });
});

var updateDB = function(msg){
  historyMessages.messages.push(msg);
  var historialLength = historyMessages.messages.length;
  console.log(historialLength);
  if( historialLength >= LIMITE_DE_MENSAJES){
    historyMessages.messages = historyMessages.messages.slice(historialLength - LIMITE_DE_MENSAJES)
    console.log("Slice messages to: "+ historyMessages.messages.length);
  }
  request({url:urlDB, method:'PUT', json: historyMessages}, function(request, response){
  })
}

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:' +port);
});

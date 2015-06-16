var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
process.env.PWD = process.cwd();

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.use('/static', express.static(process.env.PWD + '/public'));

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('draw:committed', function(x, y, dragging){
    socket.broadcast.emit('draw:fromServer', x, y, dragging);
  });
});

http.listen(port, function(){
  console.log('listening on *:', port);
});

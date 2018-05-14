// Reference : https://socket.io/get-started/chat/
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// Assuming default currency rates as follows
var defult_currency_rates = {
	usd : 8440.01 ,
	inr : 568790.50 ,
	aud : 11192.29 ,
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/admin.html');
});

app.get('/jquery.min.js', function(req, res){
  res.sendFile(__dirname + '/jquery-1.11.1.min.js');
});

app.get('/popper.min.js', function(req, res){
  res.sendFile(__dirname + '/popper.min.js');
});

app.get('/bootstrap.min.js', function(req, res){
  res.sendFile(__dirname + '/bootstrap.min.js');
});

app.get('/bootstrap.min.css', function(req, res){
  res.sendFile(__dirname + '/bootstrap.min.css');
});

io.on('connection', function(socket){
  
  io.sockets.emit('currencyDefault',defult_currency_rates);

  socket.on('currencyUpdated', function(data) {
    defult_currency_rates = data;
    io.sockets.emit('broadcastToAllClients',data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
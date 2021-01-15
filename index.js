var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//页面路由
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/7.jpg',(req,res)=>{
  res.sendFile(__dirname+'/7.jpg');
});
app.get('/copy.png',(req,res)=>{
  res.sendFile(__dirname+'/copy.png');
});
app.get('/load.html', (req, res) => {
  res.sendFile(__dirname + '/load.html');
});
app.get('/TEXT.html', (req, res) => {
  res.sendFile(__dirname + '/TEXT.html');
});
io.on('connection', (socket) => {
  console.log('a user connected'+socket.id);
  socket.on('disconnect', ()=>{
    console.log("user disconnected"+socket.id);
  })
  //接受消息并发送
  socket.on("chat message", (msg) => {
    console.log(socket.id+"say: " + msg);
    io.emit('chat message', msg);//消息发送给所有用户
   //发送给除过自己外的所有用户
    //socket.broadcast.emit("chat message",msg);
  });

    
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

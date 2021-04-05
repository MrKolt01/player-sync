const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server,{
  cors: {
    origin: '*'
  }
});
const port = process.env.PORT || 3030;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  console.log('User connected')

  // получаем название комнаты из строки запроса "рукопожатия"
  const { roomId } = socket.handshake.query
  // сохраняем название комнаты в соответствующем свойстве сокета
  socket.roomId = roomId

  // присоединяемся к комнате (входим в нее)
  socket.join(roomId)

  // io.in(socket.roomId).emit('play', {who: 'ya', isPlaying: false});
  // io.in(socket.roomId).emit('next', 'ya');
  // io.in(socket.roomId).emit('prev', 'ya');

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('play',who => io.in(socket.roomId).emit('play',who));
  socket.on('pause',who => io.in(socket.roomId).emit('pause',who));
  socket.on('next',who => io.in(socket.roomId).emit('next',who));
  socket.on('prev',who => io.in(socket.roomId).emit('prev',who));
  socket.on('time',({who,time}) => io.in(socket.roomId).emit('time',{who,time}));
  socket.on('setAudio',({who,audio}) => io.in(socket.roomId).emit('setAudio',{who,audio}));

  // обрабатываем отключение сокета-пользователя
  socket.on('disconnect', () => {
    // выводим сообщение
    console.log('User disconnected')
    // покидаем комнату
    socket.leave(roomId)
  })
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

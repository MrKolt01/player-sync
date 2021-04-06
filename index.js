const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server,{
  cors: {
    origin: '*'
  }
});
const port = process.env.PORT || 3030;

io.on('connection', (socket) => {

  console.log('User connected')

  // получаем название комнаты из строки запроса "рукопожатия"
  const { roomId } = socket.handshake.query
  // сохраняем название комнаты в соответствующем свойстве сокета
  socket.roomId = roomId

  // присоединяемся к комнате (входим в нее)
  socket.join(roomId)

  socket.on('sync', ({who,data}) => io.in(socket.roomId).emit('sync',{who,data}))

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

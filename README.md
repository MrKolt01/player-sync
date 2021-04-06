# Simple sync command using web socket connection with rooms support

### There is only one entry point '/' :

socket.on('sync', ({who,data}) => io.in(socket.roomId).emit('sync',{who,data}))

Example on a client:
```
const SERVER_URL = 'http://localhost:3030';
const ROOM_ID = 'room id';

let socket = io(SERVER_URL, { query: { ROOM_ID } });

if(socket){

  // commands listener
  socket.on('sync', ({who,data}) => {
    // you logic here
  })
}

// send sync command example:
if (socket) {
  socket.emit('sync',
  {
    who: 'Sender name',
    data: { /** some data **/}
  })
}

function setAudioSignal(audio: Audio) {
  if (socket) {
    socket.emit('sync', {
      who: name,
      data: { command: Command.SetAudio, json: audio },
    })
  }
}

    
```


You can also spin up a free Heroku dyno to test it out:

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/socketio/chat-example)

Or run it on [Repl.it](https://repl.it/):

[![Run on Repl.it](https://repl.it/badge/github/socketio/chat-example)](https://repl.it/github/socketio/chat-example)

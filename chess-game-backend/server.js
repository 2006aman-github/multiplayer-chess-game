const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
const { v4: uuidv4 } = require('uuid');

// middlewares here...
app.use(cors());

app.get('/', (req, res) => {
  res.send('hey dude this is home page');
});
let rooms = [];
let players = {};

io.on('connection', (socket) => {
  console.log('New Conection');
  // check if rooms available for player to join
  let roomId = uuidv4();
  let isRoomAvailable = false;

  for (const room in rooms) {
    const key = rooms[room];

    if (io.sockets.adapter.rooms.get(key)?.size === 1) {
      socket.join(key);
      console.log('room available to join');

      players[socket.id] = {
        roomId: key,
        color: 'black',
      };
      isRoomAvailable = true;
      socket.emit('server-connection-message', {
        message: 'hey client',
        roomId: key,
        color: 'black',
        opponent: {
          id: socket.id,
        },
      });
      socket.to(key).emit('opponent-connected', {
        message: 'opponent connected',
        data: {
          id: socket.id,
          roomId,
        },
      });
      socket.to(key).emit('your-turn', { message: 'Its your turn now' });
      // adding a new player to existing room and will always have black color who joins next
      // message to welcome the newly connected client
      break;
    }
  }
  if (!isRoomAvailable) {
    console.log('creating a new room', roomId);
    socket.join(roomId);
    rooms.push(roomId);
    players[socket.id] = {
      roomId,
      color: 'white',
    };
    io.sockets.in(socket.id).emit('server-connection-message', {
      message: 'Searching for an opponent...',
      roomId,
      color: 'white',
    });
  }

  // when a player joins the match
  socket.on('player-joined-verify', (name) => {
    console.log(players[socket.id].roomId);
    players[socket.id] = { ...players[socket.id], name, id: socket.id };
    socket.to(players[socket.id].roomId).emit('opponent-connected', {
      message: 'opponent connected',
      data: {
        id: socket.id,
        roomId,
      },
    });
  });

  // when a player moves his piece
  socket.on('piece-moved', (data) => {
    socket.to(players[socket.id].roomId).emit('opponent-piece-moved', data);
    socket
      .to(players[socket.id].roomId)
      .emit('your-turn', { message: 'Its your turn now' });
  });

  // when player leaves the room
  socket.on('disconnect', () => {
    console.log(socket.id);
    const disconnectedRoomId = players[socket.id]?.roomId;
    console.log(players[socket.id]);
    if (!io.sockets.adapter.rooms.get(disconnectedRoomId)) {
      rooms.shift(rooms.indexOf(disconnectedRoomId), 1);
      console.log('deleted roomId', disconnectedRoomId, rooms);
    }
    socket
      .to(disconnectedRoomId)
      .emit('opponent-disconnected', 'your opponent has disconnected');

    delete players[socket.id];
    console.log('Client disconnected');
  });
});
const PORT = 8000 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

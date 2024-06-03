const express = require('express');
const socket = require('socket.io');
const http = require('http');
const { Chess } = require('chess.js');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render("index", { title: "Welcome to Chess" });
});

const games = {};

io.on("connection", (socket) => {
    console.log("connected");

    socket.on('joinGame', (gameId) => {
        if (!games[gameId]) {
            games[gameId] = {
                chess: new Chess(),
                players: { w: null, b: null }
            };
        }
        
        const game = games[gameId];
        socket.join(gameId);
        
        if (!game.players.w) {
            game.players.w = socket.id;
            socket.emit('playerRole', 'w');
        } else if (!game.players.b) {
            game.players.b = socket.id;
            socket.emit('playerRole', 'b');
        } else {
            socket.emit('playerRole', null);
        }

        socket.emit('boardState', game.chess.fen());

        socket.on('move', (move) => {
            if (game.chess.move({ from: move.from, to: move.to })) {
                io.to(gameId).emit('move', move);
                io.to(gameId).emit('boardState', game.chess.fen());
            }
        });

        socket.on('disconnect', () => {
            if (game.players.w === socket.id) {
                game.players.w = null;
            } else if (game.players.b === socket.id) {
                game.players.b = null;
            }

            if (!game.players.w && !game.players.b) {
                delete games[gameId];
            }
        });
    });
});

server.listen(3000, () => {
    console.log("Listening on PORT 3000");
});

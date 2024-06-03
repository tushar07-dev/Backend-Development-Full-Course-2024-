const express = require('express');
const socket = require('socket.io');
const http = require('http');
const { Chess } = require('chess.js');
const path = require('path');

const app = express();

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let player = {};
let currentPlayer = "W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.render("index", {title: "Welcome to Chess"});
});
// to use socket io we have to setup socket.io on backend as well as backend
io.on("connection", function (uniqueSocket) {
    console.log("connected", uniqueSocket);
})
server.listen(3000, function () {
    console.log("Listening on PORT 3000");
});


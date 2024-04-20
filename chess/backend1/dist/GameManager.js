"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Message_1 = require("./Message");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
        // Stop the game here because the user left.
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            // grpc
            const message = JSON.parse(data.toString());
            if (message.type === Message_1.INIT_GAME) {
                if (this.pendingUser) {
                    // So now you have your two particiants you can start game.
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                    console.log("2nd player joined game");
                }
                else {
                    console.log("Waiting to join 2nd player");
                    this.pendingUser = socket;
                }
            }
            if (message.type === Message_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;

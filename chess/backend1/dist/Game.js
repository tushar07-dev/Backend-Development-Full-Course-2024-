"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Message_1 = require("./Message");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: Message_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: Message_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        // validation here -
        // 1] is it this user move
        // 2] Is this move valid
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            this.board.move(move);
        }
        catch (err) {
            console.log(err);
            return;
        }
        // if game is over now
        if (this.board.isGameOver()) {
            this.player1.emit(JSON.stringify({
                type: Message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            this.player2.emit(JSON.stringify({
                type: Message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }));
            return;
        }
        // if game is not over yet
        if (this.board.moves().length % 2 === 0) {
            console.log("player player2 move");
            this.player2.send(JSON.stringify({
                type: Message_1.MOVE,
                payload: move
            }));
        }
        else {
            console.log("player player1 move");
            this.player1.send(JSON.stringify({
                type: Message_1.MOVE,
                payload: move
            }));
        }
        this.moveCount++;
        // this.moves.push(move);
        // this.board = move;
        // this.checkWinner();
    }
}
exports.Game = Game;

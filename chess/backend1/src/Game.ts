import { WebSocket } from "ws";
import { Chess } from 'chess.js';
import { GAME_OVER, INIT_GAME, MOVE } from "./Message";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private startTime: Date;
    private moveCount = 0;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }))
    }

    makeMove(socket: WebSocket, move: {
        from: string; to: string;
    }) {
        // validation here -
        // 1] is it this user move
        // 2] Is this move valid

        if(this.moveCount % 2 === 0 && socket !== this.player1) {return;}
        if(this.moveCount % 2 === 1 && socket !== this.player2) {return;}
        try {
            this.board.move(move);
        }
        catch (err) {
            console.log(err);
            return;
        }
        // if game is over now
        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            this.player2.emit(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return;
        }
        // if game is not over yet
        if (this.board.moves().length % 2 === 0) {
            console.log("player player2 move");
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        else{
            console.log("player player1 move");
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        this.moveCount++;
        // this.moves.push(move);
        // this.board = move;
        // this.checkWinner();
    }
}

import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./Message";
import { Game } from "./Game";

export class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null;
    private users: WebSocket[];

    constructor(){
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }

    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user !== socket);
        // Stop the game here because the user left.
    }
    private addHandler(socket: WebSocket){
        socket.on('message', (data) => {
            // grpc
            const message = JSON.parse(data.toString());
            if (message.type === INIT_GAME) {
                if(this.pendingUser){
                    // So now you have your two particiants you can start game.
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                    console.log("2nd player joined game");
                }
                else{
                    console.log("Waiting to join 2nd player");
                    this.pendingUser = socket;
                }
            }

            if(message.type === MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game) {
                    game.makeMove(socket, message.move);
                }
            }
        })
    }
}
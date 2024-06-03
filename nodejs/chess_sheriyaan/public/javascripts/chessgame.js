const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;
const gameId = prompt("Enter game ID:");
socket.emit('joinGame', gameId);

let playerTimers = { w: 300, b: 300 }; // 5 minutes for each player
let currentTurn = 'w';
const timerElements = {
    w: document.querySelector('#white-timer'),
    b: document.querySelector('#black-timer')
};

const moveHistoryElement = document.querySelector('#move-history');
let undoStack = [];
let redoStack = [];

socket.on('playerRole', (role) => {
    playerRole = role;
    renderBoard();
});

socket.on('boardState', (fen) => {
    chess.load(fen);
    renderBoard();
});

socket.on('move', (move) => {
    chess.move({ from: move.from, to: move.to });
    updateMoveHistory(move);
    renderBoard();
});

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement('div');
            squareElement.classList.add(
                "square",
                (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark"
            );

            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareIndex;

            if (square) {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );
                pieceElement.innerText = getPieceUnicode(square.type);
                pieceElement.draggable = playerRole === square.color;
                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: squareIndex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });
                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });
                squareElement.appendChild(pieceElement);
            }
            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    }
                    handleMove(sourceSquare, targetSquare);
                }
            });
            boardElement.appendChild(squareElement);
        });
    });
};

const handleMove = (source, target) => {
    const from = `${String.fromCharCode(97 + source.col)}${8 - source.row}`;
    const to = `${String.fromCharCode(97 + target.col)}${8 - target.row}`;
    const move = chess.move({ from, to });

    if (move) {
        undoStack.push(move);
        redoStack = [];
        renderBoard();
        socket.emit('move', { from, to });
    }
};

const updateMoveHistory = (move) => {
    const moveElement = document.createElement('div');
    moveElement.innerText = `${move.color} ${move.from}-${move.to}`;
    moveHistoryElement.appendChild(moveElement);
};

const getPieceUnicode = (piece) => {
    const pieces = {
        'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟',
        'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙'
    };
    return pieces[piece] || '';
};

const startTimer = () => {
    setInterval(() => {
        if (playerTimers[currentTurn] > 0) {
            playerTimers[currentTurn]--;
            updateTimers();
        } else {
            alert(`${currentTurn === 'w' ? 'White' : 'Black'} loses on time!`);
            resetTimers();
        }
    }, 1000);
};

const updateTimers = () => {
    timerElements.w.innerText = formatTime(playerTimers.w);
    timerElements.b.innerText = formatTime(playerTimers.b);
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const resetTimers = () => {
    playerTimers = { w: 300, b: 300 };
    updateTimers();
};

const undoMove = () => {
    if (undoStack.length > 0) {
        const move = undoStack.pop();
        redoStack.push(move);
        chess.undo();
        renderBoard();
        updateMoveHistory();
        socket.emit('boardState', chess.fen());
    }
};

const redoMove = () => {
    if (redoStack.length > 0) {
        const move = redoStack.pop();
        undoStack.push(move);
        chess.move(move);
        renderBoard();
        updateMoveHistory();
        socket.emit('boardState', chess.fen());
    }
};

document.querySelector('#undo-button').addEventListener('click', undoMove);
document.querySelector('#redo-button').addEventListener('click', redoMove);

document.querySelector('#save-game-button').addEventListener('click', () => {
    const fen = chess.fen();
    socket.emit('saveGame', { gameId, fen });
});

document.querySelector('#load-game-button').addEventListener('click', () => {
    socket.emit('loadGame', gameId);
});

startTimer();
renderBoard();

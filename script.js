// script.js

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

document.querySelectorAll('.tic').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

document.getElementById('reset').addEventListener('click', resetGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.id;

    if (gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
            disableBoard();
        } else if (gameBoard.every(cell => cell !== '')) {
            document.getElementById('message').textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function disableBoard() {
    document.querySelectorAll('.tic').forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    document.querySelectorAll('.tic').forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleCellClick);
    });
    document.getElementById('message').textContent = 'Play now';
}

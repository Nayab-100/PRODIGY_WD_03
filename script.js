// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const resetBtn = document.querySelector('.reset-btn');
    const modeSelect = document.getElementById('mode');
    const winnerPopup = document.createElement('div');
    winnerPopup.className = 'winner-popup';
    document.body.appendChild(winnerPopup);
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'x';
    let isGameActive = true;
    let isPlayerVsComputer = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    const checkWin = () => {
        for (const [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes('') ? null : 'draw';
    };

    const computerMove = () => {
        const availableIndexes = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        if (availableIndexes.length === 0) return;

        const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
        board[randomIndex] = 'o';
        cells[randomIndex].classList.add('o');
        cells[randomIndex].textContent = 'O';
    };

    const handleClick = (e) => {
        const index = e.target.dataset.index;
        if (board[index] || !isGameActive) return;

        board[index] = currentPlayer;
        e.target.classList.add(currentPlayer);
        e.target.textContent = currentPlayer.toUpperCase();
        
        const result = checkWin();
        if (result) {
            isGameActive = false;
            if (result === 'draw') {
                status.textContent = "It's a Draw!";
                winnerPopup.textContent = "It's a Draw!";
                winnerPopup.classList.add('show');
                setTimeout(() => winnerPopup.classList.remove('show'), 2000);
            } else {
                status.textContent = `Player ${result.toUpperCase()} Wins!`;
                winnerPopup.textContent = `Player ${result.toUpperCase()} Wins!`;
                winnerPopup.classList.add('show');
                setTimeout(() => winnerPopup.classList.remove('show'), 3000);
            }
        } else {
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            status.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;

            if (isPlayerVsComputer && currentPlayer === 'o') {
                setTimeout(() => {
                    computerMove();
                    const resultAfterMove = checkWin();
                    if (resultAfterMove) {
                        isGameActive = false;
                        if (resultAfterMove === 'draw') {
                            status.textContent = "It's a Draw!";
                            winnerPopup.textContent = "It's a Draw!";
                            winnerPopup.classList.add('show');
                            setTimeout(() => winnerPopup.classList.remove('show'), 2000);
                        } else {
                            status.textContent = `Player ${resultAfterMove.toUpperCase()} Wins!`;
                            winnerPopup.textContent = `Player ${resultAfterMove.toUpperCase()} Wins!`;
                            winnerPopup.classList.add('show');
                            setTimeout(() => winnerPopup.classList.remove('show'), 3000);
                        }
                    } else {
                        currentPlayer = 'x';
                        status.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
                    }
                }, 500);
            }
        }
    };
    
    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'x';
        isGameActive = true;
        status.textContent = "Player X's Turn";
        cells.forEach(cell => {
            cell.classList.remove('x', 'o');
            cell.textContent = '';
        });
        winnerPopup.classList.remove('show');
    };

    const handleModeChange = () => {
        isPlayerVsComputer = modeSelect.value === 'computer';
        resetGame();
    };

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetBtn.addEventListener('click', resetGame);
    modeSelect.addEventListener('change', handleModeChange);
});

import { useState } from 'react';
import './style.css';

const Game = () => {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<TicTacToe />
		</div>
	);
};

const TicTacToe = () => {
	const [grid, setGrid] = useState(Array(9).fill(''));
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [gameStatus, setGameStatus] = useState('');

	const handleClick = (index) => {
		const newGrid = [...grid];
		if (newGrid[index] === '' && gameStatus === '') {
			newGrid[index] = currentPlayer;
			setGrid(newGrid);
			setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
			checkWin(newGrid);
		}
	};

	const checkWin = (newGrid) => {
		const winConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < winConditions.length; i++) {
			const [a, b, c] = winConditions[i];
			if (
				newGrid[a] === newGrid[b] &&
				newGrid[b] === newGrid[c] &&
				newGrid[a] !== ''
			) {
				setGameStatus(`Player ${newGrid[a]} won!`);
				return;
			}
		}
		if (!newGrid.includes('')) {
			setGameStatus('Draw!');
		}
	};

	const renderSquare = (index) => {
		return (
			<div
				className="square"
				onClick={() => handleClick(index)}
				key={index}
			>
				{grid[index]}
			</div>
		);
	};

	return (
		<div className="game-container">
			<div className="status">
				{gameStatus === ''
					? `Current Player: ${currentPlayer}`
					: gameStatus}
			</div>
			<div className="board">
				{grid.map((square, index) => renderSquare(index))}
			</div>
		</div>
	);
};

export default Game;

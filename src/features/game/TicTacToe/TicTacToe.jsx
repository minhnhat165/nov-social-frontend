import './style.css';

import { ArrowPathIcon, Cog6ToothIcon } from 'components/Icon';
import { useEffect, useState } from 'react';

import IconButton from 'components/Action/IconButton';
import IconWrapper from 'components/Icon/IconWrapper';
import OIcon from './O';
import XIcon from './X';
import clsx from 'clsx';

const TicTacToe = () => {
	// generate grid 100x100
	const defaultGrid = Array(16)
		.fill(null)
		.map(() => Array(16).fill(null));

	const [grid, setGrid] = useState(defaultGrid);
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [winner, setWinner] = useState(null);
	const [winPosition, setWinPosition] = useState([]);

	const handleClick = (i, j) => {
		if (winner) return;
		const updatedGrid = [...grid];
		if (updatedGrid[i][j] !== null) return;
		updatedGrid[i][j] = currentPlayer;
		setGrid(updatedGrid);
		setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
	};

	const checkWin = () => {
		// Check rows
		let position = [];
		for (let i = 0; i < grid.length; i++) {
			let count = 1;
			position.push([i, 0]);
			for (let j = 1; j < grid[i].length; j++) {
				if (
					grid[i][j] === grid[i][j - 1] &&
					grid[i][j] !== null &&
					grid[i][j - 1] !== null
				) {
					count++;
					position.push([i, j]);
				} else {
					count = 1;
					position = [[i, j]];
				}
				if (count === 5) {
					setWinPosition(position);
					return true;
				}
			}
		}

		// Check columns
		position = [];
		for (let j = 0; j < grid[0].length; j++) {
			let count = 1;
			position.push([0, j]);
			for (let i = 1; i < grid.length; i++) {
				if (
					grid[i][j] === grid[i - 1][j] &&
					grid[i][j] !== null &&
					grid[i - 1][j] !== null
				) {
					count++;
					position.push([i, j]);
				} else {
					count = 1;
					position = [[i, j]];
				}
				if (count === 5) {
					setWinPosition(position);
					return true;
				}
			}
		}

		// Check diagonals

		for (let i = 0; i < grid.length - 4; i++) {
			position = [];
			for (let j = 0; j < grid[i].length - 4; j++) {
				position = [];
				let count = 1;
				position.push([i, j]);
				for (let k = 1; k < 5; k++) {
					if (
						grid[i + k][j + k] === grid[i + k - 1][j + k - 1] &&
						grid[i + k][j + k] !== null &&
						grid[i + k - 1][j + k - 1] !== null
					) {
						count++;
						position.push([i + k, j + k]);
					}
					if (count === 5) {
						setWinPosition([...position]);
						return true;
					}
				}
				count = 1;
				position = [[i, j]];
				for (let k = 1; k < 5; k++) {
					if (
						grid[i + k][j - k] === grid[i + k - 1][j - k + 1] &&
						grid[i + k][j - k] !== null &&
						grid[i + k - 1][j - k + 1] !== null
					) {
						count++;
						position.push([i + k, j - k]);
					}
					if (count === 5) {
						setWinPosition(position);
						return true;
					}
				}
			}
		}
		return false;
	};

	useEffect(() => {
		if (checkWin()) {
			setWinner(currentPlayer === 'X' ? 'O' : 'X');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [grid]);

	return (
		<div className="rounded-xl bg-white">
			<div className="relative">
				{grid.map((row, i) => (
					<div key={i} className={clsx('flex h-9')}>
						{row.map((col, j) => (
							<button
								className={clsx(
									'h-full w-9 border-collapse border p-2 hover:bg-slate-200',
									winPosition.some(
										([x, y]) => x === i && y === j,
									) && 'border-none bg-green-200',
								)}
								key={j}
								onClick={() => handleClick(i, j)}
							>
								{grid[i][j] === 'X' ? (
									<XIcon color="#3c89d3" />
								) : grid[i][j] === 'O' ? (
									<OIcon color="#38bcd3" />
								) : null}
							</button>
						))}
					</div>
				))}

				<div className="absolute left-full top-0 ml-2 flex h-10 w-10 translate-x-1 flex-col gap-2">
					<IconWrapper>
						<XIcon
							color={currentPlayer === 'X' ? '#3c89d3' : 'gray'}
						/>
					</IconWrapper>
					<IconWrapper>
						<OIcon
							color={currentPlayer === 'O' ? '#3c89d3' : 'gray'}
						/>
					</IconWrapper>
				</div>
			</div>
			<div className="flex h-14 items-center justify-center gap-10">
				<IconButton
					color="secondary"
					onClick={() => {
						setWinPosition([]);
						setGrid(defaultGrid);
						setCurrentPlayer('X');
						setWinner(null);
					}}
				>
					<ArrowPathIcon />
				</IconButton>

				<div className="flex h-8 w-[4.5rem] items-center justify-between gap-2 rounded-full border px-1">
					<IconWrapper className="relative h-5 w-5 rounded-full p-1">
						<div className="position-center absolute  h-9 w-9 rounded-full bg-[#3c89d3]"></div>
						<XIcon color="white" className="relative" />
					</IconWrapper>
					<IconWrapper>
						<OIcon color="#38bcd3" />
					</IconWrapper>
				</div>
				<IconButton
					rounded
					color="secondary"
					onClick={() => {
						setGrid(defaultGrid);
						setWinPosition([]);
						setCurrentPlayer('X');
						setWinner(null);
					}}
				>
					<Cog6ToothIcon />
				</IconButton>
			</div>
		</div>
	);
};

TicTacToe.propTypes = {};

export default TicTacToe;

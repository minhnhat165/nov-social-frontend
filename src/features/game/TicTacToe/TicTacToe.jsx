import './style.css';

import { ArrowPathIcon, Cog6ToothIcon } from 'components/Icon';
import { Avatar, IconWrapper } from 'components/DataDisplay';
import { useEffect, useState } from 'react';

import { IconButton } from 'components/Action';
import OIcon from './O';
import XIcon from './X';
import clsx from 'clsx';
import socket from 'configs/socket-config';
import { useSelector } from 'react-redux';

const defaultGrid = Array(16)
	.fill(null)
	.map(() => Array(16).fill(null));

const TicTacToe = ({ roomId }) => {
	const user = useSelector((state) => state.auth.user);
	const userId = useSelector((state) => state.auth.user._id);
	const [room, setRoom] = useState(null);

	const [turn, setTurn] = useState(null);

	const isMyTurn = turn?._id === userId;

	const [grid, setGrid] = useState(defaultGrid);
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [winner, setWinner] = useState(null);
	const [winPosition, setWinPosition] = useState([]);

	const handleClick = (i, j) => {
		if (!isMyTurn) return;
		if (winner) return;
		const updatedGrid = [...grid];
		if (updatedGrid[i][j] !== null) return;
		updatedGrid[i][j] = currentPlayer;
		socket.emit('client.game.tictactoe.move', {
			roomId,
			grid: updatedGrid,
		});
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

	useEffect(() => {
		if (!roomId) return;
		socket.emit('client.game.room.join', {
			roomId,
			user: {
				_id: user._id,
				name: user.name,
				username: user.username,
				avatar: user.avatar,
			},
		});
		socket.on('server.game.room.join', (room) => {
			setRoom(room);
			if (room?.turn) {
				setTurn(room.turn);
				setCurrentPlayer(room.turn.symbol);
			}
			if (room?.grid) setGrid(room.grid);
		});

		socket.on('server.game.tictactoe.move', (room) => {
			setRoom((prev) => ({ ...prev, ...room }));
			setGrid(room.grid);
			setTurn(room.turn);
			setCurrentPlayer(room.turn.symbol);
		});

		socket.on('server.game.room.leave', (room) => {
			setRoom(null);
		});
		socket.on('server.game.tictactoe.reset', (room) => {
			setGrid(
				Array(16)
					.fill(null)
					.map(() => Array(16).fill(null)),
			);
			setTurn(room.turn);
			setCurrentPlayer(room.turn.symbol);
			setWinner(null);
			setWinPosition([]);
		});

		return () => {
			socket.off('server.game.room.join');
			socket.emit('client.game.room.leave', roomId);
		};
	}, [roomId, user._id, user.avatar, user.name, user.username]);

	return (
		<div className="relative rounded-r-xl bg-white">
			<div className="relative">
				<div className="h-full w-full overflow-hidden rounded-r-xl">
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
				</div>
			</div>
			<div className="flex h-14 items-center justify-center gap-10">
				<IconButton
					disabled={!winner}
					color="secondary"
					onClick={() => {
						socket.emit('client.game.tictactoe.reset', roomId);
					}}
				>
					<ArrowPathIcon />
				</IconButton>

				<div className="flex items-center">
					<Avatar src={room?.players[0]?.avatar} />
				</div>

				<div className="relative flex h-8 w-[4.5rem] items-center justify-between gap-2 rounded-full border px-1">
					<div
						className={clsx(
							'position-center absolute  h-9 w-9 rounded-full bg-[#3c89d3]',
							turn?.symbol === 'X' ? '-left-0.5' : '-right-0.5',
						)}
					></div>

					<IconWrapper className="h-5 w-5 rounded-full p-1">
						<XIcon
							color={turn?.symbol === 'X' ? 'white' : '#3c89d3'}
							className="relative"
						/>
					</IconWrapper>
					<IconWrapper>
						<OIcon
							color={turn?.symbol !== 'X' ? 'white' : '#3c89d3'}
							className=" relative"
						/>
					</IconWrapper>
				</div>
				<div className="flex items-center">
					<Avatar src={room?.players[1]?.avatar} />
				</div>
				<IconButton rounded color="secondary">
					<Cog6ToothIcon />
				</IconButton>
			</div>
			{room?.status !== 'playing' && (
				<div className="absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-r-xl backdrop-blur-sm">
					<span className="text-3xl">
						{!roomId
							? 'Create or join a room to play'
							: 'Waiting for players...'}
					</span>
				</div>
			)}
		</div>
	);
};

TicTacToe.propTypes = {};

export default TicTacToe;

import { Avatar, IconWrapper } from 'components/DataDisplay';
import { Button, IconButton } from 'components/Action';
import { useEffect, useRef, useState } from 'react';

import { ArrowLeftIcon } from 'components/Icon';
import { Input } from 'components/DataEntry';
import Layer from 'components/Layout/Layer';
import OIcon from 'features/game/TicTacToe/O';
import { SendIcon } from 'components/Icon/SendIcon';
import { Text } from 'components/Typography';
import TicTacToe from 'features/game/TicTacToe';
import { UserItem } from 'features/user/components';
import XIcon from 'features/game/TicTacToe/X';
import clsx from 'clsx';
import socket from 'configs/socket-config';
import { useScreenMode } from 'hooks/useScreenMode';
import { useSelector } from 'react-redux';

const Game = () => {
	const user = useSelector((state) => state.auth.user);
	const [rooms, setRooms] = useState([]);

	const { isMobile } = useScreenMode();

	const [joinedRoomId, setJoinedRoomId] = useState(null);
	const createNewRoom = () => {
		const room = {
			_id: crypto.randomUUID(),
			host: {
				_id: user._id,
				name: user.name,
				username: user.username,
				avatar: user.avatar,
			},
			players: [],
			status: 'waiting',
			audience: [],
			messages: [],
		};
		setRooms([...rooms, room]);
		socket.emit('client.game.room.create', room);
	};

	useEffect(() => {
		socket.emit('client.game.tictactoe.join');
		socket.on('server.game.tictactoe.join', (rooms) => {
			setRooms(rooms);
		});
		socket.on('server.game.room.create', (room) => {
			setRooms((prev) => [...prev, room]);
		});

		return () => {
			socket.off('server.game.room.create');
			socket.off('server.game.tictactoe.join');
		};
	}, []);

	const [visibleSidebar, setVisibleSidebar] = useState(true);

	const hideSidebar = () => {
		setVisibleSidebar(false);
	};

	const showSidebar = () => {
		setVisibleSidebar(true);
	};

	return (
		<div className="relative flex h-[calc(100vh_-_96px)] w-screen justify-center overflow-hidden sm:h-screen sm:p-10 sm:pt-10">
			<Layer
				responsive
				level={1}
				className={clsx(
					'fixed left-0 top-0 z-[10] flex h-full w-full flex-col !rounded-r-none pt-24 sm:relative sm:w-[340px] sm:pt-0',
					visibleSidebar ? 'flex' : 'hidden',
				)}
			>
				{joinedRoomId ? (
					<Chat
						room={rooms.find((room) => room._id === joinedRoomId)}
						onLeave={() => {
							setJoinedRoomId(null);
						}}
						onBackToGame={hideSidebar}
						isMobile={isMobile}
					/>
				) : (
					<RoomFolder
						rooms={rooms}
						onSelectRoom={(room) => {
							setJoinedRoomId(room._id);
							if (isMobile) {
								hideSidebar();
							}
						}}
					/>
				)}
				{!joinedRoomId && (
					<Layer
						level={1}
						className="mt-auto flex w-full flex-col gap-2 p-2"
					>
						<Button
							onClick={createNewRoom}
							className="!bg-green-500"
						>
							Create
						</Button>
					</Layer>
				)}
			</Layer>
			<TicTacToe roomId={joinedRoomId} onClickSettings={showSidebar} />
		</div>
	);
};

const Chat = ({ room, onLeave, isMobile, onBackToGame }) => {
	const [messages, setMessages] = useState([]);
	const chatContainerRef = useRef(null);

	const user = useSelector((state) => state.auth.user);
	const createMessage = (e) => {
		e.preventDefault();
		const content = e.target[0].value;
		const message = {
			_id: crypto.randomUUID(),
			content,
			sender: {
				_id: user._id,
				name: user.name,
				username: user.username,
				avatar: user.avatar,
			},
		};
		e.target[0].value = '';

		setMessages([...messages, message]);

		socket.emit('client.game.room.message.send', {
			message,
			roomId: room._id,
		});
	};

	useEffect(() => {
		socket.on('server.game.room.message.send', (message) => {
			setMessages((prev) => [...prev, message]);
		});
		return () => {
			socket.off('server.game.room.message.send');
		};
	}, []);

	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center gap-4 p-2 shadow">
				{!isMobile ? (
					<>
						<IconButton onClick={onLeave} rounded size="md">
							<ArrowLeftIcon />
						</IconButton>
						<Text>Room of {room?.host?.name}</Text>
					</>
				) : (
					<div className="flex w-full justify-between">
						<Button onClick={onLeave} rounded>
							Leave room
						</Button>
						<Button onClick={onBackToGame} rounded>
							Back to game
						</Button>
					</div>
				)}
			</div>

			<div
				ref={chatContainerRef}
				className="flex flex-1 flex-col-reverse overflow-y-scroll"
			>
				<div className="flex w-full flex-col gap-2 px-2">
					{messages.map((message) => {
						return (
							<div
								key={message._id}
								className={clsx(
									'ml-auto flex w-full gap-2',
									message.sender._id === user._id
										? 'flex-row-reverse'
										: 'flex-row',
								)}
							>
								<Avatar size="sm" src={message.sender.avatar} />
								<Text>{message.content}</Text>
							</div>
						);
					})}
				</div>
			</div>
			<Layer className="p-2 ">
				<form className="flex gap-2" onSubmit={createMessage}>
					<Input size="md"></Input>
					<IconButton type="submit" size="md">
						<SendIcon />
					</IconButton>
				</form>
			</Layer>
		</div>
	);
};

const RoomFolder = ({ rooms, onSelectRoom }) => {
	return (
		<>
			<div className="flex w-full items-center justify-center gap-2 p-2 py-4 shadow">
				<IconWrapper>
					<XIcon color="#3c89d3" />
				</IconWrapper>
				<Text className="text-center text-xl font-bold">
					Tic Tac Toe
				</Text>
				<IconWrapper>
					<OIcon color="#38bcd3" />
				</IconWrapper>{' '}
			</div>
			<div className="p-2">
				{rooms.map((room) => {
					return (
						<div key={room._id} className="flex flex-col gap-2">
							<UserItem
								onClick={() => {
									onSelectRoom(room);
								}}
								user={room.host}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Game;

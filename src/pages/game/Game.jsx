import { Button, IconButton } from 'components/Action';
import { useEffect, useRef, useState } from 'react';

import { ArrowLeftIcon } from 'components/Icon';
import { Avatar } from 'components/DataDisplay';
import { Input } from 'components/DataEntry';
import Layer from 'components/Layout/Layer';
import { SendIcon } from 'components/Icon/SendIcon';
import { Text } from 'components/Typography';
import TicTacToe from 'features/game/TicTacToe';
import { UserItem } from 'features/user/components';
import clsx from 'clsx';
import socket from 'configs/socket-config';
import { useSelector } from 'react-redux';

const Game = () => {
	const user = useSelector((state) => state.auth.user);
	const [rooms, setRooms] = useState([]);

	const [currentRoomId, setCurrentRoomId] = useState(null);
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
		socket.on('server.game.room.create', (room) => {
			setRooms((prev) => [...prev, room]);
		});

		return () => {
			socket.off('server.game.room.create');
		};
	}, []);

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="relative">
				<Layer
					level={1}
					className="absolute -left-0 flex h-full w-[340px] -translate-x-full flex-col rounded-r-none"
				>
					{joinedRoomId ? (
						<Chat
							room={rooms.find(
								(room) => room._id === joinedRoomId,
							)}
							onLeave={() => {
								setJoinedRoomId(null);
							}}
						/>
					) : (
						<RoomFolder
							rooms={rooms}
							onSelectRoom={(room) => {
								setCurrentRoomId(room._id);
							}}
							selectedRoomId={currentRoomId}
						/>
					)}
					{!joinedRoomId && (
						<Layer
							level={1}
							className="mt-auto flex w-full flex-col gap-2 p-2"
						>
							{currentRoomId ? (
								<Button
									className="!bg-green-500"
									onClick={() => {
										setJoinedRoomId(currentRoomId);
									}}
								>
									Join
								</Button>
							) : (
								<Button
									onClick={createNewRoom}
									className="!bg-green-500"
								>
									Create
								</Button>
							)}
						</Layer>
					)}
				</Layer>
				<TicTacToe roomId={joinedRoomId} />
			</div>
		</div>
	);
};

const Chat = ({ room, onLeave }) => {
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
		setTimeout(() => {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}, 100);

		socket.emit('client.game.room.message.send', {
			message,
			roomId: room._id,
		});
	};

	useEffect(() => {
		socket.on('server.game.room.message.send', (message) => {
			setMessages((prev) => [...prev, message]);
			setTimeout(() => {
				chatContainerRef.current.scrollTop =
					chatContainerRef.current.scrollHeight;
			}, 100);
		});
		return () => {
			socket.off('server.game.room.message.send');
		};
	}, []);

	return (
		<div className="flex h-full flex-col">
			<div className="flex items-center gap-4 p-2 shadow">
				<IconButton onClick={onLeave} rounded size="md">
					<ArrowLeftIcon />
				</IconButton>
				<Text>Room of {room?.host?.name}</Text>
			</div>
			<div
				ref={chatContainerRef}
				className="flex flex-1 overflow-y-scroll"
			>
				<div className="mt-auto flex w-full flex-col gap-2 px-2">
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

const RoomFolder = ({ rooms, onSelectRoom, selectedRoomId }) => {
	return (
		<div className="p-2">
			{rooms.map((room) => {
				return (
					<div key={room._id} className="flex flex-col gap-2">
						<UserItem
							onClick={() => {
								onSelectRoom(room);
							}}
							className={
								selectedRoomId === room._id
									? '!bg-yellow-300/50'
									: ''
							}
							user={room.host}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default Game;

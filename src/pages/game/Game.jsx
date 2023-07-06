import { useEffect, useState } from 'react';

import { Button } from 'components/Action';
import Layer from 'components/Layout/Layer';
import { Text } from 'components/Typography';
import TicTacToe from 'features/game/TicTacToe';
import { UserItem } from 'features/user/components';
import socket from 'configs/socket-config';
import { useSelector } from 'react-redux';

const Game = () => {
	const user = useSelector((state) => state.auth.user);
	const [rooms, setRooms] = useState([]);

	const [currentRoomId, setCurrentRoomId] = useState(null);
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
					className="absolute -left-0 flex h-full w-[340px] -translate-x-full flex-col rounded-r-none p-2"
				>
					{rooms.map((room) => {
						return (
							<div key={room._id} className="flex flex-col gap-2">
								<UserItem
									onClick={() => {
										setCurrentRoomId(room._id);
									}}
									className={
										currentRoomId === room._id
											? '!bg-yellow-300/50'
											: ''
									}
									user={room.host}
								/>
							</div>
						);
					})}
					<Layer
						level={2}
						className="mt-auto flex w-full flex-col gap-2 p-2"
					>
						<Button fullWidth onClick={createNewRoom}>
							Create new room
						</Button>
					</Layer>
				</Layer>
				<TicTacToe roomId={currentRoomId} />
			</div>
		</div>
	);
};

export default Game;

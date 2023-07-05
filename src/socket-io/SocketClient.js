import React, { useEffect } from 'react';
import {
	addUserOnline,
	removeUserOnline,
	setUserOnlineIds,
} from 'store/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';

import socket from 'configs/socket-config';

const SocketClient = () => {
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	useEffect(() => {
		socket.connect();
		function onConnect() {
			console.log('connected');
			if (user?._id) {
				socket.emit('client.join', user._id);
			}
		}

		function onDisconnect() {
			console.log('disconnected');
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('server.user.online', (userId) => {
			dispatch(addUserOnline(userId));
		});
		socket.on('server.user.online.all', (userIds) => {
			dispatch(setUserOnlineIds(userIds));
		});

		socket.on('server.user.offline', (userId) => {
			dispatch(removeUserOnline(userId));
		});

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
			socket.off('server.user.online');
			socket.off('server.user.online.all');
			socket.off('server.user.offline');
			socket.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?._id]);

	return <></>;
};

export default React.memo(SocketClient);

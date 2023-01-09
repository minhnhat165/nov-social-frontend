import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { updateConversations } from '../redux/slices/chatSlice';
import {
	addNotification,
	removeNotification,
} from '../redux/slices/notificationSlice';
import { setSocket } from '../redux/slices/socketSlice';

const SocketClient = () => {
	// const dispatch = useDispatch();
	// const socket = useSelector((state) => state.socket.socket);
	// const user = useSelector((state) => state.auth.user);
	// useEffect(() => {
	// 	let socket = io.connect(process.env.REACT_APP_SERVER_URL);

	// 	dispatch(setSocket(socket));
	// 	socket.emit('join user', user);
	// 	return () => {
	// 		socket.close();
	// 	};
	// }, [user._id]);

	// useEffect(() => {
	// 	if (socket) {
	// 		socket.on('update room', (data) => {
	// 			dispatch(updateConversations(data));
	// 		});

	// 		socket.on('receive notification', (notification) => {
	// 			dispatch(addNotification(notification));
	// 		});

	// 		socket.on('receive remove notification', (notificationId) => {
	// 			dispatch(removeNotification(notificationId));
	// 		});
	// 		socket.on('check user online', (data) => {
	// 			console.log(data);
	// 		});
	// 	}
	// 	return () => {
	// 		if (socket) {
	// 			socket.off('remove comment');
	// 			socket.off('update room');
	// 			socket.off('receive notification');
	// 		}
	// 	};
	// }, [socket]);

	return <></>;
};

export default React.memo(SocketClient);

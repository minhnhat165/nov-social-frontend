import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Badge } from 'components/DataDisplay';
import { BellIcon } from 'components/Icon';
import notifySound from 'assets/sounds/notify.wav';
import { readNotify } from 'api/userApi';
import socket from 'configs/socket-config';
import { updateUser } from 'store/slices/authSlice';
import { useMutation } from 'react-query';

export const NotificationBell = () => {
	const dispatch = useDispatch();
	const { mutate } = useMutation(readNotify, {
		onSuccess: () => {
			dispatch(updateUser({ numNotifications: 0 }));
		},
	});
	const _numNotifications = useSelector(
		(state) => state.auth.user?.numNotifications,
	);

	const [numNotifications, setNumNotifications] = useState(_numNotifications);

	useEffect(() => {
		socket.on('server.notification.count', (num) => {
			setNumNotifications(num);
			new Audio(notifySound).play();
		});
		return () => {
			socket.off('server.notification.count');
		};
	}, []);

	useEffect(() => {
		setNumNotifications(_numNotifications);
	}, [_numNotifications]);
	return (
		<div
			onClick={() => {
				if (numNotifications > 0) {
					mutate();
				}
			}}
		>
			<Badge count={numNotifications}>
				<BellIcon />
			</Badge>
		</div>
	);
};

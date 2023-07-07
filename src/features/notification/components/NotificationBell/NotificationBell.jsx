import { readNotify } from 'api/userApi';
import { Badge } from 'components/DataDisplay';
import { BellIcon } from 'components/Icon';
import socket from 'configs/socket-config';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from 'store/slices/authSlice';

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

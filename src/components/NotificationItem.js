import { intlFormatDistance } from 'date-fns';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setReadNotification } from '../redux/slices/notificationSlice';
import { setReadNotification as setReadNotificationApi } from '../api/notifyApi';
import Avatar from './Avatar';
import { notificationIcons } from './WidgetNotification';

const NotificationItem = ({ notification }) => {
	const time = useMemo(() => {
		return intlFormatDistance(new Date(notification.updatedAt), new Date());
	}, [notification.updatedAt]);
	const dispatch = useDispatch();

	const handleClick = () => {
		if (notification.isRead) return;
		setReadNotificationApi(notification._id);
		dispatch(setReadNotification(notification._id));
	};

	return (
		<Link
			to={notification.url || 'http://localhost:3000'}
			className="flex cursor-pointer gap-2 rounded-lg p-2 transition-all dark:hover:bg-dark-light"
			onClick={handleClick}
		>
			<div className="pt-1">
				<div
					className={`h-3 w-3 rounded-full ${
						notification.isRead ? 'bg-transparent' : 'bg-primary'
					}`}
				></div>
			</div>
			<div className="flex flex-1 flex-col gap-1">
				<span className="text-sm font-light">
					<span className="font-normal dark:text-dark-text-bold">
						{notification.sender.name}
					</span>{' '}
					<span> {notification.text}</span>
				</span>

				<span className="text-xs font-light">
					{notificationIcons[notification.type]} {time}
				</span>
			</div>
			<div className="flex items-center">
				<Avatar url={notification.sender.avatar} />
				<span className="text-sm text-primary"></span>
			</div>
		</Link>
	);
};

export default NotificationItem;

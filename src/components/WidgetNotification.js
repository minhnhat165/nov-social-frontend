import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '../redux/slices/notificationSlice';
import NotificationItem from './NotificationItem';

export const notificationIcons = {
	post: <i className="fa-solid fa-newspaper text-primary"></i>,
	like: <i className="fa-solid fa-heart text-red-400"></i>,
	comment: <i className="fa-solid fa-comment text-green-400"></i>,
};

const WidgetNotification = () => {
	const { isFirstLoaded, data: notifications } = useSelector(
		(state) => state.notification
	);
	const dispatch = useDispatch();
	useEffect(() => {
		if (isFirstLoaded) return;
		dispatch(getNotifications());
	}, []);

	return (
		<div className="scrollAble scroll-bar-hover max-height w-80 rounded-xl px-1 dark:bg-dark-semiBold">
			{notifications.length > 0 ? (
				<div className="flex flex-col py-1">
					{notifications.map((notification) => (
						<div
							key={notification._id}
							className="border-b border-dark-border/50 py-1 last:border-0"
						>
							<NotificationItem notification={notification} />
						</div>
					))}
				</div>
			) : (
				<div className="flex h-40 w-full items-center justify-center font-light dark:text-dark-text-bold">
					Oops! Nothing to see here
				</div>
			)}
		</div>
	);
};

export default WidgetNotification;

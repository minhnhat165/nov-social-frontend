import { Avatar, IconWrapper, TimeDisplay } from 'components/DataDisplay';
import { CheckIcon, TrashIcon } from 'components/Icon';
import {
	deleteNotification,
	markNotificationAsRead,
} from 'api/notificationApi';
import { memo, useEffect, useMemo, useState } from 'react';

import { IconButton } from 'components/Action';
import Layer from 'components/Layout/Layer';
import { Link } from 'react-router-dom';
import { Text } from 'components/Typography';
import { generateNotification } from 'features/notification/utils';
import { useMutation } from 'react-query';

const Notification = ({
	notification: initialNotification,
	onDelete,
	onRead,
}) => {
	const [notification, setNotification] = useState(initialNotification);

	useEffect(() => {
		setNotification((prev) => ({ ...prev, ...initialNotification }));
	}, [initialNotification]);

	const { createdAt, isRead, sender, _id, message } = notification;

	const { icon, link } = useMemo(() => {
		return generateNotification(notification);
	}, [notification]);

	const markAsRead = useMutation(markNotificationAsRead);
	const handleRead = (e) => {
		setNotification((prev) => ({ ...prev, isRead: true }));
		onRead && onRead(_id);
		markAsRead.mutate(_id);
	};

	const deleteNotificationMuTation = useMutation(deleteNotification);

	const handleDelete = (e) => {
		onDelete && onDelete(_id);
		deleteNotificationMuTation.mutate(_id);
	};

	return (
		<Link
			to={link}
			onClick={handleRead}
			className="group cursor-pointer rounded-lg p-2 dark:hover:bg-dark-700"
		>
			<div className="flex items-center gap-4">
				<Avatar src={sender.avatar} />
				<div>
					<Text as="p">
						<Text className="font-semibold">{sender.name}</Text>{' '}
						{message}.
					</Text>
				</div>
				<div className="ml-auto">
					<IconWrapper>{icon}</IconWrapper>
				</div>
			</div>
			<div className="mt-1 flex items-center gap-2">
				{!isRead && (
					<div className="h-2 w-2 rounded-full bg-primary-500"></div>
				)}
				<Text level={2} className="text-sm first-letter:uppercase">
					<TimeDisplay
						date={createdAt}
						addSuffix={true}
						styleDisplay="long"
						secondsAlternativeText="Few seconds ago"
					/>
				</Text>
				<div className="ml-auto flex items-center gap-2 opacity-0 transition-all group-hover:opacity-100">
					{!isRead && (
						<IconButton
							size="xs"
							color="secondary"
							rounded
							variant="text"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								handleRead();
							}}
						>
							<CheckIcon />
						</IconButton>
					)}
					<IconButton
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							handleDelete();
						}}
						size="xs"
						color="secondary"
						rounded
						variant="text"
					>
						<TrashIcon />
					</IconButton>
				</div>
			</div>
		</Link>
	);
};

const NotificationSkeleton = () => {
	return (
		<div className="animate-pulse rounded-lg p-2 dark:hover:bg-dark-700">
			<div className="flex items-center gap-4">
				<Layer level={3} className="h-10 w-10 rounded-full"></Layer>
				<Layer
					level={3}
					className="h-4 flex-1 rounded bg-gray-300"
				></Layer>
			</div>
			<div className="mt-2 flex items-center gap-2">
				<Layer level={3} className="h-2 w-2 rounded-full "></Layer>
				<Layer level={3} className="h-4 w-40 rounded"></Layer>
			</div>
		</div>
	);
};

const NotificationMemo = memo(Notification);

export { NotificationMemo as Notification, NotificationSkeleton };

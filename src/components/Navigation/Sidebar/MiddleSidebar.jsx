import { BellIcon, BookmarkIcon, MessagesIcon } from 'components/Icon';
import { Popover, Tooltip } from 'components/OverLay';
import { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Badge } from 'components/DataDisplay';
import { BookmarkPanel } from 'features/bookmark/components';
import Layer from 'components/Layout/Layer';
import { NotificationPanel } from 'features/notification';
import { Text } from 'components/Typography';
import clsx from 'clsx';
import { readNotify } from 'api/userApi';
import socket from 'configs/socket-config';
import { updateUser } from 'store/slices/authSlice';
import { useMutation } from 'react-query';

const types = {
	CHAT: 'CHAT',
	NOTIFICATIONS: 'NOTIFICATIONS',
	BOOKMARKS: 'BOOKMARKS',
};

const MiddleSidebar = () => {
	const [currentActiveType, setCurrentActiveType] = useState(null);

	const handleClick = (type) => {
		if (currentActiveType === type) {
			setCurrentActiveType(null);
			return;
		}
		setCurrentActiveType(type);
	};
	return (
		<div className="mx-1 flex w-14 flex-col gap-4 px-2 py-4">
			<Chat
				isActive={currentActiveType === types.CHAT}
				onClick={handleClick}
			/>
			<Notifications
				isActive={currentActiveType === types.NOTIFICATIONS}
				onClick={handleClick}
			/>
			<Bookmarks
				isActive={currentActiveType === types.BOOKMARKS}
				onClick={handleClick}
			/>
		</div>
	);
};

const Item = forwardRef(
	({ isActive, icon, onClick, tooltipContent, ...props }, ref) => {
		return (
			<Tooltip placement="right" content={tooltipContent}>
				<div
					onClick={onClick}
					ref={ref}
					className={clsx(
						'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all last:mb-0 active:scale-90 ',
						isActive
							? 'text-primary-700 dark:text-primary-500'
							: 'hover:bg-slate-200s dark:hover:bg-dark-900s text-slate-500 hover:text-slate-800 dark:text-dark-400 dark:hover:text-dark-50',
					)}
					{...props}
				>
					<div className="h-6 w-6">{icon}</div>
				</div>
			</Tooltip>
		);
	},
);

const Notifications = ({ onClick, isActive }) => {
	const dispatch = useDispatch();
	const _numNotifications = useSelector(
		(state) => state.auth.user?.numNotifications,
	);

	const [numNotifications, setNumNotifications] = useState(_numNotifications);
	const { mutate } = useMutation(readNotify, {
		onSuccess: () => {
			dispatch(updateUser({ numNotifications: 0 }));
		},
	});

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
		<Popover
			onClickOutside={() => {
				onClick(types.NOTIFICATIONS);
			}}
			interactive
			placement="right-start"
			offset={[0, 14]}
			render={(attrs) => (
				<Popover.Content
					{...attrs}
					className="h-screen !bg-transparent pb-1.5"
				>
					<NotificationPanel />
				</Popover.Content>
			)}
		>
			<Item
				onClick={() => {
					onClick(types.NOTIFICATIONS);
					if (numNotifications > 0) {
						mutate();
					}
				}}
				isActive={isActive}
				icon={
					<Badge count={numNotifications}>
						<BellIcon />
					</Badge>
				}
				tooltipContent="Notifications"
			/>
		</Popover>
	);
};

const Bookmarks = ({ onClick, isActive }) => {
	return (
		<Popover
			interactive
			placement="right-start"
			offset={[0, 14]}
			onClickOutside={() => {
				onClick(types.BOOKMARKS);
			}}
			render={(attrs) => (
				<Popover.Content
					{...attrs}
					className="h-screen !bg-transparent pb-1.5"
				>
					<BookmarkPanel />
				</Popover.Content>
			)}
		>
			<Item
				isActive={isActive}
				icon={<BookmarkIcon />}
				tooltipContent="Bookmarks"
				onClick={() => {
					onClick(types.BOOKMARKS);
				}}
			/>
		</Popover>
	);
};

const Chat = ({ onClick, isActive }) => {
	return (
		<Popover
			onClickOutside={() => {
				onClick(types.CHAT);
			}}
			interactive
			placement="right-start"
			offset={[0, 14]}
			render={(attrs) => (
				<Popover.Content
					{...attrs}
					className="h-screen !bg-transparent pb-1.5"
				>
					<Layer className="flex h-full w-96 flex-col items-center justify-center rounded shadow-md">
						<Text primary className="text-4xl font-bold">
							Coming Soon
						</Text>
						<Text>This feature is under construction</Text>
					</Layer>
				</Popover.Content>
			)}
		>
			<Item
				isActive={isActive}
				icon={<MessagesIcon />}
				tooltipContent="Chat"
				onClick={() => {
					onClick(types.CHAT);
				}}
			/>
		</Popover>
	);
};

MiddleSidebar.propTypes = {};

export default MiddleSidebar;

import { Avatar, Badge, IconWrapper } from 'components/DataDisplay';
import {
	BellIcon,
	BookmarkIcon,
	CakeIcon,
	CalendarDaysIcon,
	ChatBubbleBottomCenterTextIcon,
	CheckIcon,
	Cog6ToothIcon,
	MessagesIcon,
	SparklesIcon,
	TagIcon,
	TrashIcon,
	UserIcon,
} from 'components/Icon';
import { Button, IconButton } from 'components/Action';
import { Popover, Tooltip } from 'components/OverLay';
import { forwardRef, useMemo, useState } from 'react';

import Layer from 'components/Layout/Layer';
import { Text } from 'components/Typography';
import clsx from 'clsx';
import { enUS } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns/esm';
import { useSelector } from 'react-redux';

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
	const notificationsCount = useSelector(
		(state) => state.auth.user?.notificationsCount,
	);
	return (
		<Popover
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
				isActive={isActive}
				icon={
					<Badge count={notificationsCount}>
						<BellIcon />
					</Badge>
				}
				tooltipContent="Notifications"
				onClick={() => {
					onClick(types.NOTIFICATIONS);
				}}
			/>
		</Popover>
	);
};

const Bookmarks = ({ onClick, isActive }) => {
	return (
		<Item
			isActive={isActive}
			icon={<BookmarkIcon />}
			tooltipContent="Bookmarks"
			onClick={() => {
				onClick(types.BOOKMARKS);
			}}
		/>
	);
};

const Chat = ({ onClick, isActive }) => {
	return (
		<Item
			isActive={isActive}
			icon={<MessagesIcon />}
			tooltipContent="Chat"
			onClick={() => {
				onClick(types.CHAT);
			}}
		/>
	);
};

MiddleSidebar.propTypes = {};

export default MiddleSidebar;
const NOTIFICATION_TYPES = {
	FOLLOW: 'FOLLOW',
	LIKE: 'LIKE',
	COMMENT: 'COMMENT',
	TAG: 'TAG',
	BIRTHDAY: 'BIRTHDAY',
	EVENT: 'EVENT',
};

function NotificationPanel() {
	const user = useSelector((state) => state.auth.user);

	const notifications = [
		{
			id: 1,
			sender: {
				_id: '642d01603e7d23b767a4a6e0',
				name: 'Minh Nhật Nguyễn',
				avatar: 'https://res.cloudinary.com/devemail/image/upload/c_fill,h_60,w_60/642d01603e7d23b767a4a6e0/u3zryapo5l1ubjdyjlz2',
				rank: {
					number: 3,
					dateReached: '2023-04-05T05:04:13.444Z',
				},
				username: 'MinhNhậtNguyễn',
				followingCount: 0,
				followersCount: 1,
				followed: true,
			},
			type: NOTIFICATION_TYPES.FOLLOW,
			entityID: 1,
			message: 'Someone followed you',
			createdAt: 'Sun Apr 23 2023 00:57:22 GMT+0700 (Indochina Time)',
			isRead: false,
		},
		{
			id: 2,
			sender: {
				_id: '642d23be52d07a7b67732424',
				name: 'GAM Esports LoL',
				avatar: 'https://res.cloudinary.com/devemail/image/upload/c_fill,h_60,w_60/642d23be52d07a7b67732424/wbxs5ufsbuzfqbgyklhn',
				rank: {
					number: 5,
					dateReached: '2023-04-05T07:07:38.093Z',
				},
				username: 'NhậtNguyễn',
				followingCount: 1,
				followersCount: 2,
				followed: true,
			},
			type: NOTIFICATION_TYPES.LIKE,
			entityID: 1,
			message: 'Like your post',
			createdAt: 'Sun Apr 23 2023 00:57:22 GMT+0700 (Indochina Time)',
			isRead: false,
		},
		{
			id: 3,
			sender: {
				_id: '642d12eed33f732159d63fef',
				name: 'SBTC Esports',
				avatar: 'https://res.cloudinary.com/devemail/image/upload/c_fill,h_60,w_60/642d12eed33f732159d63fef/su7s5altbaur8ijdyiih',
				rank: {
					number: 6,
					dateReached: '2023-04-05T06:17:57.887Z',
				},
				username: 'Donotthing',
				followingCount: 2,
				followersCount: 2,
				followed: true,
			},
			type: NOTIFICATION_TYPES.COMMENT,
			entityID: 1,
			message: 'Like your post',
			createdAt: 'Sun Apr 23 2023 00:57:22 GMT+0700 (Indochina Time)',
			isRead: false,
		},
		{
			id: 4,
			sender: {
				_id: '642d23be52d07a7b67732424',
				name: 'GAM Esports LoL',
				avatar: 'https://res.cloudinary.com/devemail/image/upload/c_fill,h_60,w_60/642d23be52d07a7b67732424/wbxs5ufsbuzfqbgyklhn',
				rank: {
					number: 5,
					dateReached: '2023-04-05T07:07:38.093Z',
				},
				username: 'NhậtNguyễn',
				followingCount: 1,
				followersCount: 2,
				followed: true,
			},
			type: NOTIFICATION_TYPES.TAG,
			entityID: 1,
			message: 'Like your post',
			createdAt: 'Sun Apr 23 2023 00:57:22 GMT+0700 (Indochina Time)',
			isRead: true,
		},
		{
			id: 5,
			sender: {
				_id: '642d12eed33f732159d63fef',
				name: 'SBTC Esports',
				avatar: 'https://res.cloudinary.com/devemail/image/upload/c_fill,h_60,w_60/642d12eed33f732159d63fef/su7s5altbaur8ijdyiih',
				rank: {
					number: 6,
					dateReached: '2023-04-05T06:17:57.887Z',
				},
				username: 'Donotthing',
				followingCount: 2,
				followersCount: 2,
				followed: true,
			},
			type: NOTIFICATION_TYPES.BIRTHDAY,
			entityID: 1,
			message: 'Like your post',
			createdAt: 'Sun Apr 23 2023 00:57:22 GMT+0700 (Indochina Time)',
			isRead: false,
		},
		{
			id: 6,
			sender: {
				_id: '642d01603e7d23b767a4a6e0',
				name: 'Minh Nhật Nguyễn',
				avatar: 'https://res.cloudinary.com/devemail/image/upload/c_fill,h_60,w_60/642d01603e7d23b767a4a6e0/u3zryapo5l1ubjdyjlz2',
				rank: {
					number: 3,
					dateReached: '2023-04-05T05:04:13.444Z',
				},
				username: 'MinhNhậtNguyễn',
				followingCount: 0,
				followersCount: 1,
				followed: true,
			},
			type: NOTIFICATION_TYPES.EVENT,
			entityID: 1,
			message: 'Like your post',
			createdAt: 'Sun Apr 23 2023 00:57:22 GMT+0700 (Indochina Time)',
			isRead: true,
		},
	];
	return (
		<Layer className="flex h-full w-96 flex-col rounded">
			<div className="h-14 w-full">
				<div className="flex h-full items-center justify-between px-4">
					<Text className="text-xl font-semibold">Notifications</Text>
					<div className="-mr-2 flex items-center">
						<IconButton
							size="sm"
							color="secondary"
							rounded
							variant="text"
						>
							<Cog6ToothIcon />
						</IconButton>
					</div>
				</div>
			</div>
			<div className="px-4">
				<Button.Group rounded color="secondary">
					<Button>
						<Text primary>All</Text>
					</Button>
					<Button> Unread</Button>
				</Button.Group>
			</div>
			<div className="overflow-y-overlay scrollbar-hoverAble flex-1 p-4">
				<div className="flex flex-col gap-1">
					{notifications.map((notification) => (
						<Notification
							key={notification.id}
							notification={notification}
						/>
					))}
				</div>
			</div>
		</Layer>
	);
}

function Notification({ notification }) {
	const { createdAt, isRead, sender } = notification;

	const { icon, message } = useMemo(() => {
		let icon = <SparklesIcon />;
		let message = 'Someone followed you';
		switch (notification.type) {
			case NOTIFICATION_TYPES.FOLLOW:
				icon = <UserIcon className="text-white" />;
				message = 'started following you';
				break;
			case NOTIFICATION_TYPES.LIKE:
				icon = <SparklesIcon className="text-primary-500" />;
				message = 'liked your post';
				break;
			case NOTIFICATION_TYPES.COMMENT:
				icon = (
					<ChatBubbleBottomCenterTextIcon className="text-green-500" />
				);

				message = 'comment on your post';
				break;
			case NOTIFICATION_TYPES.TAG:
				icon = <TagIcon className="text-yellow-500" />;
				message = 'tagged you in a post';
				break;
			case NOTIFICATION_TYPES.BIRTHDAY:
				icon = <CakeIcon className="text-pink-500" />;
				message = 'has a birthday today';
				break;
			case NOTIFICATION_TYPES.EVENT:
				icon = <CalendarDaysIcon className="text-blue-500" />;
				message = 'has an event today';
				break;
			default:
				break;
		}
		return { icon, message };
	}, [notification.type]);

	return (
		<div className="group cursor-pointer rounded-lg p-2 dark:hover:bg-dark-700">
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
					{formatDistanceToNow(new Date(createdAt), {
						addSuffix: true,
						includeSeconds: true,
						locale: enUS,
					})}
				</Text>
				<div className="ml-auto flex items-center gap-2 opacity-0 transition-all group-hover:opacity-100">
					<IconButton
						size="xs"
						color="secondary"
						rounded
						variant="text"
					>
						<CheckIcon />
					</IconButton>
					<IconButton
						size="xs"
						color="secondary"
						rounded
						variant="text"
					>
						<TrashIcon />
					</IconButton>
				</div>
			</div>
		</div>
	);
}

import { BookmarkIcon, MessagesIcon } from 'components/Icon';
import { NotificationBell, NotificationPanel } from 'features/notification';
import { Popover, Tooltip } from 'components/OverLay';
import { forwardRef, useState } from 'react';

import { BookmarkPanel } from 'features/bookmark/components';
import Layer from 'components/Layout/Layer';
import { Text } from 'components/Typography';
import clsx from 'clsx';

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
	return (
		<Popover
			onClickOutside={() => {
				onClick(types.NOTIFICATIONS);
			}}
			interactive
			placement="right"
			offset={[0, 14]}
			render={(attrs) => (
				<Popover.Content
					{...attrs}
					className="h-[99.6vh] !bg-transparent"
				>
					<NotificationPanel />
				</Popover.Content>
			)}
		>
			<Item
				onClick={() => {
					onClick(types.NOTIFICATIONS);
				}}
				isActive={isActive}
				icon={<NotificationBell />}
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
					className="h-[99.6vh] !bg-transparent"
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
					className="h-[99.6vh] !bg-transparent"
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

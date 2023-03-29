import { BellIcon, BookmarkIcon, MessagesIcon } from 'components/Icon';
import { Popover, Tooltip } from 'components/OverLay';
import { forwardRef, useState } from 'react';

import { Badge } from 'components/DataDisplay';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
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
		<div className="mx-1 w-14  px-2 py-4">
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
						'mb-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all last:mb-0 active:scale-90 ',
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
	const [show, setShow] = useState(false);
	const notificationsCount = useSelector(
		(state) => state.auth.user?.notificationsCount,
	);
	return (
		<Tippy
			visible={show}
			interactive
			appendTo={'parent'}
			onClickOutside={() => {
				setShow(false);
			}}
			placement="right-start"
			offset={[0, 8]}
			render={(attrs) => <Popover.Content {...attrs}></Popover.Content>}
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
		</Tippy>
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

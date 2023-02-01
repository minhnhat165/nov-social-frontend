import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import Badge from 'components/DataDisplay/Badge';
import { BellIcon, BookmarkIcon, MessagesIcon } from 'components/Icon';
import Tooltip from 'components/OverLay/Tooltip';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Layer from './Layer';

const types = {
	CHAT: 'CHAT',
	NOTIFICATIONS: 'NOTIFICATIONS',
	BOOKMARKS: 'BOOKMARKS',
};

const ActionList = () => {
	const [currentActiveType, setCurrentActiveType] = useState(null);
	const [show, setShow] = useState(false);

	const handleClick = (type) => {
		if (currentActiveType === type) {
			setCurrentActiveType(null);
			setShow(false);
			return;
		}
		setCurrentActiveType(type);
		setShow(true);
	};

	return (
		<Tippy
			visible={show}
			interactive
			appendTo={'parent'}
			onClickOutside={() => {
				setShow(false);
				setCurrentActiveType(null);
			}}
			placement="right-start"
			offset={[0, 8]}
			render={(attrs) => (
				<div {...attrs}>
					<ListPanel />
				</div>
			)}
		>
			<div className="w-full px-2 py-4">
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
		</Tippy>
	);
};

const ListPanel = () => {
	return <Layer className="h-96 w-80 shadow-3xl"></Layer>;
};

const Item = ({ isActive, icon, onClick, tooltipContent }) => {
	return (
		<Tooltip placement="right" content={tooltipContent}>
			<div
				onClick={onClick}
				className={clsx(
					'mb-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all last:mb-0 active:scale-90 ',
					isActive
						? 'text-primary-700 dark:text-primary-500'
						: 'hover:bg-slate-200s dark:hover:bg-dark-900s text-slate-500 hover:text-slate-800 dark:text-dark-400 dark:hover:text-dark-50'
				)}
			>
				<div className="h-6 w-6">{icon}</div>
			</div>
		</Tooltip>
	);
};

const Notifications = ({ onClick, isActive }) => {
	const notificationsCount = useSelector(
		(state) => state.auth.user?.notificationsCount
	);
	return (
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

export default ActionList;

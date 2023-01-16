import {
	BellIcon,
	BellIconRegular,
	BookmarkIcon,
	BookmarkIconRegular,
	MessagesIcon,
	MessagesIconRegular,
} from 'components/Icon';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { Popover } from 'react-tiny-popover';
import Layer from './Layer';

const ActionList = () => {
	const [currentActive, setCurrentActive] = useState(0);
	const [show, setShow] = useState(false);
	const items = useMemo(() => {
		return [
			{
				id: 0,
				name: 'Chat',
				icon: <MessagesIconRegular className="text-xl" />,
				iconActive: <MessagesIcon className="text-xl" />,
			},
			{
				id: 1,
				name: 'Notifications',
				icon: <BellIconRegular className="text-xl" />,
				iconActive: <BellIcon className="text-xl" />,
			},
			{
				id: 2,
				name: 'Bookmarks',
				icon: <BookmarkIconRegular className="text-xl" />,
				iconActive: <BookmarkIcon className="text-xl" />,
			},
		];
	}, []);

	return (
		<Popover
			isOpen={show}
			padding={8}
			onClickOutside={() => setShow(false)}
			align="start"
			content={<ListPanel />}
		>
			<div className="w-full px-2 py-4">
				{items.map((item) => (
					<div
						key={item.name}
						className={`mb-4 flex h-10 w-10 cursor-pointer items-center justify-center
  					rounded-full last:mb-0 
  					  ${
							currentActive === item.id
								? 'bg-slate-200 text-slate-800 dark:bg-dark-700 dark:text-dark-50'
								: 'text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:text-dark-400 dark:hover:bg-dark-900 dark:hover:text-dark-50'
						}`}
						onClick={() => {
							if (currentActive === item.id) {
								setShow(!show);
							} else {
								setCurrentActive(item.id);
								setShow(true);
							}
						}}
					>
						{currentActive === item.id
							? item.iconActive
							: item.icon}
					</div>
				))}
			</div>
		</Popover>
	);
};

const ListPanel = () => {
	return <Layer className="max-height h-96 w-80 shadow-3xl"></Layer>;
};

export default ActionList;

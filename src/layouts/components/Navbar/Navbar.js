import { useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Tooltip from '../../../components/Tooltip';
import { AnimatePresence, motion } from 'framer-motion';

const menuItem = [
	{
		path: '/chat',
		icon: <i className="fa-duotone fa-message-lines"></i>,
		title: 'Chat',
	},

	{
		path: '/people',
		icon: <i className="fa-duotone fa-user-group"></i>,
		title: 'People',
	},
	{
		path: '/',
		icon: <i className="fa-duotone fa-house-user"></i>,
		title: 'Home',
	},
	{
		path: '/photos',
		icon: <i className="fa-duotone fa-image"></i>,
		title: 'Photos',
	},
	{
		path: '/profile',
		icon: <i className="fa-duotone fa-id-card"></i>,
		title: 'Profile',
	},
];

const Navbar = () => {
	const location = useLocation();
	const [currentItemIndex, setCurrentItemIndex] = useState();
	const [isExist, setIsExist] = useState(true);
	useEffect(() => {
		if (location.pathname === '/') {
			setIsExist(true);
			setCurrentItemIndex(2);
			return;
		}
		const index = menuItem.findIndex((item) => {
			if (item.path === '/') return false;
			return location.pathname.includes(item.path);
		});
		setCurrentItemIndex(index);
		if (index < 0) setIsExist(false);
		else {
			setIsExist(true);
		}
	}, [location]);

	const positionActive = useMemo(() => {
		return currentItemIndex * (56 + 32);
	}, [currentItemIndex]);

	return (
		<nav className="relative flex justify-between gap-8 rounded-xl px-8 dark:bg-dark-800">
			{isExist && (
				<div
					style={{ left: positionActive + 'px' }}
					className={`absolute bottom-0 mx-8 h-[56px] w-[56px] translate-y-1/2 rounded-full border-[6px] border-dark-900 bg-primary-500 transition-all duration-300`}
				>
					<div className="absolute top-1/2 -left-[2px] h-4 w-4 -translate-y-full -translate-x-full rounded-br-full bg-transparent shadow-[0_10px_0_0_rgb(25,33,46)]"></div>
					<div className="absolute top-1/2 -right-[2px] h-4 w-4 -translate-y-full translate-x-full rounded-bl-full bg-transparent shadow-[0_10px_0_0_rgb(25,33,46)]"></div>
				</div>
			)}
			{menuItem.map((item, index) => {
				return (
					<Tooltip
						key={item.title}
						content={item.title}
						className={'flex flex-1 justify-center'}
					>
						<NavLink
							to={item.path}
							className={({ isActive }) => {
								return `flex h-[56px] w-[56px] items-center justify-center rounded-full text-2xl  transition-all duration-300 ${
									isActive
										? 'relative translate-y-1/2 text-blue-900'
										: 'dark:text-dark-text-bold'
								}`;
							}}
						>
							{item.icon}
						</NavLink>
						<div
							className={`absolute top-1 left-1/2 -translate-x-1/2 text-sm transition-all duration-300 dark:text-dark-text-bold  ${
								currentItemIndex === index && isExist
									? 'opacity-1 translate-y-0'
									: '-translate-y-2 opacity-0'
							}`}
						>
							{item.title}
						</div>
					</Tooltip>
				);
			})}
		</nav>
	);
};

export default Navbar;

import {
	CirclePlayIcon,
	GamePadIcon,
	HomeIcon,
	UsersIcon,
} from 'components/Icon';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import { useMemo, useRef } from 'react';

import Tooltip from 'components/OverLay/Tooltip';

const TRANSITION_TIME = 500;

const Navbar = () => {
	const location = useLocation();
	const bubbleRef = useRef(null);
	const addAnimation = () => {
		bubbleRef.current.classList.add('animate-drop');
	};

	const removeAnimation = () => {
		setTimeout(() => {
			bubbleRef.current.classList.remove('animate-drop');
		}, TRANSITION_TIME);
	};

	const items = useMemo(() => {
		return [
			{
				name: 'Home',
				icon: <HomeIcon />,
				path: '/',
			},
			{
				name: 'About',
				icon: <CirclePlayIcon />,
				path: '/videos',
			},
			{
				name: 'Friends',
				icon: <UsersIcon />,
				path: '/friends',
			},
			{
				name: 'Games',
				icon: <GamePadIcon />,
				path: '/games',
			},
		];
	}, []);

	const indexActive = useMemo(() => {
		return items.findIndex((item) => {
			return matchPath({ path: item.path }, location.pathname);
		});
		// eslint-disable-next-line no-use-before-define
	}, [items, location.pathname]);

	return (
		<div className="relative flex w-fit flex-col rounded-xl px-2">
			{indexActive >= 0 && (
				<div
					className="absolute top-0 left-1/2"
					style={{
						transform: `translateX(-50%) translateY(${
							indexActive * 40 + indexActive * 16
						}px)`,
						transition: `transform ${TRANSITION_TIME}ms  ease-in-out`,
					}}
				>
					<div
						ref={bubbleRef}
						className="h-10 w-10 rounded-full bg-gradient-to-b from-cyan-500 to-primary-800 text-white dark:from-cyan-300 dark:to-primary-700"
					></div>
				</div>
			)}
			{items.map((item, index) => {
				return (
					<Tooltip
						key={item.name}
						placement="right"
						content={item.name}
					>
						<NavLink
							key={item.name}
							to={item.path}
							className={({ isActive }) =>
								`relative mb-4 flex h-10 w-10 items-center justify-center rounded-full transition-all last:mb-0 ${
									isActive
										? 'text-white'
										: 'text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:text-dark-400 dark:hover:bg-dark-900 dark:hover:text-dark-50'
								}`
							}
						>
							<div
								onClick={() => {
									addAnimation();
									removeAnimation();
								}}
							>
								<div className="flex h-6 w-6 items-center justify-center">
									{item.icon}
								</div>
							</div>
						</NavLink>
					</Tooltip>
				);
			})}
		</div>
	);
};

Navbar.propTypes = {};

export default Navbar;

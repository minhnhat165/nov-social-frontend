import {
	CirclePlayIcon,
	GamePadIcon,
	HomeIcon,
	UsersIcon,
} from 'components/Icon';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

import { Tooltip } from 'components/OverLay';
import { useMemo } from 'react';

const TRANSITION_TIME = 500;

const Navbar = () => {
	const location = useLocation();

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
				<>
					<div
						className="absolute top-0 left-0"
						style={{
							transform: `translateY(${
								indexActive * 40 + indexActive * 16
							}px)`,
							transition: `transform ${TRANSITION_TIME}ms  ease-in-out`,
						}}
					>
						<div className="-ml-1 h-10 w-1 rounded-r-md bg-primary-500" />
					</div>
					<div
						className="absolute top-0 right-0"
						style={{
							transform: `translateY(${
								indexActive * 40 + indexActive * 16
							}px)`,
							transition: `transform ${TRANSITION_TIME}ms  ease-in-out`,
						}}
					>
						<div className="-mr-1 h-10 w-1 rounded-l-md bg-primary-500" />
					</div>
				</>
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
								`relative mb-4 flex h-10 w-10 items-center justify-center rounded-lg transition-all last:mb-0 ${
									isActive
										? 'text-dark-800 dark:text-white'
										: 'text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:text-dark-400 dark:hover:bg-dark-900 dark:hover:text-dark-50'
								}`
							}
						>
							<div className="flex h-6 w-6 items-center justify-center">
								{item.icon}
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

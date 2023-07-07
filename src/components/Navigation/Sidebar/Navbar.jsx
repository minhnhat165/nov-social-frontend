import {
	CirclePlayIcon,
	GamePadIcon,
	HomeIcon,
	UsersIcon,
} from 'components/Icon';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

import { Tooltip } from 'components/OverLay';
import clsx from 'clsx';
import { useMemo } from 'react';
import { IconWrapper } from 'components/DataDisplay';

const TRANSITION_TIME = 500;

const Navbar = ({ isHorizontal = false, extraItems = [] }) => {
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
				name: 'People',
				icon: <UsersIcon />,
				path: '/people',
			},
			{
				name: 'Games',
				icon: <GamePadIcon />,
				path: '/games',
			},
			...extraItems,
		];
	}, [extraItems]);

	const indexActive = useMemo(() => {
		return items.findIndex((item) => {
			return matchPath({ path: item.path }, location.pathname);
		});
		// eslint-disable-next-line no-use-before-define
	}, [items, location.pathname]);

	return (
		<div
			className={clsx(
				'relative flex rounded-xl ',
				isHorizontal
					? 'w-full justify-around'
					: 'w-fit flex-col gap-4 px-2',
			)}
		>
			{indexActive >= 0 && !isHorizontal && (
				<>
					<div
						className="absolute left-0 top-0"
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
						className="absolute right-0 top-0"
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
			{items.map((item) => {
				return (
					<Item
						key={item.name}
						item={item}
						isHorizontal={isHorizontal}
					/>
				);
			})}
		</div>
	);
};

const Item = ({ item, isHorizontal }) => {
	return (
		<Tooltip
			disabled={isHorizontal}
			key={item.name}
			placement="right"
			content={item.name}
		>
			<NavLink
				key={item.name}
				to={item.path}
				className={({ isActive }) =>
					`relative flex items-center justify-center rounded-lg transition-all ${
						isActive
							? ` ${
									isHorizontal
										? 'text-primary-700 dark:text-primary-500'
										: 'text-dark-800 dark:text-white'
							  } `
							: 'text-slate-500 hover:bg-slate-200 hover:text-slate-800 dark:text-dark-400 dark:hover:bg-dark-900 dark:hover:text-dark-50'
					} ${isHorizontal ? 'h-12 w-12' : 'h-10 w-10'}`
				}
			>
				<div className="h-6 w-6 items-center justify-center">
					{item.icon}
				</div>
			</NavLink>
		</Tooltip>
	);
};

Navbar.Item = Item;

Navbar.propTypes = {};

export default Navbar;

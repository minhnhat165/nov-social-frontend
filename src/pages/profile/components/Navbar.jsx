import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Tab as TabLib } from '@headlessui/react';
import clsx from 'clsx';

const Navbar = ({ items }) => {
	const { id } = useParams();

	const [selectedIndex, setSelectedIndex] = useState(0);
	const { pathname } = useLocation();
	const endPoint = pathname.split('/').slice(-1)[0];

	const index = items.findIndex((item) => {
		let isMatch = item.endPoint === endPoint;
		if (!isMatch) {
			return false;
		}
		if (item?.params) {
			const searchParams = new URLSearchParams(window.location.search);
			const keys = Object.keys(item?.params);
			keys.forEach((key) => {
				if (item?.params[key] !== searchParams.get(key)) {
					isMatch = false;
				}
			});
		}
		return isMatch;
	});
	useEffect(() => {
		setSelectedIndex(index);
	}, [index]);

	return (
		<div className="w-full">
			<TabLib.Group
				selectedIndex={selectedIndex}
				onChange={setSelectedIndex}
			>
				<TabLib.List className="m-2 flex rounded-lg bg-white p-2 shadow dark:bg-dark-900">
					{items.map((item) => (
						<TabLib
							as={Link}
							key={item.id}
							to={`/profile/${id}/${item.endPoint}${
								item?.params
									? `?${new URLSearchParams(item?.params)}`
									: ''
							}`}
							className={({ selected }) =>
								clsx(
									'w-full rounded-lg py-2 text-center text-sm leading-5 outline-none',
									selected
										? 'bg-primary-50 font-bold text-primary-700 dark:bg-primary-900/20 dark:text-primary-500'
										: 'text-slate-600 hover:text-primary-700 dark:text-dark-400 dark:hover:text-primary-500',
								)
							}
						>
							{item.title}
						</TabLib>
					))}
				</TabLib.List>
			</TabLib.Group>
		</div>
	);
};

export default Navbar;

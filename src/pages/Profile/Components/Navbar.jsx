import { Link, useParams } from 'react-router-dom';

import { Tab as TabLib } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';

const Navbar = () => {
	const { id } = useParams();

	let [items] = useState([
		{
			id: 1,
			title: 'Posts',
			endPoint: '',
		},
		{
			id: 2,
			title: 'About',
			endPoint: '/about',
		},

		{
			id: 3,
			title: 'Friends',
			endPoint: '/friends',
		},
		{
			id: 4,
			title: 'Photos',
			endPoint: '/photos',
		},
	]);
	return (
		<div className="w-full">
			<TabLib.Group>
				<TabLib.List className="m-2 flex rounded-xl bg-white p-2 shadow dark:bg-dark-900">
					{items.map((item) => (
						<TabLib
							as={Link}
							key={item.id}
							to={`/profile/${id}${item.endPoint}`}
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

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
		<div className="w-full max-w-md px-2 sm:px-0 ">
			<TabLib.Group>
				<TabLib.List className="flex space-x-1 rounded-xl bg-slate-200 p-1 dark:bg-dark-700">
					{items.map((item) => (
						<TabLib
							as={Link}
							key={item.id}
							to={`/profile/${id}${item.endPoint}`}
							className={({ selected }) =>
								clsx(
									'w-full rounded-lg py-2.5 text-center text-sm font-medium leading-5 outline-none',
									selected
										? 'bg-primary-700 text-slate-50 shadow'
										: 'text-slate-600 hover:bg-slate-50/70 hover:text-slate-800 dark:text-dark-400 dark:hover:bg-dark-600 dark:hover:text-dark-200'
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

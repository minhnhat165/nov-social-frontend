import { useState } from 'react';
import { Tab as TabLib } from '@headlessui/react';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Tab() {
	let [items] = useState([
		{
			id: 1,
			title: 'Posts',
		},
		{
			id: 2,
			title: 'About',
		},

		{
			id: 3,
			title: 'Friends',
		},
		{
			id: 4,
			title: 'Photos',
		},
	]);

	return (
		<div className="w-full max-w-md px-2 sm:px-0">
			<TabLib.Group>
				<TabLib.List className="flex space-x-1 rounded-xl bg-slate-500/20 p-1">
					{items.map((item) => (
						<TabLib
							key={item.id}
							className={({ selected }) =>
								classNames(
									'w-full rounded-lg py-2.5 text-sm font-medium leading-5 outline-none',
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
}

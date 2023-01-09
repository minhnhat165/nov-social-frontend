import React from 'react';

const RenderItems = ({ items }) => {
	return (
		<div className="px-2">
			{items.map((item) => (
				<div
					key={item.title}
					onClick={() => item.action()}
					className="group flex w-full cursor-pointer items-center gap-1 rounded-xl p-[6px]  transition-all dark:hover:bg-dark-very-light dark:active:bg-blue-500"
				>
					<div className="flex h-9 w-9 items-center justify-center text-xl leading-[0] dark:text-dark-text-bold">
						{item.icon}
					</div>
					<span className="dark:text-dark-text-regular dark:group-hover:text-dark-text-bold">
						{item.title}
					</span>
				</div>
			))}
		</div>
	);
};

export default RenderItems;

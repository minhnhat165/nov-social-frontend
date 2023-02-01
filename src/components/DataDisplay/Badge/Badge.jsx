import React from 'react';

const Badge = ({ children, count }) => {
	return (
		<div className="relative">
			{children}
			{count > 0 && (
				<div className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-primary-700 text-xs font-bold text-white dark:border-dark-700 dark:bg-primary-500">
					{count}
				</div>
			)}
		</div>
	);
};

export default Badge;

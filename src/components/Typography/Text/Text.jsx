import clsx from 'clsx';
import React from 'react';

const levels = {
	1: 'text-slate-700 dark:text-dark-100',
	2: 'text-slate-600 dark:text-dark-200',
	3: 'text-slate-500 dark:text-dark-300',
	4: 'text-slate-400 dark:text-dark-400',
	5: 'text-slate-300 dark:text-dark-500',
	6: 'text-slate-200 dark:text-dark-600',
};
const Text = ({ children, as = 'span', level = 1, className, ...props }) => {
	const Tag = as;
	return (
		<Tag className={clsx(levels[level], className)} {...props}>
			{children}
		</Tag>
	);
};

export default Text;

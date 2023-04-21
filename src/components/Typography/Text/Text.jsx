import React from 'react';
import clsx from 'clsx';

const levels = {
	0: 'text-slate-800 dark:text-dark-50',
	1: 'text-slate-700 dark:text-dark-100',
	2: 'text-slate-600 dark:text-dark-200',
	3: 'text-slate-500 dark:text-dark-300',
	4: 'text-slate-400 dark:text-dark-400',
	5: 'text-slate-300 dark:text-dark-500',
	6: 'text-slate-200 dark:text-dark-600',
};

const sizes = {
	xs: 'text-xs',
	sm: 'text-sm',
	base: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl',
	'2xl': 'text-2xl',
	'3xl': 'text-3xl',
	'4xl': 'text-4xl',
	'5xl': 'text-5xl',
	'6xl': 'text-6xl',
	'7xl': 'text-7xl',
	'8xl': 'text-8xl',
	'9xl': 'text-9xl',
};

export const Text = ({
	children,
	as = 'span',
	primary,
	level = 1,
	className,
	size = 2,
	bold,
	...props
}) => {
	const Tag = as;
	return (
		<Tag
			className={clsx(
				primary
					? 'text-primary-700 dark:text-primary-500'
					: levels[level],
				className,
				bold && 'font-bold',
				sizes[size],
			)}
			{...props}
		>
			{children}
		</Tag>
	);
};

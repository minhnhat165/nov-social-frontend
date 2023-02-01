import clsx from 'clsx';
import { forwardRef } from 'react';

const levels = {
	0: 'bg-white dark:bg-dark-900',
	1: 'bg-slate-50 dark:bg-dark-800',
	2: 'bg-slate-100 dark:bg-dark-700',
	3: 'bg-slate-200 dark:bg-dark-600',
	4: 'bg-slate-300 dark:bg-dark-500',
};

const Layer = forwardRef(
	({ level = 1, className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				{...props}
				className={clsx('rounded-xl', levels[level], className)}
			>
				{children}
			</div>
		);
	}
);

export default Layer;

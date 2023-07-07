import clsx from 'clsx';
import { forwardRef } from 'react';

const levels = {
	0: 'bg-white dark:bg-dark-900',
	1: 'bg-slate-50 dark:bg-dark-800',
	2: 'bg-slate-100 dark:bg-dark-700',
	3: 'bg-slate-200 dark:bg-dark-600',
	4: 'bg-slate-300 dark:bg-dark-500',
};

const shadows = {
	0: 'drop-shadow-[0_0_6px_rgba(0,0,0,0.2)] dark:shadow-xl',
	1: 'shadow-sm',
	2: 'shadow',
	3: 'shadow-md',
	4: 'shadow-lg',
	5: 'shadow-xl',
	6: 'shadow-2xl',
	7: 'shadow-inner',
	8: 'shadow-none',
};

const Layer = forwardRef(
	({ level = 1, className, children, responsive, shadow, ...props }, ref) => {
		return (
			<div
				ref={ref}
				{...props}
				className={clsx(
					levels[level],
					shadow && shadows[level],
					className,
					responsive ? 'rounded-none sm:rounded-xl' : 'rounded-xl',
				)}
			>
				{children}
			</div>
		);
	},
);

export default Layer;

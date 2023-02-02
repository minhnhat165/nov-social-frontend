import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import { forwardRef } from 'react';

const Tooltip = forwardRef(
	({ children, content, className, ...props }, ref) => {
		return (
			<Tippy
				{...props}
				ref={ref}
				render={(attrs) => (
					<div
						{...attrs}
						className={clsx(
							'tooltip rounded-md bg-slate-600 py-2 px-4 text-sm text-slate-50 dark:bg-dark-100 dark:text-dark-700',
							className
						)}
						role="tooltip"
					>
						{content}
						<div className="arrow" data-popper-arrow></div>
					</div>
				)}
			>
				{children}
			</Tippy>
		);
	}
);

export default Tooltip;

import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';

const Tooltip = ({ children, content, className, ...props }) => {
	return (
		<Tippy
			{...props}
			render={(attrs) => (
				<div
					{...attrs}
					className={clsx(
						'rounded-md bg-slate-700 py-2 px-4 text-sm text-slate-50 dark:bg-dark-100 dark:text-dark-700',
						className
					)}
					id="tooltip"
					role="tooltip"
				>
					{content}
					<div id="arrow" data-popper-arrow></div>
				</div>
			)}
		>
			{children}
		</Tippy>
	);
};

export default Tooltip;

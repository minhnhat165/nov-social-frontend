import { IconWrapper } from '../IconWrapper';
import React from 'react';
import { XMarkIcon } from 'components/Icon';
import clsx from 'clsx';

export const Chip = ({
	children,
	icon,
	onClick,
	onRemove,
	className,
	removeIcon = <XMarkIcon />,
}) => {
	return (
		<span
			onClick={onClick}
			className={clsx(
				'clickable  inline-flex h-8 items-center rounded-lg border border-slate-500 text-sm font-medium text-gray-800 hover:bg-slate-300 dark:border-gray-600 dark:hover:bg-gray-700',
				className,
			)}
		>
			<span className="ml-[5px] -mr-[6px] text-gray-500">{icon}</span>
			<span className="text-normal px-3">{children}</span>
			{onRemove && (
				<button
					type="button"
					className="text-normal -ml-[6px] mr-[5px] flex h-[20px] w-[20px] items-center justify-center rounded-full hover:bg-slate-800/50 hover:text-slate-200 dark:hover:bg-dark-200/50 dark:hover:text-dark-900"
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
				>
					<IconWrapper size={4}> {removeIcon}</IconWrapper>
				</button>
			)}
		</span>
	);
};

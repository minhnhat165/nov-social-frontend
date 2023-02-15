import WrapperField from '../WrapperField';
import clsx from 'clsx';
import { useId } from 'react';

const sizes = {
	sm: 'h-9 px-3 text-sm',
	md: 'h-12 px-4 text-base',
	lg: 'h-14 px-4 text-base',
};

const Textarea = ({
	size,
	maxLength,
	label,
	placeholder,
	className,
	error,
	helper,
	registration,
	count,
	...props
}) => {
	const id = useId();

	return (
		<>
			<WrapperField
				label={label}
				htmlId={id}
				error={error}
				size={size}
				helper={helper}
			>
				<textarea
					className={clsx(
						'relative w-full resize-none rounded-xl border border-slate-200 bg-slate-100 outline-none transition-colors placeholder:opacity-80 focus:border-primary-700 focus:outline-none focus:ring-0 dark:border-transparent dark:bg-dark-700 dark:text-dark-50 dark:focus:border-primary-500',
						sizes[size],
						error &&
							'border-red-600 focus:ring-red-600 dark:border-red-400 dark:focus:ring-red-400',
						className,
					)}
					id={id}
					maxLength={maxLength}
					placeholder={placeholder}
					{...registration}
					{...props}
				/>
			</WrapperField>
			<div className="text-normal pointer-events-none flex w-full items-center justify-end pr-3 text-sm font-thin">
				{count} / {maxLength}
			</div>
		</>
	);
};

Textarea.propTypes = {};

export default Textarea;

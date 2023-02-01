import clsx from 'clsx';
import { useId } from 'react';
import WrapperField from '../WrapperField';
const sizes = {
	sm: 'h-9 px-3 text-sm',
	md: 'h-12 px-4 text-base',
	lg: 'h-14 px-4 text-base',
};

const TextareaFiled = ({
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
						'relative w-full resize-none rounded-xl border border-slate-200 bg-slate-100 bg-transparent placeholder:opacity-80 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary-700 dark:border-transparent dark:bg-dark-700 dark:text-dark-50 dark:focus:border-transparent dark:focus:ring-primary-700',
						sizes[size],
						error &&
							'border-red-600 focus:ring-red-600 dark:border-red-400 dark:focus:ring-red-400',
						className
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

TextareaFiled.propTypes = {};

export default TextareaFiled;

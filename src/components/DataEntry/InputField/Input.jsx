import PropTypes from 'prop-types';
import WrapperField from '../WrapperField';
import clsx from 'clsx';
import { useId } from 'react';

const sizes = {
	sm: 'h-9 px-3 text-sm rounded-lg',
	md: 'h-10 px-4 text-base rounded-lg',
	lg: 'h-12 px-4 text-base rounded-xl',
	xl: 'h-14 px-4 text-base rounded-xl',
};

const Input = ({
	size,
	label,
	placeholder,
	className,
	error,
	helper,
	registration,
	...props
}) => {
	const id = useId();
	return (
		<WrapperField
			label={label}
			htmlId={id}
			error={error}
			size={size}
			helper={helper}
		>
			<input
				className={clsx(
					'w-full border border-slate-200 bg-slate-100 outline-none transition-colors placeholder:opacity-80 focus:border-primary-700 focus:outline-none focus:ring-0 dark:border-transparent dark:bg-dark-700 dark:text-dark-50 dark:focus:border-primary-500',
					sizes[size],
					error &&
						'border-red-600 focus:border-red-600 dark:border-red-400 dark:focus:border-red-400',
					className,
				)}
				id={id}
				placeholder={placeholder}
				{...registration}
				{...props}
			/>
		</WrapperField>
	);
};

Input.propTypes = {
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	label: PropTypes.string,
	className: PropTypes.string,
	error: PropTypes.string,
	helper: PropTypes.string,
	placeholder: PropTypes.string,
	registration: PropTypes.object,
	type: PropTypes.oneOf([
		'text',
		'email',
		'password',
		'number',
		'tel',
		'url',
		'search',
		'date',
		'time',
		'datetime-local',
		'month',
		'week',
		'color',
	]),
};

Input.defaultProps = {
	size: 'lg',
	label: '',
	type: 'text',
	helper: '',
	placeholder: '',
};

export default Input;

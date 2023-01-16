import { useId } from 'react';
import PropTypes from 'prop-types';
import WrapperField from '../WrapperField';
import clsx from 'clsx';

const sizes = {
	sm: 'h-9 px-3 text-sm',
	md: 'h-12 px-4 text-base',
	lg: 'h-14 px-4 text-base',
};

const InputField = ({
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
					'w-full rounded-xl border border-slate-200 bg-slate-100 bg-transparent placeholder:opacity-80 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-primary-700 dark:border-transparent dark:bg-dark-700 dark:text-dark-50 dark:focus:border-transparent dark:focus:ring-primary-700',
					sizes[size],
					error &&
						'border-red-600 focus:ring-red-600 dark:border-red-400 dark:focus:ring-red-400',
					className
				)}
				id={id}
				placeholder={placeholder}
				{...registration}
				{...props}
			/>
		</WrapperField>
	);
};

InputField.propTypes = {
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

InputField.defaultProps = {
	size: 'md',
	label: '',
	type: 'text',
	helper: '',
	placeholder: '',
};

export default InputField;

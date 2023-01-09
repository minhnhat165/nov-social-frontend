import clsx from 'clsx';
import { useId } from 'react';
import PropTypes from 'prop-types';

const sizes = {
	sm: 'h-9 px-3 text-sm',
	md: 'h-12 px-4 text-base',
	lg: 'h-14 px-4 text-base',
};

const SelectField = ({ label, size, options, className, ...props }) => {
	const id = useId();
	return (
		<select
			id={id}
			name={label}
			title={label}
			className={clsx(
				'hover:border-primary focus:ring-primary dark:hover:border-primary form-select w-full cursor-pointer appearance-none gap-1 rounded-lg border border-slate-200 bg-slate-100 py-0 capitalize text-light-text-regular outline-none transition-all hover:border-primary-700 focus:border-primary-700 active:scale-95 dark:border-dark-border  dark:bg-dark-700 dark:text-dark-200 dark:placeholder-gray-400 dark:hover:border-primary-500 dark:focus:border-primary-500',
				sizes[size],
				className
			)}
			{...props}
		>
			{options.map((option) => (
				<option
					key={option.value}
					className="hover:bg-red-400"
					value={option.value}
				>
					{option.label}
				</option>
			))}
		</select>
	);
};

SelectField.propTypes = {
	label: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	options: PropTypes.array,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SelectField.defaultProps = {
	label: '',
	size: 'md',
	options: [],
};

export default SelectField;

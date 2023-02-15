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
const RadioGroup = ({ options, size, label, error, registration }) => {
	const id = useId();
	return (
		<WrapperField label={label} error={error} className="w-full">
			<div className="flex w-full justify-between gap-2">
				{options.map((option) => (
					<label
						key={option.name}
						htmlFor={option.name}
						className={clsx(
							'flex h-10 flex-1 cursor-pointer items-center rounded-xl border border-gray-200 bg-slate-100 capitalize transition-transform hover:border-primary-700 hover:bg-blue-50/50 hover:ring-primary-700 focus:bg-blue-50/50 focus:outline-none focus:ring-1 focus:ring-primary-700 active:scale-95 dark:border-transparent dark:bg-dark-700 dark:text-dark-100 dark:hover:border-primary-500',
							sizes[size],
						)}
					>
						{option.name}
						<input
							type="radio"
							className="form-radio ml-auto outline-none transition-all checked:bg-primary-700 checked:ring-primary-700 focus:bg-primary-700 dark:border-transparent dark:bg-dark-200 dark:checked:bg-primary-500"
							name={id}
							value={option.value}
							id={option.name}
							{...registration}
						/>
					</label>
				))}
			</div>
		</WrapperField>
	);
};

RadioGroup.propTypes = {
	options: PropTypes.array,
	label: PropTypes.string,
	error: PropTypes.string,
	registration: PropTypes.object,
};

RadioGroup.defaultProps = {
	options: [],
	label: '',
	error: '',
	registration: {},
	size: 'md',
};

export default RadioGroup;

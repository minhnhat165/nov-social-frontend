import PropTypes from 'prop-types';
import { Text } from 'components/Typography';
import WrapperField from '../WrapperField';
import clsx from 'clsx';
import { useId } from 'react';

const sizes = {
	sm: 'h-9 text-sm rounded-lg',
	md: 'h-10 text-base rounded-lg',
	lg: 'h-12 text-base rounded-lg',
	xl: 'h-14 text-base rounded-xl',
};

const paddings = {
	sm: 'px-3',
	md: 'px-4',
	lg: 'px-4',
	xl: 'px-4',
};

export const Input = ({
	size,
	label,
	placeholder,
	className,
	error,
	helper,
	registration,
	startDecorator,
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
			<div
				className={clsx(
					'flex w-full border border-slate-200 bg-slate-100 outline-none transition-colors focus:border-primary-700 focus:outline-none focus:ring-0 dark:border-transparent dark:bg-dark-700 dark:text-dark-50 dark:focus-within:border-primary-500',
					sizes[size],
					error &&
						'border-red-600 focus-within:border-red-600 dark:border-red-400 dark:focus-within:border-red-400',
					className,
				)}
			>
				{startDecorator && (
					<div
						style={{ borderRadius: 'inherit' }}
						className="border-normal flex aspect-square h-full items-center justify-center !rounded-r-none border-r bg-slate-200 text-center dark:bg-dark-600"
					>
						<Text className="text-lg"> {startDecorator}</Text>
					</div>
				)}
				<input
					style={{ borderRadius: 'inherit' }}
					className={clsx(
						'h-full w-full border-none bg-transparent outline-none placeholder:opacity-80 focus:outline-none focus:ring-0 ',
						paddings[size],
					)}
					id={id}
					placeholder={placeholder}
					{...registration}
					{...props}
				/>
			</div>
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

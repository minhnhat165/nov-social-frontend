import PropTypes from 'prop-types';
import clsx from 'clsx';

const labelStyles = {
	sm: 'text-sm pb-1',
	md: 'text-base pb-1',
	lg: 'text-base pb-2',
	xl: 'text-xl pb-3',
};

const WrapperField = ({ label, htmlId, error, children, size }) => {
	return (
		<div className="group w-full">
			{label && (
				<label
					htmlFor={htmlId}
					className={clsx(
						'mt-2 flex cursor-pointer font-bold capitalize text-slate-800 dark:text-dark-200',
						labelStyles[size],
					)}
				>
					{label}
				</label>
			)}
			{children}
			{error && (
				<span className="block h-0 overflow-hidden text-sm  text-red-400 opacity-0 transition-all ease-in-out first-letter:capitalize group-focus-within:h-5 group-focus-within:opacity-100">
					{error}
				</span>
			)}
		</div>
	);
};

WrapperField.propTypes = {
	label: PropTypes.string,
	htmlId: PropTypes.string,
	error: PropTypes.string,
	children: PropTypes.node,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	helper: PropTypes.string,
};

WrapperField.defaultProps = {
	label: '',
	htmlId: 'htmlId',
	error: '',
	size: 'md',
	helper: '',
};

export default WrapperField;

import clsx from 'clsx';
import PropTypes from 'prop-types';
import './style.css';

const sizes = {
	sm: 'h-5 w-5',
	md: 'h-6 w-6',
	lg: 'h-7 w-7',
	xl: 'h-9 w-9',
};

const colors = {
	light: 'text-white',
	primary: 'text-primary-700 dark:text-primary-500',
};

export const Spinner = ({ size, color, className, ...props }) => {
	return (
		<>
			<svg
				{...props}
				className={clsx(
					'spinner',
					sizes[size],
					colors[color],
					className
				)}
				viewBox="0 0 50 50"
			>
				<circle
					cx="25"
					cy="25"
					r="20"
					fill="none"
					strokeWidth="5"
					className="path"
				></circle>
			</svg>
		</>
	);
};

Spinner.propTypes = {
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
	color: PropTypes.oneOf(['light', 'primary']),
	className: PropTypes.string,
};
Spinner.defaultProps = {
	size: 'md',
	color: 'light',
	className: '',
};

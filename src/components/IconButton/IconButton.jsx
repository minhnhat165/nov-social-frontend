import clsx from 'clsx';
import { variantsColors } from 'components/Button/Button';
import { Spinner } from 'components/Spinner';
import PropTypes from 'prop-types';

const sizes = {
	sm: 'h-9 w-9 text-sm',
	md: 'h-10 w-10 text-base',
	lg: 'h-12 w-12 text-base',
	xl: 'h-14 w-14 text-lg',
};

const IconButton = ({
	loading,
	size,
	color,
	variant,
	children,
	className,
	type,
	ref,
	rounded,
	...props
}) => {
	return (
		<button
			ref={ref}
			type={type}
			className={clsx(
				'flex shrink-0 cursor-pointer items-center justify-center transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-80',
				variantsColors[variant][color],
				rounded ? 'rounded-full' : 'rounded-xl',
				sizes[size],
				className
			)}
			{...props}
		>
			{loading ? <Spinner size={size} variant="light" /> : children}
		</button>
	);
};

IconButton.propTypes = {
	loading: PropTypes.bool,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
	variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'danger',
		'success',
		'warning',
		'info',
		'light',
		'dark',
		'transparent',
	]),
	children: PropTypes.node,
	className: PropTypes.string,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	rounded: PropTypes.bool,
};

IconButton.defaultProps = {
	loading: false,
	size: 'md',
	color: 'primary',
	variant: 'contained',
	type: 'button',
	rounded: false,
};

export default IconButton;

import 'style/button.css';

import { IconWrapper } from 'components/DataDisplay';
import PropTypes from 'prop-types';
import { Spinner } from 'components/Loading';
import clsx from 'clsx';

const sizes = {
	xs: 'h-6 w-6 text-xs',
	sm: 'h-9 w-9 text-sm',
	md: 'h-10 w-10 text-base ',
	lg: 'h-12 w-12 text-base',
	xl: 'h-14 w-14 text-lg',
};

const borderRadius = {
	xs: 'rounded-full',
	sm: 'rounded-md',
	md: 'rounded-lg',
	lg: 'rounded-xl',
	xl: 'rounded-xl',
};

const iconSizes = {
	xs: 4,
	sm: 5,
	md: 6,
	lg: 6,
	xl: 7,
};

export const IconButton = ({
	loading,
	size,
	color,
	variant,
	children,
	className,
	type,
	ref,
	rounded,
	disabled,
	...props
}) => {
	return (
		<button
			disabled={disabled}
			ref={ref}
			type={type}
			className={clsx(
				'enabled:clickable flex shrink-0 items-center justify-center transition-all disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:!bg-transparent',
				variant,
				color,
				rounded ? 'rounded-full' : borderRadius[size],
				sizes[size],
				disabled &&
					'dark:!disabled:text-white dark:!disabled:bg-gray-700 cursor-not-allowed disabled:cursor-not-allowed  disabled:!text-gray-500 disabled:!opacity-40',
				className,
			)}
			{...props}
		>
			{loading ? (
				<Spinner size={size} variant="light" />
			) : (
				<IconWrapper size={iconSizes[size]}> {children}</IconWrapper>
			)}
		</button>
	);
};

IconButton.propTypes = {
	loading: PropTypes.bool,
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	variant: PropTypes.oneOf(['filled', 'outlined', 'text']),
	color: PropTypes.oneOf(['primary', 'secondary']),
	children: PropTypes.node,
	className: PropTypes.string,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	rounded: PropTypes.bool,
};

IconButton.defaultProps = {
	loading: false,
	size: 'md',
	color: 'primary',
	variant: 'filled',
	type: 'button',
	rounded: false,
};

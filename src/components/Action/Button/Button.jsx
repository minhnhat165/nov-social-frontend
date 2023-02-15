import 'style/button.css';

import IconWrapper from 'components/Icon/IconWrapper';
import PropTypes from 'prop-types';
import { Spinner } from '../../Loading/Spinner';
import clsx from 'clsx';

const sizes = {
	sm: 'h-9 px-4 text-sm ',
	md: 'h-10 px-6 text-base',
	lg: 'h-12 px-6 text-lg',
	xl: 'h-14 px-8 text-lg`',
};

const borderRadius = {
	sm: 'rounded-md',
	md: 'rounded-lg',
	lg: 'rounded-xl',
	xl: 'rounded-xl',
};

const iconStyle = {
	sm: '!w-4 !h-4',
	md: '!w-5 !h-5',
	lg: '!w-5 !h-5',
	xl: '!w-6 !h-6',
};

const iconLeftStyle = {
	sm: 'mr-1',
	md: 'mr-2',
	lg: 'mr-2',
	xl: 'mr-3',
};

const iconRightStyle = {
	sm: 'ml-1',
	md: 'ml-2',
	lg: 'ml-2',
	xl: 'ml-3',
};

const Button = ({
	as,
	variant,
	loading,
	disabled,
	size,
	color,
	children,
	className,
	ref,
	rounded,
	startIcon,
	endIcon,
	elevated,
	...props
}) => {
	const Component = as;
	return (
		<Component
			ref={ref}
			disabled={disabled || loading}
			className={clsx(
				'relative flex shrink-0 cursor-pointer items-center justify-center no-underline transition-all active:scale-95',
				sizes[size],
				rounded ? 'rounded-full' : borderRadius[size],
				variant,
				color,
				className,
				disabled
					? 'dark:!disabled:bg-gray-700 dark:!disabled:text-white disabled:scale-100 disabled:cursor-not-allowed disabled:!bg-gray-300 disabled:!text-gray-500 disabled:!opacity-40'
					: '',
				elevated ? 'shadow' : '',
			)}
			{...props}
		>
			{startIcon && (
				<IconWrapper
					className={clsx(iconStyle[size], iconLeftStyle[size])}
				>
					{startIcon}
				</IconWrapper>
			)}
			{loading && (
				<div className="absolute-center">
					<Spinner size={size} variant="light" />
				</div>
			)}
			<span className={loading ? 'opacity-0' : ''}>{children}</span>
			{endIcon && (
				<IconWrapper
					className={clsx(iconStyle[size], iconRightStyle[size])}
				>
					{endIcon}
				</IconWrapper>
			)}
		</Component>
	);
};

Button.propTypes = {
	variant: PropTypes.oneOf(['filled', 'outlined', 'text']),
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
	color: PropTypes.oneOf(['primary', 'secondary']),
	children: PropTypes.node,
	rounded: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.oneOf(['button', 'submit']),
	onclick: PropTypes.func,
	href: PropTypes.string,
	elevated: PropTypes.bool,
};

Button.defaultProps = {
	variant: 'filled',
	loading: false,
	disabled: false,
	size: 'md',
	color: 'primary',
	children: 'Button',
	className: '',
	type: 'button',
	onClick: null,
	rounded: false,
	as: 'button',
	elevated: false,
};

export default Button;

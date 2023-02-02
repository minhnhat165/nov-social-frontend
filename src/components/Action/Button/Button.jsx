import 'style/button.css';

import IconWrapper from 'components/Icon/IconWrapper';
import PropTypes from 'prop-types';
import { Spinner } from '../../Loading/Spinner';
import clsx from 'clsx';

const sizes = {
	sm: 'h-9 px-4 text-sm',
	md: 'h-10 px-6 text-base',
	lg: 'h-12 px-6 text-base',
	xl: 'h-14 px-8 text-lg',
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
	...props
}) => {
	const Component = as;
	return (
		<Component
			ref={ref}
			disabled={disabled || loading}
			className={clsx(
				'flex shrink-0 cursor-pointer items-center justify-center no-underline transition-all active:scale-95',
				sizes[size],
				rounded ? 'rounded-full' : 'rounded-xl',
				variant,
				color,
				className,
				disabled
					? 'disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-40'
					: ''
			)}
			{...props}
		>
			{startIcon && (
				<IconWrapper className="mr-2" size={5}>
					{startIcon}
				</IconWrapper>
			)}
			{loading ? <Spinner size={size} variant="light" /> : children}
			{endIcon && (
				<IconWrapper className="ml-2" size={5}>
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
};

export default Button;

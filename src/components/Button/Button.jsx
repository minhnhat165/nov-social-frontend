import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Spinner } from '../Spinner';

const sizes = {
	sm: 'h-9 px-4 text-sm',
	md: 'h-10 px-6 text-base',
	lg: 'h-12 px-8 text-base',
	xl: 'h-14 px-8 text-lg',
};

export const variantsColors = {
	contained: {
		primary:
			'bg-primary-700 enabled:hover:bg-primary-800 text-white dark:bg-primary-500 dark:enabled:hover:bg-primary-600 dark:text-white',
		secondary:
			'bg-slate-200 text-slate-800 enabled:hover:bg-slate-300 dark:bg-dark-600 dark:enabled:hover:bg-dark-700 dark:text-white',
		danger: 'bg-red-500 enabled:hover:bg-red-700 text-white',
		success: 'bg-green-500 enabled:hover:bg-green-700 text-white',
		warning: 'bg-yellow-500 enabled:hover:bg-yellow-700 text-white',
		info: 'bg-blue-500 enabled:hover:bg-blue-700 text-white',
		light: 'bg-light-200 dark:bg-dark-600 dark:hover:bg-dark-700 hover:bg-gray-100 text-gray-800',
		dark: 'bg-gray-800 enabled:hover:bg-gray-900 text-white',
	},
	outlined: {
		primary:
			'bg-transparent border border-primary-700 hover:bg-primary-800 hover:text-white text-primary-700 dark:bg-transparent dark:border dark:border-primary-800 dark:hover:bg-primary-500 dark:text-primary-500 dark:hover:text-white',
		secondary:
			'bg-transparent border border-gray-500 enabled:hover:bg-gray-700 text-gray-500 dark:bg-transparent dark:border dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:text-gray-600',
		danger: 'bg-transparent border border-red-500 enabled:hover:bg-red-700 text-red-500 dark:bg-transparent dark:border dark:border-red-600 dark:enabled:hover:bg-red-700 dark:text-red-600',
		success:
			'bg-transparent border border-green-500 enabled:hover:bg-green-700 text-green-500 dark:bg-transparent dark:border dark:border-green-600 dark:enabled:hover:bg-green-700 dark:text-green-600',
		warning:
			'bg-transparent border border-yellow-500 enabled:hover:bg-yellow-700 text-yellow-500 dark:bg-transparent dark:border dark:border-yellow-600 dark:enabled:hover:bg-yellow-700 dark:text-yellow-600',
		info: 'bg-transparent border border-blue-500 enabled:hover:bg-blue-700 text-blue-500 dark:bg-transparent dark:border dark:border-blue-600 dark:enabled:hover:bg-blue-700 dark:text-blue-600',
		light: 'bg-transparent border border-gray-200 enabled:hover:bg-gray-300 text-gray-200 dark:bg-transparent dark:border dark:border-gray-300 dark:enabled:hover:bg-gray-300 dark:text-gray-300',
		dark: 'bg-transparent border border-gray-800 enabled:hover:bg-gray-900 text-gray-800 dark:bg-transparent dark:border dark:border-gray-900 dark:enabled:hover:bg-gray-900 dark:text-gray-900',
	},
	text: {
		primary:
			'bg-transparent text-primary-700 dark:bg-transparent dark:text-primary-500 hover:text-primary-800 dark:hover:text-primary-600',
		secondary:
			'bg-transparent text-gray-500 dark:bg-transparent dark:text-gray-600',
		danger: 'bg-transparent text-red-500 dark:bg-transparent dark:text-red-600',
		success:
			'bg-transparent text-green-500 dark:bg-transparent dark:text-green-600',
		warning:
			'bg-transparent text-yellow-500 dark:bg-transparent dark:text-yellow-600',
		info: 'bg-transparent text-blue-500 dark:bg-transparent dark:text-blue-600',
		light: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:bg-transparent dark:hover:bg-dark-700 dark:text-gray-300',
		dark: 'bg-transparent text-gray-800 dark:bg-transparent dark:text-gray-900',
	},
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
				variantsColors[variant][color],
				className,
				disabled
					? 'disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-40'
					: ''
			)}
			{...props}
		>
			{startIcon && <span className="mr-2">{startIcon}</span>}
			{loading ? <Spinner size={size} variant="light" /> : children}
			{endIcon && <span className="ml-2">{endIcon}</span>}
		</Component>
	);
};

Button.propTypes = {
	variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'danger',
		'success',
		'warning',
		'info',
		'light',
		'dark',
	]),
	children: PropTypes.node,
	rounded: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.oneOf(['button', 'submit']),
	onclick: PropTypes.func,
	href: PropTypes.string,
};

Button.defaultProps = {
	variant: 'contained',
	loading: false,
	disabled: false,
	size: 'sm',
	color: 'primary',
	children: 'Button',
	className: '',
	type: 'button',
	onClick: () => {},
	rounded: false,
	as: 'button',
};

export default Button;

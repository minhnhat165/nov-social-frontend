import 'style/button.css';

import { Children, cloneElement } from 'react';

import { IconWrapper } from 'components/DataDisplay';
import PropTypes from 'prop-types';
import { Spinner } from 'components/Loading';
import clsx from 'clsx';

const sizes = {
	xs: 'h-8 px-4 text-sm',
	sm: 'h-9 px-4 text-sm',
	md: 'h-10 px-6 text-base',
	lg: 'h-12 px-6 text-lg',
	xl: 'h-14 px-8 text-lg`',
};

const borderRadius = {
	xs: 'rounded-md',
	sm: 'rounded-md',
	md: 'rounded-lg',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
};

const iconStyle = {
	xs: '!w-3 !h-3',
	sm: '!w-4 !h-4',
	md: '!w-5 !h-5',
	lg: '!w-5 !h-5',
	xl: '!w-6 !h-6',
};

const iconLeftStyle = {
	xs: 'mr-1',
	sm: 'mr-1',
	md: 'mr-2',
	lg: 'mr-2',
	xl: 'mr-3',
};

const iconRightStyle = {
	xs: 'ml-1',
	sm: 'ml-1',
	md: 'ml-2',
	lg: 'ml-2',
	xl: 'ml-3',
};

export const Button = ({
	as,
	variant,
	fullWidth,
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
				'relative flex shrink-0 cursor-pointer items-center justify-center no-underline transition-all active:opacity-75 disabled:active:opacity-100',
				sizes[size],
				rounded ? 'rounded-full' : borderRadius[size],
				fullWidth ? 'w-full' : '',
				variant,
				color,
				className,
				elevated ? 'shadow' : '',
				loading && '',
				disabled &&
					'dark:!disabled:text-white dark:!disabled:bg-gray-700 cursor-not-allowed disabled:cursor-not-allowed disabled:!bg-gray-300 disabled:!text-gray-500 disabled:!opacity-40',
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

const Group = ({ children, ...props }) => {
	const numChildren = Children.count(children);
	if (numChildren === 1) return children;
	return (
		<div className="flex">
			{Children.map(children, (child, index) => {
				const position =
					index === 0
						? 'first'
						: index === numChildren - 1
						? 'last'
						: 'middle';
				return (
					<div className="flex flex-col sm:flex-row sm:space-x-2">
						{cloneElement(child, {
							...props,
							className: clsx(
								child.props.className,
								position === 'first' && 'rounded-r-none',
								position === 'last' && 'rounded-l-none',
								position !== 'first' &&
									'border-l border-normal',
							),
						})}
					</div>
				);
			})}
		</div>
	);
};

Button.Group = Group;

Button.propTypes = {
	variant: PropTypes.oneOf(['filled', 'outlined', 'text']),
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	fullWidth: PropTypes.bool,
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
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
	fullWidth: false,
};

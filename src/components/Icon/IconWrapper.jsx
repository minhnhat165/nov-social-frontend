import clsx from 'clsx';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const IconWrapper = forwardRef(
	({ children, size, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				{...props}
				className={clsx(
					className,
					`w-${size} h-${size} flex items-center justify-center text-inherit`
				)}
			>
				{children}
			</div>
		);
	}
);

IconWrapper.propTypes = {
	children: PropTypes.node,
	size: PropTypes.number,
	className: PropTypes.string,
};

IconWrapper.defaultProps = {
	size: 6,
};

export default IconWrapper;

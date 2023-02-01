import clsx from 'clsx';

const WrapperIcon = ({ children, className, ...props }) => {
	return (
		<div
			className={clsx(
				'inline-flex items-center justify-center',
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export default WrapperIcon;

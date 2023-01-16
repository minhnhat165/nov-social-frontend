import clsx from 'clsx';

const WrapperIcon = ({ children, className, ...props }) => {
	return (
		<div
			className={clsx('flex items-center justify-center', className)}
			{...props}
		>
			{children}
		</div>
	);
};

export default WrapperIcon;

const WrapperIcon = ({ children, className, ...props }) => {
	return (
		<div className={className} {...props}>
			{children}
		</div>
	);
};

export default WrapperIcon;

import React from 'react';

const Text = ({ children, as = 'span', className, ...props }) => {
	const Tag = as;
	return (
		<Tag
			className={`text-slate-800 dark:text-dark-100 ${className}`}
			{...props}
		>
			{children}
		</Tag>
	);
};

export default Text;

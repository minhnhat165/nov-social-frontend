import React from 'react';
import WrapperIcon from './WrapperIcon';

export const SunIcon = (props) => {
	return (
		<WrapperIcon {...props}>
			<i className="fa-solid fa-sun-bright text-yellow-600"></i>
		</WrapperIcon>
	);
};

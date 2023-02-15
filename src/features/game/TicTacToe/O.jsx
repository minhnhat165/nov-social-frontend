import React from 'react';

const OIcon = ({ color, className, ...props }) => (
	<svg
		fill="currentColor"
		viewBox="0 0 100 100"
		className={'animate-o' + className}
		{...props}
	>
		<circle
			cx="50"
			cy="50"
			r="40"
			stroke={color}
			strokeWidth="15"
			fill="transparent"
		/>
	</svg>
);

export default OIcon;

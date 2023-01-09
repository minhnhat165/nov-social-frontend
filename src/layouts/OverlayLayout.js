import React from 'react';

const OverlayLayout = ({ children }) => {
	return (
		<div className="absolute top-0 left-0 right-0 bottom-0 z-[97] overflow-hidden pt-20">
			{children}
		</div>
	);
};

export default OverlayLayout;

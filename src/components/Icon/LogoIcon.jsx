import React from 'react';
import logo from 'assets/images/logo.png';

const LogoIcon = () => {
	return (
		<div className="h-full w-full overflow-hidden rounded-full">
			<img
				src={logo}
				alt="logo"
				className="h-full w-full bg-white object-contain"
			/>
		</div>
	);
};

export default LogoIcon;

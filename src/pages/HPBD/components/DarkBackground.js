import React from 'react';

const DarkBackground = () => {
	return (
		<div className={`absolute z-0 h-full w-full bg-dark-regular`}>
			<div
				className={
					'relative left-1/2 top-1/2 h-[667px] w-[375px] -translate-x-1/2 -translate-y-1/2'
				}
			>
				<div
					className={`permanent animation star top-[290px] left-[173px]`}
				></div>
				<div
					className={`permanent animation star top-[376px] left-[252px]`}
				></div>
				<div
					className={`permanent animation star top-[360px] left-[116px]`}
				></div>
				<div
					className={`permanent animation star top-[386px] left-[60px]`}
				></div>
				<div
					className={`permanent animation star top-[492px] left-[211px]`}
				></div>
				<div
					className={`permanent animation star top-[529px] left-[117px]`}
				></div>
				<div
					className={`permanent animation star top-[581px] left-[115px]`}
				></div>
			</div>
		</div>
	);
};

export default DarkBackground;

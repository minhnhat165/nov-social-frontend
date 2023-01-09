import React from 'react';
import LottieWrapper from './LottieWrapper';
import * as jsonIcon from './JsonIcon/cake.json';

const LottieCakeIcon = ({ className }) => {
	return (
		<LottieWrapper
			keepLastFrame
			loop={false}
			jsonIcon={jsonIcon}
			className={className}
		/>
	);
};

export default LottieCakeIcon;

import React from 'react';
import LottieWrapper from './LottieWrapper';
import * as jsonIcon from './JsonIcon/giftbox.json';

const LottieGiftBoxIcon = ({ className }) => {
	return (
		<LottieWrapper
			loop={false}
			jsonIcon={jsonIcon}
			className={className}
			keepLastFrame
		/>
	);
};

export default LottieGiftBoxIcon;

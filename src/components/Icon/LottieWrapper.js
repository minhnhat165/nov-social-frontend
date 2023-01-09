import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LottieWrapper = ({
	jsonIcon,
	className,
	loop = true,
	keepLastFrame = false,
}) => {
	return (
		<Player
			className={className}
			autoplay
			loop={loop}
			src={jsonIcon}
			keepLastFrame={keepLastFrame}
		></Player>
	);
};

export default LottieWrapper;

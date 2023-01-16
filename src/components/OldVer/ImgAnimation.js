import { motion } from 'framer-motion';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const ImgAnimation = ({ src, className }) => {
	const [imageLoading, setImageLoading] = useState(true);
	const [pulsing, setPulsing] = useState(true);

	const imageLoaded = () => {
		setImageLoading(false);
		setTimeout(() => setPulsing(false), 600);
	};
	return (
		<div className={`${pulsing ? 'animate-pulse' : ''} w-full`}>
			<motion.div
				layout
				loading="lazy"
				initial={{ height: '0', opacity: 0 }}
				animate={{
					height: imageLoading ? '0' : 'auto',
					opacity: imageLoading ? 0 : 1,
				}}
				transition={
					({ height: { delay: 0, duration: 0.4 } },
					{ opacity: { delay: 0.5, duration: 0.4 } })
				}
				width="100%"
			>
				<LazyLoadImage
					src={src}
					alt="img"
					className={`h-full w-full ${className} max-h-96`}
					afterLoad={imageLoaded}
				></LazyLoadImage>
			</motion.div>
		</div>
	);
};

export default ImgAnimation;

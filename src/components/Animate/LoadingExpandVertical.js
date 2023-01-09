import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function LoadingExpandVertical() {
	const [imageLoading, setImageLoading] = useState(true);
	const [pulsing, setPulsing] = useState(true);

	const imageLoaded = () => {
		setImageLoading(false);
		setTimeout(() => setPulsing(false), 600);
	};
	return (
		<div className={`${pulsing ? 'animate-pulse' : ''} w-full`}>
			<motion.div
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
					className="max-h-96 w-full"
					src="https://res.cloudinary.com/devemail/image/upload/v1663690127/novsocial/6329c13b1523cf5f1057b8b5/posts/6329e58845e72870919879f8/aqfcq96ays7da1sacol8.jpg"
					alt="img"
					afterLoad={imageLoaded}
				></LazyLoadImage>
			</motion.div>
		</div>
	);
}

export default LoadingExpandVertical;

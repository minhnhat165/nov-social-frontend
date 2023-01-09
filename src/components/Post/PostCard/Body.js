import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Img from '../../Img';

const Body = ({ post }) => {
	const [imageLoading, setImageLoading] = useState(true);
	const [showImage, setShowImg] = useState(false);

	const imageLoaded = () => {
		setImageLoading(false);
	};
	useEffect(() => {
		if (post.image) {
			setTimeout(() => setShowImg(true), 340);
		}
	}, [post.image]);
	return (
		<div className="relative flex flex-col gap-4 px-4">
			{post.text && (
				<div className="break-all dark:text-dark-text-regular">{post.text}</div>
			)}
			{post.image ? (
				<motion.div
					initial={{ height: '144px', opacity: 0 }}
					animate={{
						height: imageLoading ? '144px' : 'auto',
						opacity: imageLoading ? 0 : 1,
					}}
					transition={
						({ height: { delay: 0, duration: 0.4 } },
						{ opacity: { delay: 0.5, duration: 0.4 } })
					}
					onLoad={imageLoaded}
					className="overflow-hidden rounded-xl bg-primary-bold"
				>
					{showImage && (
						<Img
							src={post.image}
							className="max-h-[540px] object-contain"
							clickAble
						/>
					)}
				</motion.div>
			) : (
				<div className="mb-8"></div>
			)}
		</div>
	);
};

export default Body;

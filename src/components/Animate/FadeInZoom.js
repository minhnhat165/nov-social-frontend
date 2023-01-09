import { motion } from 'framer-motion';

const FadeInZoom = ({ children }) => {
	return (
		<motion.div
			layout="size"
			initial={{ opacity: 0, scale: 0.4 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.4, height: 0 }}
			transition={{
				opacity: { duration: 0.2 },
				layout: {
					type: 'spring',
					bounce: 0.4,
				},
			}}
			style={{ originX: 0 }}
		>
			{children}
		</motion.div>
	);
};

export default FadeInZoom;

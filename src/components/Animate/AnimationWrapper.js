import React from 'react';
import { motion } from 'framer-motion';

const AnimationWrapper = ({ children, animation, className }) => {
	return (
		<motion.div
			layout
			variants={animation}
			initial="hidden"
			animate="visible"
			exit="exit"
			whileHover="hover"
			whileTap="click"
			className={className}
		>
			{children}
		</motion.div>
	);
};

export default AnimationWrapper;

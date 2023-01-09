import { motion } from 'framer-motion';
const ClickAble = ({ children, scale = 1.2, disabledClick }) => {
	const variants = {
		hover: {
			scale,
		},
		click: {
			scale: disabledClick ? scale : 0.8,
		},
	};

	return (
		<motion.div
			variants={variants}
			whileHover="hover"
			whileTap="click"
			className="flex-1"
		>
			{children}
		</motion.div>
	);
};

export default ClickAble;

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Tooltip = ({
	content,
	children,
	className,
	placement = 'bottom',
	arrow,
	transparent,
	delay = 0.4,
}) => {
	const [show, setShow] = useState(false);
	const animateRef = useRef({
		hidden: { opacity: 0, scale: 0, x: '-50%' },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				type: 'spring',
				stiffness: 260,
				damping: 20,
				default: { delay: delay },
			},
		},
		exit: { opacity: 0, scale: 0 },
	});
	return (
		<div
			className={`relative z-[97]`}
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
			onClick={() => setShow(false)}
		>
			{children}

			<AnimatePresence>
				{show && (
					<motion.div
						variants={animateRef.current}
						initial="hidden"
						animate="visible"
						exit="exit"
						className={`tooltip absolute left-1/2 my-2 min-w-[50px] rounded-md px-[9px] py-[5px] text-center text-sm leading-5 ${
							transparent ? 'dark:bg-slate-400/50 ' : 'dark:bg-slate-400 '
						}dark:text-dark-text-bold ${className} ${placement} whitespace-nowrap`}
					>
						{content}
						{arrow && <div className={`arrow ${placement}`}></div>}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Tooltip;

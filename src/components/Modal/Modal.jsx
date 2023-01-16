import clsx from 'clsx';
import CloseButton from 'components/CloseButton';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({
	show,
	title,
	onClose,
	onClickBackDrop = onClose,
	children,
	hasCloseButton = true,
	hasPanelStyle = true,
}) => {
	return createPortal(
		<AnimatePresence exitBeforeEnter>
			{show && (
				<>
					<motion.div
						variants={backdropAnimation}
						initial="hidden"
						animate="visible"
						exit="hidden"
						className="fixed top-0 left-0 right-0 bottom-0 z-[98] 
            backdrop-brightness-50"
						onClick={(e) => {
							e.stopPropagation();
							onClickBackDrop();
						}}
					></motion.div>

					<motion.div
						variants={modalAnimation}
						initial="hidden"
						animate="visible"
						exit="hidden"
						onClick={(e) => e.stopPropagation()}
						className={clsx(
							hasPanelStyle
								? 'bg-white dark:bg-dark-800'
								: 'bg-transparent',
							'fixed left-1/2 top-1/2 z-[99] max-w-fit overflow-hidden rounded-xl p-4 text-left align-middle shadow-xl'
						)}
					>
						{title && (
							<h2 className="mb-4 text-xl font-medium leading-6 text-gray-900 dark:text-dark-100">
								{title}
							</h2>
						)}
						<div className="absolute top-2 right-2">
							{hasCloseButton && (
								<CloseButton onClick={onClose} />
							)}
						</div>
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body
	);
};

Modal.defaultProps = {
	show: false,
	title: '',
	onClose: () => {},
	children: null,
	hasCloseButton: true,
};

const modalAnimation = {
	hidden: {
		opacity: 0,
		scale: 0,
		translateX: '-50%',
		translateY: '-50%',
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
	},
	exit: { opacity: 0, scale: 0 },
};
const backdropAnimation = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export default Modal;

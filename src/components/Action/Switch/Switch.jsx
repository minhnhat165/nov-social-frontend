import { AnimatePresence, motion } from 'framer-motion';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useState } from 'react';

const sizes = {
	sm: 'h-4 w-8',
	md: 'h-6 w-12',
	lg: 'h-6 w-12',
	xl: 'h-6 w-12',
};

const Switch = ({
	checked: defaultChecked,
	className,
	onChange,
	iconLeft,
	iconRight,
	size,
	primary,
}) => {
	const [checked, setChecked] = useState(defaultChecked);

	const handleChecked = () => {
		setChecked(!checked);
		onChange(!checked);
	};

	return (
		<motion.div
			className={clsx(
				'flex cursor-pointer items-center rounded-full border dark:border-none ',
				checked && 'place-content-end',
				className,
				primary && checked
					? 'bg-primary-700 dark:bg-primary-500'
					: 'bg-gray-200 dark:bg-gray-600',
				sizes[size],
			)}
			onClick={(e) => {
				e.stopPropagation();
				handleChecked();
			}}
		>
			<AnimatePresence>
				<motion.div
					exit={{ opacity: 0 }}
					onClick={(e) => {
						e.stopPropagation();
						handleChecked();
					}}
					layout
					variants={variants}
					animate={checked ? 'left' : 'right'}
					transition={spring}
					className={clsx(
						'dark:bg-indigo-950 flex aspect-square h-full items-center justify-center rounded-full border-2 bg-white',

						primary && checked
							? 'border-primary-700 dark:border-primary-500'
							: 'border-slate-200 dark:border-dark-600',
					)}
				>
					{checked ? iconLeft : iconRight}
				</motion.div>
			</AnimatePresence>
		</motion.div>
	);
};

const spring = {
	type: 'spring',
	stiffness: 500,
	damping: 20,
};

const variants = {
	left: { rotate: 180 },
	right: { rotate: -180 },
};

Switch.propTypes = {
	checked: PropTypes.bool,
	className: PropTypes.string,
	onChange: PropTypes.func,
	iconLeft: PropTypes.node,
	iconRight: PropTypes.node,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

Switch.defaultProps = {
	checked: false,
	className: '',
	onChange: () => {},
	iconLeft: null,
	iconRight: null,
	size: 'md',
};

export default Switch;

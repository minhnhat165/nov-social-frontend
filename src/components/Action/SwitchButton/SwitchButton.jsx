import { AnimatePresence, motion } from 'framer-motion';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useState } from 'react';

const sizes = {
	sm: 'h-4 w-8 p-0.5',
	md: 'h-6 w-12 p-1',
	lg: 'h-8 w-16',
	xl: 'h-6 w-12',
};

const animationX = {
	sm: 16,
	md: 24,
	lg: 12,
	xl: 16,
};

export function SwitchButton({ isOn: defaultValue, onChange, size }) {
	const [isOn, setIsOn] = useState(defaultValue);

	return (
		<AnimatePresence initial={false}>
			<motion.label
				className={clsx(
					'flex cursor-pointer items-center rounded-full',
					sizes[size],
					isOn
						? '  bg-primary-700 dark:bg-primary-500'
						: 'bg-gray-300 dark:bg-dark-900',
				)}
				exit={{ opacity: 0 }}
			>
				<input
					type="checkbox"
					className="absolute hidden"
					checked={isOn}
					onChange={() => {
						setIsOn((prevIsOn) => !prevIsOn);
						onChange(!isOn);
					}}
				/>

				<motion.span
					className={clsx(
						'aspect-square h-full rounded-full bg-slate-50 transition-colors dark:bg-dark-700 ',
					)}
					initial={{ x: 0 }}
					animate={{
						x: isOn ? animationX[size] : 0,
					}}
					exit={{ x: 0 }}
					transition={{
						type: 'spring',
						stiffness: 500,
						damping: 20,
					}}
				/>
			</motion.label>
		</AnimatePresence>
	);
}

SwitchButton.propTypes = {
	isOn: PropTypes.bool,
	onChange: PropTypes.func,
};

SwitchButton.defaultProps = {
	isOn: false,
	onChange: () => {},
};

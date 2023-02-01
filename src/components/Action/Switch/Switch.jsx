import clsx from 'clsx';
import { motion } from 'framer-motion';

const Switch = ({ checked, className, onChange, iconLeft, iconRight }) => {
	return (
		<div
			className={clsx(
				'flex h-6 w-12 cursor-pointer items-center rounded-full border bg-slate-100 p-1 dark:border-none dark:bg-dark-600',
				checked ? 'justify-end' : '',
				className
			)}
			onClick={(e) => {
				e.stopPropagation();
				onChange(!checked);
			}}
		>
			<motion.div
				onClick={(e) => {
					e.stopPropagation();
					onChange(!checked);
				}}
				layout
				variants={variants}
				animate={checked ? 'left' : 'right'}
				transition={spring}
				className={`dark:bg-indigo-950 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md`}
			>
				{checked ? iconLeft : iconRight}
			</motion.div>
		</div>
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

Switch.propTypes = {};

export default Switch;

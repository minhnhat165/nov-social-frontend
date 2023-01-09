import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import animation from '../../Animate/animation';
import AnimationWrapper from '../../Animate/AnimationWrapper';

const MenuItem = ({ item }) => {
	const [showSubMenu, setShowSubMenu] = useState(false);
	return (
		<div
			className={`d-xl group w-full cursor-pointer rounded-xl transition-all dark:hover:bg-dark-light ${
				showSubMenu ? 'dark:bg-dark-light' : ''
			}`}
		>
			<div
				className={`flex py-4 px-2 ${
					showSubMenu ? 'border-b border-dark-border' : ''
				}`}
				onClick={() => setShowSubMenu((prev) => !prev)}
			>
				<div className="flex w-8 items-center justify-center text-xl leading-[0] dark:text-dark-text-bold">
					{item.icon}
				</div>
				<span className="dark:text-dark-text-regular dark:group-hover:text-dark-text-bold">
					{item.title}
				</span>
			</div>
			<AnimatePresence>
				{showSubMenu && (
					<AnimationWrapper animation={animation.verticalResize}>
						<div className="h-48 w-full"></div>
					</AnimationWrapper>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MenuItem;

import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import AnimationWrapper from '../../Animate/AnimationWrapper';
import { zoom } from '../../Animate/variants';
import Button from '../../ButtonOld';
import Search from '../../Search';
import GroupChatCreate from '../GroupChatComponents/GroupChatCreate';
const Header = () => {
	const elRef = useRef(null);

	const [showButtonGroupCreator, setShowButtonGroupCreator] = useState(true);

	useOnClickOutside(elRef, () => setShowButtonGroupCreator(true));

	return (
		<div className="relative px-3">
			<div className="flex justify-center gap-2 border-b py-4 dark:border-dark-border">
				<div
					className="flex-1 transition-all"
					ref={elRef}
					onClick={() => setShowButtonGroupCreator(false)}
				>
					<Search linkPrefix="chat" />
				</div>
				<AnimatePresence>
					{showButtonGroupCreator && (
						<AnimationWrapper animation={zoom}>
							<GroupChatCreate>
								<Button
									primary
									className={`h-10 w-10 rounded-xl p-4`}
								>
									<i className="fa-solid fa-plus-large"></i>
								</Button>
							</GroupChatCreate>
						</AnimationWrapper>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Header;

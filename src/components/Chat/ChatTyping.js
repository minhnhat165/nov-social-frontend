import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar';
import TypingIcon from '../Icon/TypingIcon';

const ChatTyping = ({ conversationId }) => {
	const socket = useSelector((state) => state.socket.socket);
	const [isTyping, setIsTyping] = useState(false);
	useEffect(() => {
		socket.on('received typing', (isTyping) => {
			setIsTyping(isTyping);
		});
		return () => {
			socket.off('new message');
			setIsTyping(false);
		};
	}, [socket, conversationId]);

	return (
		<div className="flex">
			<AnimatePresence>
				{isTyping && (
					<motion.div
						layout
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
						className="flex items-center"
					>
						<Avatar />
						<TypingIcon className={'h-16 w-16'} />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ChatTyping;

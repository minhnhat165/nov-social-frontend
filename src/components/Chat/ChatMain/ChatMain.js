import { useMemo, useState } from 'react';
import { useConversation } from '../../../contexts/ConversationContext';
import { AnimatePresence, motion } from 'framer-motion';

import ChatRightSide from '../ChatRightSide';
import MessageProvider from '../Message/MessageContext';
import ChatBox from './ChatBox';
import Header from './Header';

const ChatMain = () => {
	const { conversation, setConversation } = useConversation();

	const [showSidebar, setShowSidebar] = useState(false);

	const render = useMemo(() => {
		return (
			<div className="flex h-full w-full overflow-hidden rounded-xl">
				{conversation && (
					<>
						<div className="flex-1 shadow dark:border-dark-border">
							<div className="flex h-full flex-1 flex-col dark:bg-dark-semiBold">
								<Header
									conversation={conversation}
									onShowSideBar={() => setShowSidebar(!showSidebar)}
								/>
								<MessageProvider
									conversation={conversation}
									setConversation={setConversation}
								>
									<ChatBox />
								</MessageProvider>
							</div>
						</div>
						<AnimatePresence>
							{showSidebar && (
								<motion.div
									layout
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: '360px' }}
									exit={{ opacity: 0, width: 0 }}
									transition={{
										opacity: { duration: 0.2 },
									}}
									className="shrink-0"
								>
									<ChatRightSide conversation={conversation} />
								</motion.div>
							)}
						</AnimatePresence>
					</>
				)}
			</div>
		);
	}, [conversation, setConversation, showSidebar]);

	return <>{render}</>;
};

export default ChatMain;

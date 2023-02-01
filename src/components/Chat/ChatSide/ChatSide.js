import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversations } from '../../../api/chatApi';
import ConversationProvider from '../../../contexts/ConversationContext';
import { useAsync } from '../../../hooks/useAsync';
import { setConversations } from '../../../redux/slices/chatSlice';
import FadeInZoom from '../../Animate/FadeInZoom';
import ChatItemLoading from '../../Loading/SkeletonLoading/ChatItemLoading';
import ChatItem from '../ChatItem';
import Header from './Header';

const ChatSide = () => {
	const dispatch = useDispatch();
	const conversations = useSelector((state) => state.chat.conversations);
	const currentConversationId = useSelector(
		(state) => state.chat.currentConversationId
	);

	const { loading, value } = useAsync(getConversations, []);

	useEffect(() => {
		if (!value?.conversations) return;
		dispatch(setConversations(value.conversations));
	}, [value]);

	return (
		<div className="h-full w-[320px]">
			<div className="flex h-full flex-col rounded-xl dark:bg-dark-semiBold">
				<Header />
				<div className="scrollAble mt-2 flex flex-1 flex-col gap-1 px-3 pb-4">
					{conversations.length > 0 && (
						<AnimatePresence>
							{conversations.map((conversation) => {
								return (
									<FadeInZoom key={conversation._id}>
										<ConversationProvider
											key={conversation._id}
											initialConversation={{
												...conversation,
												isActive:
													currentConversationId ===
													conversation._id,
											}}
										>
											<ChatItem />
										</ConversationProvider>
									</FadeInZoom>
								);
							})}
						</AnimatePresence>
					)}

					{loading && (
						<>
							<ChatItemLoading />
							<ChatItemLoading />
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ChatSide;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { accessConversation } from '../../../api/chatApi';

import ConversationProvider from '../../../contexts/ConversationContext';
import { useAsyncFn } from '../../../hooks/useAsync';
import { setCurrentConversationId } from '../../../redux/slices/chatSlice';
import ChatMain from './ChatMain';

const ChatMainContainer = () => {
	const { id } = useParams();
	const socket = useSelector((state) => state.socket.socket);
	const params = useParams();
	const dispatch = useDispatch();
	const accessConversationFn = useAsyncFn(accessConversation);
	const [conversation, setConversation] = useState(null);
	const [isExistConversation, setIsExistConversation] = useState(true);
	useEffect(() => {
		let mounted = true;
		accessConversationFn.execute(params.id).then((data) => {
			const conversation = data.conversation;
			if (mounted) {
				setConversation(conversation);
				setIsExistConversation(!!conversation);
				dispatch(setCurrentConversationId(conversation?._id));
			}
		});
		return () => {
			mounted = false;
		};
	}, [id]);

	useEffect(() => {
		if (conversation?._id && socket) {
			socket.emit('join room', conversation._id);
		}
		return () => {
			if (socket && conversation?._id)
				socket.emit('leave room', conversation._id);
		};
	}, [socket, conversation?._id]);
	return (
		<div className="flex h-full w-full flex-col overflow-hidden rounded-xl">
			{conversation && (
				<ConversationProvider initialConversation={conversation}>
					<ChatMain />
				</ConversationProvider>
			)}

			{!isExistConversation && (
				<div className="flex h-full w-full items-center justify-center p-4 text-2xl dark:bg-dark-regular dark:text-dark-text-bold">
					The conversation does not exist or you are not allowed to join !!!
				</div>
			)}
		</div>
	);
};

export default ChatMainContainer;

import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, deleteMessage } from '../../../api/chatApi';
import { getDiffTime } from '../../../functions';
import { useAsyncFn } from '../../../hooks/useAsync';

import { updateConversations } from '../../../redux/slices/chatSlice';

const Context = createContext();
export function useMessage() {
	return useContext(Context);
}

const MessageProvider = ({ children, conversation, setConversation }) => {
	const dispatch = useDispatch();
	const socket = useSelector((state) => state.socket.socket);
	const userId = useSelector((state) => state.auth.user._id);

	const [messages, setMessages] = useState([]);
	const deleteMessageFn = useAsyncFn(deleteMessage);
	const createMessageFn = useAsyncFn(createMessage);

	const deleteLocalMessage = (messageDeletedId) => {
		setMessages((prev) =>
			prev.filter((message) => message._id !== messageDeletedId)
		);
	};

	const createLocalMessage = (message) => {
		setMessages((prev) => [message, ...prev]);
	};

	const handleDeleteMessage = (messageDelete) => {
		deleteMessageFn.execute(messageDelete._id).then(() => {
			deleteLocalMessage(messageDelete._id);
		});
	};

	const handleSendMessage = (data) => {
		data.append('sender', userId);
		data.append('conversationId', conversation._id);
		createMessageFn.execute(data).then((data) => {
			const newMessage = data.newMessage;
			createLocalMessage(newMessage);
			const newConversation = {
				...conversation,
				latestMessage: newMessage,
			};
			socket.emit('send message', newConversation);
			dispatch(updateConversations(newConversation));
		});
	};

	const GroupMessagesByTime = useMemo(() => {
		const result = [];
		messages.forEach((message, index) => {
			if (index === 0 || message.isNotification) {
				const newGroup = { sender: message.sender, messages: [message] };
				result.push(newGroup);
			} else {
				if (
					message.sender._id !== messages[index - 1].sender._id ||
					messages[index - 1].isNotification
				) {
					const newGroup = { sender: message.sender, messages: [message] };
					result.push(newGroup);
				} else {
					const diffTime = getDiffTime(
						new Date(message.createdAt),
						new Date(messages[index - 1].createdAt)
					);

					if (diffTime.includes('minute') || diffTime === 'just now') {
						result[result.length - 1].messages.unshift(message);
					} else {
						const newGroup = { sender: message.sender, messages: [message] };
						result.push(newGroup);
					}
				}
			}
		});
		return result;
	}, [messages]);

	useEffect(() => {
		socket.on('new message', (data) => {
			if (data._id === conversation._id) {
				setConversation(data);
				createLocalMessage(data.latestMessage);
			}
		});
		return () => {
			socket.off('new message');
		};
	}, [socket, conversation._id]);

	const render = useMemo(() => {
		return children;
	}, []);

	return (
		<Context.Provider
			value={{
				conversation,
				GroupMessagesByTime,
				setMessages,
				handleDeleteMessage,
				handleSendMessage,
			}}
		>
			{render}
		</Context.Provider>
	);
};

export default MessageProvider;

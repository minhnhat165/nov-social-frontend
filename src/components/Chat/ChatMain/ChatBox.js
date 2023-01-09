import { useCallback, useEffect, useRef, useState } from 'react';

import { getMessages } from '../../../api/chatApi';
import { useAsyncFn } from '../../../hooks/useAsync';
import { Spinner } from '../../Spinner';
import ChatTyping from '../ChatTyping';
import GroupMessage from '../Message/GroupMessage';
import { useMessage } from '../Message/MessageContext';
import MessageCreator from '../Message/MessageCreator';

const LIMIT_MESSAGE_LOAD = 18;
const ChatBox = () => {
	const triggerRef = useRef(null);
	const getMessageFn = useAsyncFn(getMessages);
	const [stop, setStop] = useState(false);
	const [isFirstLoad, setIsFirstLoad] = useState(false);
	const [endTime, setEndTime] = useState('');

	const {
		setMessages,
		GroupMessagesByTime,
		handleSendMessage,
		conversation,
	} = useMessage();

	const handleGetMessages = useCallback(async () => {
		if (stop || getMessageFn.loading || !isFirstLoad) return;

		getMessageFn
			.execute(conversation._id, endTime, LIMIT_MESSAGE_LOAD)
			.then((data) => {
				const messages = data.messages;
				if (messages.length < LIMIT_MESSAGE_LOAD) setStop(true);
				setMessages((prev) => [...prev, ...messages]);
				setEndTime(messages[messages.length - 1]?.createdAt);
			});
	}, [conversation._id, endTime, getMessageFn, isFirstLoad, stop]);

	useEffect(() => {
		let mounted = true;
		if (conversation._id) {
			getMessageFn
				.execute(conversation._id, '', LIMIT_MESSAGE_LOAD)
				.then((data) => {
					if (mounted) {
						const messages = data.messages;
						setMessages(messages);
						if (messages.length < LIMIT_MESSAGE_LOAD) setStop(true);
						setEndTime(messages[messages.length - 1]?.createdAt);
						setIsFirstLoad(true);
					}
				});
			return () => {
				mounted = false;
				setMessages([]);
				setIsFirstLoad(false);
				setStop(false);
			};
		}
	}, [conversation._id]);

	useEffect(() => {
		const trigger = triggerRef.current;
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && isFirstLoad) {
				handleGetMessages();
			}
		});
		if (trigger) observer.observe(trigger);

		return () => {
			if (trigger) observer.unobserve(trigger);
		};
	}, [handleGetMessages, isFirstLoad]);

	return (
		<>
			<div className="scrollAble occupy relative flex flex-1 flex-col-reverse rounded-tr-xl px-4 dark:bg-dark-regular">
				<ChatTyping conversationId={conversation._id} />

				{GroupMessagesByTime.map((groupedMessages) => (
					<GroupMessage
						key={groupedMessages.messages[0]._id}
						groupedMessages={groupedMessages}
					/>
				))}

				<div ref={triggerRef} className="flex w-full justify-center">
					<div className="relative h-6 w-6">
						{getMessageFn.loading && (
							<div className="absolute bottom-[-200%] rounded-full p-2 dark:bg-dark-regular">
								<Spinner className="h-6 w-6 " />
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="w-full justify-self-end p-4 pt-2 dark:bg-dark-regular">
				<MessageCreator
					onSubmit={handleSendMessage}
					conversationId={conversation._id}
				/>
			</div>
		</>
	);
};

export default ChatBox;

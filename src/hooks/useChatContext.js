import { useContext } from 'react';
import { ChatContext } from '../components/Chat/ChatMain/ChatMain';

export const useChatContext = () => {
	const { conversation, setConversation } = useContext(ChatContext);
	return { conversation, setConversation };
};

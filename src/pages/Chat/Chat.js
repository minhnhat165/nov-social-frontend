import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import ChatSide from '../../components/Chat/ChatSide';
import ChatProvider from '../../contexts/ChatContext';

const Chat = () => {
	const params = useParams();
	const conversations = useSelector((state) => state.chat.conversations);
	const navigate = useNavigate();
	useEffect(() => {
		document.title = 'Chat | NovSocial';
	}, []);
	useEffect(() => {
		if (!params?.id && conversations.length > 0) {
			navigate(`/chat/${conversations[0]._id}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params, conversations]);

	return (
		<ChatProvider>
			<div className="flex h-full w-full p-1 pt-3 dark:bg-dark-light">
				<div className="p-1">
					<ChatSide />
				</div>
				<div className="flex flex-1 p-1">
					<Outlet />
				</div>
			</div>
		</ChatProvider>
	);
};

export default Chat;

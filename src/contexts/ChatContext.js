import { createContext, useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addConversation } from '../redux/slices/chatSlice';

const Context = createContext();
export function useChat() {
	return useContext(Context);
}

const ChatProvider = ({ children }) => {
	const socket = useSelector((state) => state.socket.socket);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleCreateLocalGroupChat = (newGroupChat) => {
		dispatch(addConversation(newGroupChat));
		navigate(`/chat/${newGroupChat._id}`);
		socket.emit('send message', newGroupChat);
	};

	const renderChildren = useMemo(() => {
		return children;
	}, []);

	return (
		<Context.Provider
			value={{
				handleCreateLocalGroupChat,
			}}
		>
			{renderChildren}
		</Context.Provider>
	);
};

export default ChatProvider;

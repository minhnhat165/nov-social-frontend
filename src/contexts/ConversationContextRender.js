import React, { createContext, useContext, useMemo } from 'react';
import { useConversation } from './ConversationContext';
const Context = createContext();
export function useConversationAction() {
	return useContext(Context);
}

const ConversationContextRender = ({ children }) => {
	const { conversation, ...params } = useConversation();
	const render = useMemo(() => {
		return children;
	}, [conversation]);
	return <Context.Provider value={{ ...params }}>{render}</Context.Provider>;
};

export default ConversationContextRender;

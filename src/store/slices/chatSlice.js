import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentConversationId: undefined,
	conversations: [],
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setConversations: (state, action) => {
			state.conversations = action.payload;
		},
		setCurrentConversationId: (state, action) => {
			state.currentConversationId = action.payload;
		},
		updateConversations: (state, action) => {
			let isExist = false;
			state.conversations.forEach((conversation, index) => {
				if (conversation._id === action.payload._id) {
					state.conversations.splice(index, 1);
					state.conversations.unshift(action.payload);
					isExist = true;
					return;
				}
			});
			if (!isExist) state.conversations.unshift(action.payload);
		},
		removeConversation: (state, action) => {
			state.conversations.forEach((conversation, index) => {
				if (conversation._id === action.payload) {
					state.conversations.splice(index, 1);
					return;
				}
			});
		},
		updateConversation: (state, action) => {
			state.conversations.forEach((conversation, index) => {
				if (conversation._id === action.payload._id) {
					state.conversations.splice(index, 1);
					state.conversations.unshift(action.payload);
					return;
				}
			});
		},
		addConversation: (state, action) => {
			state.conversations.unshift(action.payload);
		},
	},
});

export const {
	setCurrentConversationId,
	setConversations,
	addConversation,
	updateConversation,
	updateConversations,
	removeConversation,
} = chatSlice.actions;
export default chatSlice.reducer;

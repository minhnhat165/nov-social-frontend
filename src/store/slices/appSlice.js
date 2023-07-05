import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isReload: false,
	userOnlineIds: [],
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setReload: (state, action) => {
			state.isReload = action.payload;
		},
		setUserOnlineIds: (state, action) => {
			state.userOnlineIds = action.payload;
		},
		addUserOnline: (state, action) => {
			const isExist = state.userOnlineIds.find(
				(id) => id === action.payload,
			);
			if (!isExist) {
				state.userOnlineIds.push(action.payload);
			}
		},
		removeUserOnline: (state, action) => {
			const index = state.userOnlineIds.findIndex(
				(id) => id === action.payload,
			);
			if (index > -1) {
				state.userOnlineIds.splice(index, 1);
			}
		},
	},
});

export const { setReload, addUserOnline, removeUserOnline, setUserOnlineIds } =
	appSlice.actions;

const appReducer = appSlice.reducer;

export default appReducer;

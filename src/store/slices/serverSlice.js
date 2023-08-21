import { createSlice } from '@reduxjs/toolkit';

const serverSlice = createSlice({
	name: 'server',
	initialState: {
		isStarted: false,
	},
	reducers: {
		setIsStarted: (state, action) => {
			state.isStarted = action.payload;
		},
	},
});

export const { setIsStarted } = serverSlice.actions;

const serverReducer = serverSlice.reducer;

export default serverReducer;

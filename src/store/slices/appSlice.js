import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isReload: false,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setReload: (state, action) => {
			state.isReload = action.payload;
		},
	},
});

export const { setReload } = appSlice.actions;

const appReducer = appSlice.reducer;

export default appReducer;

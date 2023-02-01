import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: null,
};

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setProfile: (state, action) => {
			state.data = action.payload;
		},
		updateProfile: (state, action) => {
			state.data = { ...state.data, ...action.payload };
		},
	},
});
export const { setProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;

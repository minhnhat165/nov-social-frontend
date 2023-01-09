import { createSlice } from '@reduxjs/toolkit';
const initialState = {
	data: null,
};

const commentSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		setComments: (state, action) => {
			state.user = action.payload;
		},
	},
});
export const { setComments } = commentSlice.actions;
export default commentSlice.reducer;

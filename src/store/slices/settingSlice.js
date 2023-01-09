import { createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
	name: 'setting',
	initialState: {
		theme: null,
	},
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
	},
});

export const { setTheme } = settingSlice.actions;

// export const selectTheme = (state) => state.setting.theme;
const settingReducer = settingSlice.reducer;

export default settingReducer;

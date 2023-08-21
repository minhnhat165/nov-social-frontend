import { createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
	name: 'setting',
	initialState: {
		theme: null,
		focusMode: false,
		hideRankBoard: false,
		hideRecommendation: false,
		isRankingBoardMinimized: false,
	},
	reducers: {
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		setFocusMode: (state, action) => {
			state.focusMode = action.payload;
		},
		setHideRankBoard: (state, action) => {
			state.hideRankBoard = action.payload;
		},
		setHideRecommendation: (state, action) => {
			state.hideRecommendation = action.payload;
		},
		setRankingBoardMinimized: (state, action) => {
			state.isRankingBoardMinimized = action.payload;
		},
	},
});

export const {
	setTheme,
	setFocusMode,
	setHideRankBoard,
	setHideRecommendation,
	setRankingBoardMinimized,
} = settingSlice.actions;

const settingReducer = settingSlice.reducer;

export default settingReducer;

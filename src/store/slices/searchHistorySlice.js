import { historyType } from 'utils/createSearchHistory';

const { createSlice } = require('@reduxjs/toolkit');

const searchHistorySlice = createSlice({
	name: 'searchHistory',
	initialState: {
		loaded: false,
		data: [],
	},
	reducers: {
		setSearchHistory: (state, action) => {
			state.loaded = true;
			state.data = action.payload;
		},
		addSearchHistory: (state, action) => {
			if (state.data.length > 0) {
				// Remove the item with the same type and text from the data array
				if (action.payload.type === 'keyword') {
					const index = state.data.findIndex(
						(item) =>
							item.type === historyType.KEYWORD &&
							item.text === action.payload.text
					);
					if (index !== -1) {
						state.data.splice(index, 1);
					}
				} else {
					// Remove the item with the same type and id from the data array
					const index = state.data.findIndex(
						(item) =>
							item.type === 'user' &&
							item.data.user._id === action.payload.data.user._id
					);
					if (index !== -1) {
						state.data.splice(index, 1);
					}
				}
			}
			state.data = [action.payload, ...state.data];
		},
		removeSearchHistory: (state, action) => {
			const index = state.data.findIndex(
				(item) => item._id === action.payload
			);
			if (index !== -1) {
				state.data.splice(index, 1);
			}
		},

		serverResponseUpdate: (state, action) => {
			const index = state.data.findIndex(
				(item) => item._id === action.payload.clientId
			);
			console.log(index, action.payload.clientId);
			if (index !== -1) {
				state.data[index] = action.payload.search;
			}
		},
	},
});

export const {
	setSearchHistory,
	addSearchHistory,
	removeSearchHistory,
	serverResponseUpdate,
} = searchHistorySlice.actions;
const searchHistoryReducer = searchHistorySlice.reducer;
export default searchHistoryReducer;

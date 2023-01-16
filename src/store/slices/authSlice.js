import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { followUser } from '../../api/userApi';

const initialState = {
	user: null,
	accessToken: null,
	isLogin: false,
};

export const toggleFollow = createAsyncThunk(
	'auth/toggleFollow',
	async (userId, thunkAPI) => {
		const response = await followUser(userId);
		return response.data;
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
			state.isLogin = true;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},

		updateUser: (state, action) => {
			state.user = { ...state.user, ...action.payload };
		},

		login: (state, action) => {
			state.accessToken = action.payload.accessToken;
			state.isLogin = true;
		},

		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
		},
		logout: (state, actions) => {
			state.user = null;
			state.accessToken = null;
			state.isLogin = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(toggleFollow.fulfilled, (state, action) => {
			state.user.following = action.payload.user.following;
		});
	},
});

export const {
	logout,
	setCredentials,
	setAccessToken,
	setUser,
	login,
	updateUser,
} = authSlice.actions;
export default authSlice.reducer;

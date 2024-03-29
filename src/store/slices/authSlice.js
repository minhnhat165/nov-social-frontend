import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	accessToken: null,
	isLogin: false,
};

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
			const user = action.payload;
			const hasLinkedAccountsNotify = user?.linkedAccounts?.some(
				(account) => account.numNotifications > 0,
			);

			state.user = { ...user, hasLinkedAccountsNotify };
		},

		setLinkedAccounts: (state, action) => {
			const linkedAccounts = action.payload;
			const hasLinkedAccountsNotify = linkedAccounts?.some(
				(account) => account.numNotifications > 0,
			);
			state.user.hasLinkedAccountsNotify = hasLinkedAccountsNotify;
			state.user.linkedAccounts = linkedAccounts;
		},

		updateLinkedAccount: (state, action) => {
			console.log('action.payload', action.payload);
			const linkedAccounts = state.user.linkedAccounts.map((account) => {
				if (account._id === action.payload._id) {
					return { ...account, ...action.payload };
				}
				return account;
			});
			const hasLinkedAccountsNotify = linkedAccounts?.some(
				(account) => account.numNotifications > 0,
			);
			state.user.hasLinkedAccountsNotify = hasLinkedAccountsNotify;
			state.user.linkedAccounts = linkedAccounts;
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
});

export const {
	logout,
	setCredentials,
	setAccessToken,
	setUser,
	setLinkedAccounts,
	login,
	updateUser,
	updateLinkedAccount,
} = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
	getNotifications as getNotificationsApi,
	createNotification as createNotificationApi,
	deleteNotification as deleteNotificationApi,
} from '../../api/notifyApi';
const initialState = {
	loading: false,
	data: [],
	isFirstLoaded: false,
	error: null,
};

export const getNotifications = createAsyncThunk(
	'notifications/get',
	async () => {
		const res = await getNotificationsApi();
		return res.data;
	}
);

export const createNotification = createAsyncThunk(
	'notifications/create',
	async ({ data, socket }) => {
		const res = await createNotificationApi(data);
		if (res?.data) socket.emit('send notification', res.data);
	}
);

export const deleteNotification = createAsyncThunk(
	'notifications/delete',
	async ({ data, socket }) => {
		const res = await deleteNotificationApi(data);
		if (res?.data) socket.emit('send remove notification', res.data);
	}
);

export const removeNotify = createAsyncThunk('auth/remove');

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification: (state, action) => {
			const index = state.data.findIndex(
				(notification) => notification._id === action.payload._id
			);
			if (index >= 0) state.data.splice(index, 1);
			if (action.payload?.isDeleted) return;
			state.data.unshift(action.payload);
		},
		removeNotification: (state, action) => {
			state.data = state.data.filter(
				(notification) => notification._id !== action.payload
			);
		},
		setReadNotification: (state, action) => {
			const index = state.data.findIndex(
				(notification) => notification._id === action.payload
			);
			state.data[index].isRead = true;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getNotifications.fulfilled, (state, action) => {
			state.data = action.payload;
			state.isFirstLoaded = true;
		});

		builder.addCase(removeNotify.fulfilled, (state, action) => {
			state.data = state.data.fill(
				(notification) => notification._id !== action.payload
			);
		});
	},
});
export const { addNotification, setReadNotification, removeNotification } =
	notificationSlice.actions;
export default notificationSlice.reducer;

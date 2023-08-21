import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appReducer from './slices/appSlice';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import notificationReducer from './slices/notificationSlice';
import { persistReducer } from 'redux-persist';
import profileReducer from './slices/profileSlice';
import searchHistoryReducer from './slices/searchHistorySlice';
import serverReducer from './slices/serverSlice';
import settingReducer from './slices/settingSlice';
import socketReducer from './slices/socketSlice';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	chat: chatReducer,
	socket: socketReducer,
	profile: profileReducer,
	notification: notificationReducer,
	setting: settingReducer,
	searchHistory: searchHistoryReducer,
	server: serverReducer,
});

const persistConfig = {
	key: 'root',
	version: 1,
	timeout: 500, //Set the timeout function to 2 seconds
	storage,
	whitelist: ['auth', 'setting'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;

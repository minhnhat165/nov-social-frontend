import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import profileReducer from './slices/profileSlice';
import socketReducer from './slices/socketSlice';
import notificationReducer from './slices/notificationSlice';
import settingReducer from './slices/settingSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	chat: chatReducer,
	socket: socketReducer,
	profile: profileReducer,
	notification: notificationReducer,
	setting: settingReducer,
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

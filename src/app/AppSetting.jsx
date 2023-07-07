import { useDispatch, useSelector } from 'react-redux';

import { SCREEN_MODE } from 'constants/app';
import { getUser } from 'api/authApi';
import { setScreenMode } from 'store/slices/appSlice';
import { setTheme } from 'store/slices/settingSlice';
import { setUser } from 'store/slices/authSlice';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useWindowSize } from '@uidotdev/usehooks';

const AppSetting = (props) => {
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.setting.theme);
	const isLogin = useSelector((state) => state.auth.isLogin);
	const { width } = useWindowSize();
	useEffect(() => {
		if (width < SCREEN_MODE.MOBILE.max) {
			dispatch(setScreenMode(SCREEN_MODE.MOBILE.name));
		} else if (width < SCREEN_MODE.TABLET.max) {
			dispatch(setScreenMode(SCREEN_MODE.TABLET.name));
		} else {
			dispatch(setScreenMode(SCREEN_MODE.DESKTOP.name));
		}
	}, [dispatch, width]);

	useQuery('user', getUser, {
		enabled: isLogin,
		onSuccess: ({ user }) => {
			dispatch(setUser(user));
		},
		onError: (error) => {
			console.log(error);
		},
	});
	useEffect(() => {
		if (!theme) {
			// get system theme
			const systemTheme = window.matchMedia(
				'(prefers-color-scheme: dark)',
			).matches
				? 'dark'
				: 'light';
			// set theme
			dispatch(setTheme(systemTheme));
			return;
		}
		const isDarkMode = theme === 'dark';
		const root = window.document.documentElement;
		const prevTheme = isDarkMode ? 'light' : 'dark';
		root.classList.remove(prevTheme);
		const nextTheme = isDarkMode ? 'dark' : 'light';
		root.classList.add(nextTheme);
		const body = document.getElementsByTagName('body')[0];
		body.style.backgroundColor = isDarkMode ? '#19212e' : '#e2e8f0';
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme]);
	return <></>;
};

AppSetting.propTypes = {};

export default AppSetting;

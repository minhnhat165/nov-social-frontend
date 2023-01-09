import { getUser } from 'api/authApi';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'store/slices/settingSlice';

const AppSetting = (props) => {
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.setting.theme);
	const isLogin = useSelector((state) => state.auth.isLogin);

	// useQuery('user', getUser, {
	// 	enabled: isLogin,
	// 	onSuccess: (data) => {
	// 		console.log(data);
	// 	},
	// });
	useEffect(() => {
		if (!theme) {
			// get system theme
			const systemTheme = window.matchMedia(
				'(prefers-color-scheme: dark)'
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme]);
	return <div></div>;
};

AppSetting.propTypes = {};

export default AppSetting;

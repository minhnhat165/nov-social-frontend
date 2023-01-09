import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'store/slices/settingSlice';

const useTheme = () => {
	let theme = useSelector((state) => state.setting.theme);
	const dispatch = useDispatch();

	const getSystemTheme = () => {
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		)
			return 'dark';
		return 'light';
	};

	useEffect(() => {
		if (!theme) {
			dispatch(setTheme(getSystemTheme()));
			return;
		}
		const root = window.document.documentElement;
		const prevTheme = theme === 'light' ? 'dark' : 'light';
		root.classList.remove(prevTheme);
		const nextTheme = theme === 'light' ? 'light' : 'dark';
		root.classList.add(nextTheme);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme]);
};

export default useTheme;

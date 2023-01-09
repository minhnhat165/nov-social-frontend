import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'store/slices/settingSlice';
export default function useDarkMode() {
	const dispatch = useDispatch();
	const isDarkMode = useSelector((state) => state.setting.theme === 'dark');
	const toggleDarkMode = () => {
		dispatch(setTheme(isDarkMode ? 'light' : 'dark'));
	};
	return [isDarkMode, toggleDarkMode];
}

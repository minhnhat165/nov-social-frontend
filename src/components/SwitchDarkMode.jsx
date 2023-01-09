import useDarkMode from '../hooks/useDarkMode';
import { MoonIcon, SunIcon } from './Icon';
import SwitchButton from './SwitchButton';
const ToggleButton = () => {
	const [isDarkMode, toggleDarkMode] = useDarkMode();
	return (
		<SwitchButton
			checked={isDarkMode}
			onChange={toggleDarkMode}
			iconLeft={<MoonIcon />}
			iconRight={<SunIcon />}
		/>
	);
};

export default ToggleButton;

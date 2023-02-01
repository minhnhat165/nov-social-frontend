import useDarkMode from '../../../hooks/useDarkMode';
import { MoonIcon, SunIcon } from '../../Icon';
import Switch from '../Switch/Switch';

const ToggleButton = () => {
	const [isDarkMode, toggleDarkMode] = useDarkMode();
	return (
		<Switch
			checked={isDarkMode}
			onChange={toggleDarkMode}
			iconLeft={
				<MoonIcon className="h-4 w-4 rotate-180 text-primary-700" />
			}
			iconRight={<SunIcon className="text-yellow-600" />}
		/>
	);
};

export default ToggleButton;

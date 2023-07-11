import { SwitchButton } from '../SwitchButton';
import useDarkMode from '../../../hooks/useDarkMode';

export const SwitchDarkMode = () => {
	const [isDarkMode, toggleDarkMode] = useDarkMode();
	return <SwitchButton checked={isDarkMode} onChange={toggleDarkMode} />;
};

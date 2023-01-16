import { ChevronRightIcon, LanguageIcon, MoonIcon } from 'components/Icon';
import MenuItem from 'components/MenuItem';
import SwitchDarkMode from 'components/SwitchDarkMode/SwitchDarkMode';

const SettingActionMenu = () => {
	return (
		<>
			<MenuItem
				icon={<LanguageIcon className="text-xl" />}
				title={'English'}
				end={<ChevronRightIcon />}
			/>
			<MenuItem
				icon={<MoonIcon className="text-xl" />}
				title={'Dark Mode'}
				end={<SwitchDarkMode />}
			/>
		</>
	);
};

export default SettingActionMenu;

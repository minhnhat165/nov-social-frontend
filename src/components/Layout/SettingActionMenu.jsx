import { ChevronRightIcon, LanguageIcon, MoonIcon } from 'components/Icon';
import IconWrapper from 'components/Icon/IconWrapper';
import MenuItem from 'components/Navigation/MenuItem';
import SwitchDarkMode from 'components/Action/SwitchDarkMode/SwitchDarkMode';

const SettingActionMenu = () => {
	return (
		<>
			<MenuItem
				icon={<LanguageIcon />}
				title={'English'}
				end={
					<IconWrapper>
						<ChevronRightIcon />
					</IconWrapper>
				}
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

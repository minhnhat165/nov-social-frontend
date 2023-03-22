import { ChevronRightIcon, LanguageIcon, MoonIcon } from 'components/Icon';

import { IconWrapper } from 'components/DataDisplay';
import MenuItem from 'components/Navigation/MenuItem';
import { SwitchDarkMode } from 'components/Action';

const SettingMenu = () => {
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

export default SettingMenu;

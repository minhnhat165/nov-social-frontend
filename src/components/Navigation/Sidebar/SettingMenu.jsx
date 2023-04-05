import {
	ChevronRightIcon,
	LanguageIcon,
	LightBulbIcon,
	MoonIcon,
} from 'components/Icon';
import { SwitchButton, SwitchDarkMode } from 'components/Action';
import { useDispatch, useSelector } from 'react-redux';

import { IconWrapper } from 'components/DataDisplay';
import MenuItem from 'components/Navigation/MenuItem';
import { setFocusMode } from 'store/slices/settingSlice';

const SettingMenu = () => {
	const focusMode = useSelector((state) => state.setting.focusMode);
	const dispatch = useDispatch();

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
			<MenuItem
				icon={<LightBulbIcon />}
				title={'Focus Mode'}
				end={
					<SwitchButton
						isOn={focusMode}
						onChange={() => dispatch(setFocusMode(!focusMode))}
					/>
				}
			/>
		</>
	);
};

export default SettingMenu;

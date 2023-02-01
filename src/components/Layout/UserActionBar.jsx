import Tippy from '@tippyjs/react/headless';
import Avatar from 'components/DataDisplay/Avatar';
import { Cog6ToothIcon, PlusIcon } from 'components/Icon';
import PopoverContentWrapper from 'components/OverLay/Popover/PopoverContentWrapper';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import AccountActionMenu from './AccountActionMenu';
import SettingActionMenu from './SettingActionMenu';

const UserActionBar = (props) => {
	return (
		<div className="flex flex-col gap-4 px-2 pb-2">
			<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 shadow dark:bg-dark-700">
				<PlusIcon className="h-6 w-6 text-primary-700" />
			</div>
			<SettingAction />
			<AccountAction />
		</div>
	);
};

const AccountAction = () => {
	const [showMenu, setShowMenu] = useState(false);
	const user = useSelector((state) => {
		return {
			_id: state.auth.user?._id,
			name: state.auth.user?.name,
			avatar: state.auth.user?.avatar,
		};
	});
	return (
		<Tippy
			interactive
			appendTo={'parent'}
			visible={showMenu}
			onClickOutside={() => {
				setShowMenu(false);
			}}
			placement="right-end"
			offset={[8, 16]}
			render={(attrs) => (
				<PopoverContentWrapper
					{...attrs}
					arrow
					onClick={() => setShowMenu(false)}
					className="h-fit w-80 p-2 shadow-3xl transition-all"
				>
					<AccountActionMenu />
				</PopoverContentWrapper>
			)}
		>
			<div
				className="cursor-pointer"
				onClick={() => {
					setShowMenu(!showMenu);
				}}
			>
				<Avatar src={user?.avatar} alt={user?.name} />
			</div>
		</Tippy>
	);
};

const SettingAction = () => {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<Tippy
			interactive
			appendTo={'parent'}
			visible={showMenu}
			onClickOutside={() => {
				setShowMenu(false);
			}}
			placement="right-end"
			offset={[64, 16]}
			render={(attrs) => (
				<PopoverContentWrapper
					{...attrs}
					arrow
					className="h-fit w-80 p-2 shadow-3xl transition-all"
				>
					<SettingActionMenu />
				</PopoverContentWrapper>
			)}
		>
			<div
				className="flex h-10 w-10 cursor-pointer items-center justify-center"
				onClick={() => {
					setShowMenu(!showMenu);
				}}
			>
				<Cog6ToothIcon className="h-6 w-6 text-slate-800 dark:text-dark-100" />
			</div>
		</Tippy>
	);
};

UserActionBar.propTypes = {};

export default UserActionBar;

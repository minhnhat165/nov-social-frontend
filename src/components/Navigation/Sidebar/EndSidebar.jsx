import { Cog6ToothIcon, PlusIcon } from 'components/Icon';

import AccountMenu from './AccountMenu';
import Avatar from 'components/DataDisplay/Avatar';
import Popover from 'components/OverLay/Popover';
import SettingMenu from './SettingMenu';
import Tooltip from 'components/OverLay/Tooltip';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const EndSidebar = () => {
	return (
		<div className="mt-auto py-2">
			<div className="flex flex-col gap-4 px-2">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 shadow dark:bg-dark-700">
					<PlusIcon className="h-6 w-6 text-primary-700" />
				</div>
				<Setting />
				<Account />
			</div>
		</div>
	);
};

const Account = () => {
	const [showMenu, setShowMenu] = useState(false);
	const user = useSelector((state) => {
		return {
			_id: state.auth.user?._id,
			name: state.auth.user?.name,
			avatar: state.auth.user?.avatar,
			hasLinkedAccountsNotify: state.auth.user?.hasLinkedAccountsNotify,
		};
	});
	return (
		<Popover
			interactive
			appendTo={document.body}
			visible={showMenu}
			onClickOutside={() => {
				setShowMenu(false);
			}}
			placement="right-end"
			offset={[8, 16]}
			render={(attrs) => (
				<Popover.Content
					{...attrs}
					onClick={() => {
						setShowMenu(false);
					}}
					className="h-fit w-80 p-2 shadow-3xl transition-all"
				>
					<Popover.Arrow />
					<AccountMenu />
				</Popover.Content>
			)}
		>
			<Tooltip content={'Account'} placement="right">
				<div
					className="cursor-pointer transition-all hover:opacity-70 active:translate-y-0.5 active:opacity-50"
					onClick={() => {
						setShowMenu(!showMenu);
					}}
				>
					<Avatar
						src={user?.avatar}
						alt={user?.name}
						className="relative"
					>
						{user?.hasLinkedAccountsNotify && <Avatar.Status />}
					</Avatar>
				</div>
			</Tooltip>
		</Popover>
	);
};

const Setting = () => {
	const [showMenu, setShowMenu] = useState(false);
	return (
		<Popover
			interactive
			appendTo={'parent'}
			visible={showMenu}
			onClickOutside={() => {
				setShowMenu(false);
			}}
			placement="right-end"
			offset={[64, 16]}
			render={(attrs) => (
				<Popover.Content
					{...attrs}
					className="h-fit w-80 p-2 shadow-3xl transition-all"
				>
					<Popover.Arrow />
					<SettingMenu />
				</Popover.Content>
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
		</Popover>
	);
};

EndSidebar.propTypes = {};

export default EndSidebar;

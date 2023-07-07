import {
	BellIcon,
	CircleCheckIcon,
	ListCheckIcon,
	LogoutIcon,
	UserPlusIcon,
} from 'components/Icon';

import AddExistingAccount from 'features/auth/components/AddExistingAccount';
import ManageAccounts from 'features/user/components/ManageAccounts';
import MenuItem from 'components/Navigation/MenuItem';
import { Modal } from 'components/OverLay';
import { UserItem } from 'features/user/components';
import useGoToProfile from 'features/user/hooks/useGoToProfile';
import { useLogout } from 'features/auth/hooks/useLogout';
import { useModal } from 'hooks/useModal';
import { useSelector } from 'react-redux';
import useSwitchAccount from 'features/auth/hooks/useSwitchAccount';

const AccountMenu = () => {
	return (
		<>
			<div className="mb-2">
				<AccountList />
			</div>
			<div className="border-t pt-2 dark:border-dark-700">
				<AddExistingAccountTrigger />
				<ManageAccountsTrigger />
				<LogoutTrigger />
			</div>
		</>
	);
};

const AccountList = () => {
	const user = useSelector((state) => {
		return {
			_id: state.auth.user?._id,
			name: state.auth.user?.name,
			avatar: state.auth.user?.avatar,
			username: state.auth.user?.username,
		};
	});
	const switchAccount = useSwitchAccount();
	const goToProfile = useGoToProfile();

	const linkedAccounts = useSelector(
		(state) => state.auth.user?.linkedAccounts,
	);
	const renderAccounts = () => {
		if (!user || !linkedAccounts) return null;
		return linkedAccounts.map((account) => (
			<UserItem
				key={account._id}
				user={account}
				onClick={() => {
					switchAccount.mutate(account._id);
				}}
				end={
					account?.numNotifications > 0 && (
						<BellCount count={account.numNotifications} />
					)
				}
			/>
		));
	};
	return (
		<>
			<UserItem
				user={user}
				onClick={() => {
					goToProfile(user._id);
				}}
				end={
					<CircleCheckIcon className="ml-auto h-6 w-6 text-primary-700 dark:text-primary-500" />
				}
			/>
			{renderAccounts()}
		</>
	);
};

const BellCount = ({ count }) => {
	return (
		<div className="ml-auto">
			<div className="relative flex h-10 items-center justify-center">
				<BellIcon className="h-6 w-6 text-primary-700 dark:text-primary-500" />
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pb-1">
					<span className="text-sm font-bold text-dark-50">
						{count}
					</span>
				</div>
			</div>
		</div>
	);
};

const AddExistingAccountTrigger = () => {
	const { isOpen, close, open } = useModal();
	return (
		<>
			<MenuItem
				onClick={open}
				icon={<UserPlusIcon />}
				title="Add an existing account"
			></MenuItem>
			<Modal open={isOpen} onClose={close}>
				<Modal.Panel responsive>
					<Modal.Header />

					<AddExistingAccount onSuccess={close} />
				</Modal.Panel>
			</Modal>
		</>
	);
};

const ManageAccountsTrigger = () => {
	const { isOpen, close, open } = useModal();
	return (
		<>
			<MenuItem
				onClick={open}
				icon={<ListCheckIcon />}
				title="Manage linked accounts"
			></MenuItem>
			<Modal open={isOpen} onClose={close}>
				<Modal.Panel responsive>
					<Modal.Header>Manage linked accounts</Modal.Header>
					<div className="pb-4">
						<ManageAccounts />
					</div>
				</Modal.Panel>
			</Modal>
		</>
	);
};

const LogoutTrigger = () => {
	const logout = useLogout();
	return (
		<MenuItem
			icon={<LogoutIcon />}
			onClick={logout.mutate}
			title="Log out"
		></MenuItem>
	);
};
export default AccountMenu;

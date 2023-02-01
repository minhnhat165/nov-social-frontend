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
import Modal from 'components/OverLay/Modal';
import UserItem from 'features/user/components/UserItem';
import useGoToProfile from 'features/user/hooks/useGoToProfile';
import { useLogout } from 'features/auth/hooks/useLogout';
import { useSelector } from 'react-redux';
import useSwitchAccount from 'features/auth/hooks/useSwitchAccount';

const AccountActionMenu = () => {
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
			email: state.auth.user?.email,
		};
	});
	const switchAccount = useSwitchAccount();
	const goToProfile = useGoToProfile();

	const linkedAccounts = useSelector(
		(state) => state.auth.user?.linkedAccounts
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
					account?.notificationsCount > 0 && (
						<BellCount count={account.notificationsCount} />
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
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-1">
					<span className="text-sm font-bold text-dark-50">
						{count}
					</span>
				</div>
			</div>
		</div>
	);
};

const AddExistingAccountTrigger = () => {
	return (
		<Modal.Control>
			<Modal.Trigger>
				<MenuItem
					icon={<UserPlusIcon />}
					title="Add an existing account"
				></MenuItem>
			</Modal.Trigger>
			<Modal>
				<Modal.Close />
				<Modal.Props>
					{({ onClose }) => (
						<Modal.Panel>
							<Modal.Panel.Header />
							<AddExistingAccount onSuccess={onClose} />
						</Modal.Panel>
					)}
				</Modal.Props>
			</Modal>
		</Modal.Control>
	);
};

const ManageAccountsTrigger = () => {
	return (
		<Modal.Control>
			<Modal.Trigger>
				<MenuItem
					icon={<ListCheckIcon />}
					title="Manage linked accounts"
				/>
			</Modal.Trigger>
			<Modal>
				<Modal.Close />
				<Modal.Panel>
					<Modal.Panel.Header>
						Manage linked accounts
					</Modal.Panel.Header>
					<div className="pb-4">
						<ManageAccounts />
					</div>
				</Modal.Panel>
			</Modal>
		</Modal.Control>
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
export default AccountActionMenu;

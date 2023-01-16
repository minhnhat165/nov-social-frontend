import Avatar from 'components/Avatar';
import {
	BellIcon,
	CircleCheckIcon,
	ListCheckIcon,
	LogoutIcon,
	UserPlusIcon,
} from 'components/Icon';
import MenuItem from 'components/MenuItem';
import ModalTrigger from 'components/ModalTrigger';
import Text from 'components/Text';
import AddExistingAccount from 'features/auth/components/AddExistingAccount';
import { useLogout } from 'features/auth/hooks/useLogout';
import useSwitchAccount from 'features/auth/hooks/useSwitchAccount';
import ManageAccounts from 'features/user/components/ManageAccounts';

const AccountActionMenu = ({ user }) => {
	const logout = useLogout();
	const switchAccount = useSwitchAccount();
	return (
		<>
			<div className="mb-2">
				<Account user={user} isActive />
				{user?.linkedAccounts?.length > 0 &&
					user.linkedAccounts.map((account) => (
						<Account
							key={account._id}
							user={account}
							onClick={() => {
								switchAccount.mutate(account._id);
							}}
						/>
					))}
			</div>
			<div className="border-t pt-2 dark:border-dark-700">
				<ModalTrigger
					trigger={
						<MenuItem
							icon={<UserPlusIcon className="h-7 w-10" />}
							title="Add an existing account"
						></MenuItem>
					}
				>
					{(setShow) => (
						<AddExistingAccount onSuccess={() => setShow(false)} />
					)}
				</ModalTrigger>

				<ModalTrigger
					trigger={
						<MenuItem
							icon={<ListCheckIcon className="h-7 w-10" />}
							title="Manage linked accounts"
						></MenuItem>
					}
				>
					{(setShow) => <ManageAccounts />}
				</ModalTrigger>

				<MenuItem
					icon={<LogoutIcon className="h-7 w-10" />}
					onClick={logout.mutate}
					title="Log out"
				></MenuItem>
			</div>
		</>
	);
};

const Account = ({ user, onClick, isActive }) => {
	return (
		<div
			onClick={onClick}
			className="flex cursor-pointer items-center rounded-xl p-2 hover:bg-slate-200 dark:hover:bg-dark-700"
		>
			<Avatar
				src={user?.avatar}
				alt={user?.name}
				className="mr-2 shrink-0 cursor-pointer"
			/>
			<div className="mr-2 flex flex-col overflow-hidden">
				<Text className="truncate font-bold">{user?.name}</Text>
				<Text
					title={user.email}
					className="truncate text-sm opacity-70"
				>
					{user.email}
				</Text>
			</div>
			{isActive ? (
				<CircleCheckIcon className="ml-auto text-lg text-primary-700 dark:text-primary-500" />
			) : (
				<>
					{user?.notificationsCount > 0 && (
						<div className="ml-auto">
							<div className="relative flex h-10 items-center justify-center">
								<BellIcon className="text-2xl text-primary-700 dark:text-primary-500" />
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pb-1">
									<span className="text-sm font-bold text-dark-50">
										{user?.notificationsCount}
									</span>
								</div>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AccountActionMenu;

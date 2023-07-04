import {
	ArrowLeftIcon,
	BellIcon,
	CircleCheckIcon,
	XCircleIcon,
} from 'components/Icon';

import AddExistingAccount from 'features/auth/components/AddExistingAccount';
import { Button } from 'components/Action';
import { Modal } from 'components/OverLay';
import { Text } from 'components/Typography';
import { UserItem } from './UserItem';
import clsx from 'clsx';
import useGoToProfile from '../hooks/useGoToProfile';
import useRemoveAccount from 'features/auth/hooks/useRemoveAccount';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useSwitchAccount from 'features/auth/hooks/useSwitchAccount';

const ManageAccounts = () => {
	const { linkedAccounts, ...user } = useSelector((state) => {
		return {
			_id: state.auth.user._id,
			name: state.auth.user.name,
			avatar: state.auth.user.avatar,
			email: state.auth.user.email,
			linkedAccounts: state.auth.user.linkedAccounts,
		};
	});
	const removeAccount = useRemoveAccount();
	const goToProfile = useGoToProfile();
	const switchAccount = useSwitchAccount();

	return (
		<div className="w-[500px] max-w-full px-4">
			<UserItem
				user={user}
				size="xl"
				end={
					<CircleCheckIcon className="ml-auto text-lg text-primary-700 dark:text-primary-500" />
				}
				onClick={() => goToProfile(user._id)}
			/>
			{linkedAccounts?.length > 0 &&
				linkedAccounts.map((account) => (
					<AccountItem
						key={account._id}
						user={account}
						onClick={() => switchAccount.mutate(account._id)}
						onRemove={(id) => {
							removeAccount.mutate(id);
						}}
						size="xl"
					/>
				))}

			<div className="-ml-4 mt-4">
				<Modal.Root>
					<Modal.Trigger>
						<Button variant="text" size="md">
							Add an existing Account
						</Button>
					</Modal.Trigger>
					<Modal closeIcon={<ArrowLeftIcon />}>
						<Modal.Panel>
							<Modal.Header />
							<Modal.Props>
								{({ onClose }) => (
									<AddExistingAccount onSuccess={onClose} />
								)}
							</Modal.Props>
						</Modal.Panel>
					</Modal>
				</Modal.Root>
			</div>
			<div className="mt-2 p-2">
				<Text as="p" className="text-[15px]">
					If you have more than one Nov account, you can add them and
					easily switch between. You can add up to 5 accounts.
				</Text>
			</div>
		</div>
	);
};

const AccountItem = ({ user, onRemove, onClick, size }) => {
	const [showX, setShowX] = useState(false);

	return (
		<div
			onMouseEnter={() => setShowX(true)}
			onMouseLeave={() => setShowX(false)}
		>
			<UserItem
				user={user}
				size={size}
				onClick={onClick}
				end={
					<div
						className={clsx(
							'ml-auto flex items-center transition-all duration-500 ease-in-out',
							showX ? 'mr-0' : '-mr-9',
						)}
					>
						{user?.numNotifications > 0 && (
							<div className="relative flex h-10 items-center justify-center">
								<BellIcon className="h-7 w-7 text-primary-700 dark:text-primary-500" />
								<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pb-1">
									<span className="text-sm font-bold text-dark-50">
										{user?.numNotifications}
									</span>
								</div>
							</div>
						)}
						<div className="ml-4">
							<XCircleIcon
								onClick={(e) => {
									e.stopPropagation();
									onRemove(user._id);
								}}
								className="h-6 w-6 text-slate-600 hover:text-slate-900 active:scale-95 active:text-slate-700 dark:text-dark-300 dark:hover:text-dark-100 dark:active:text-dark-200"
							/>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default ManageAccounts;

import Button from 'components/Button';
import ModalTrigger from 'components/ModalTrigger';
import Text from 'components/Text';
import AddExistingAccount from 'features/auth/components/AddExistingAccount';
import useRemoveAccount from 'features/auth/hooks/useRemoveAccount';
import { useSelector } from 'react-redux';
import AccountItems from './AccountItems';

const ManageAccounts = () => {
	const user = useSelector((state) => state.auth.user);
	const removeAccount = useRemoveAccount();
	return (
		<div className="w-[500px] max-w-full">
			<h2 className="mb-4 text-xl font-medium leading-6 text-gray-900 dark:text-dark-100">
				Manage Linked Account
			</h2>
			<AccountItems user={user} isActive size="xl" />
			{user.linkedAccounts?.length > 0 &&
				user.linkedAccounts.map((account) => (
					<AccountItems
						key={account._id}
						user={account}
						onRemove={(id) => {
							removeAccount.mutate(id);
						}}
						size="xl"
					/>
				))}

			<div className="mt-4 -ml-4">
				<ModalTrigger
					trigger={
						<Button variant="text" size="md">
							Add an existing Account
						</Button>
					}
				>
					{(setShow) => (
						<AddExistingAccount onSuccess={() => setShow(false)} />
					)}
				</ModalTrigger>
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

export default ManageAccounts;

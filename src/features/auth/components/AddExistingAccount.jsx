import { addAccount, socialAddAccount } from 'api/authApi';

import EnterAccount from './EnterAccount';
import { useAddAccount } from '../hooks/useAddAccount';

const AddExistingAccount = ({ onSuccess }) => {
	const { mutate, isLoading } = useAddAccount({ onSuccess });

	return (
		<div className="h-full w-screen px-2 pb-4 sm:w-[500px] sm:px-16">
			<EnterAccount
				title={'Add Existing Account'}
				onSubmit={(data) => mutate(addAccount(data))}
				loading={isLoading}
				onSocialLogin={(data) => mutate(socialAddAccount(data))}
			/>
		</div>
	);
};

export default AddExistingAccount;

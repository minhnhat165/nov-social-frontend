import { addAccount, socialAddAccount } from 'api/authApi';

import EnterAccount from './EnterAccount';
import { useAddAccount } from '../hooks/useAddAccount';

const AddExistingAccount = ({ onSuccess }) => {
	const { mutate, isLoading } = useAddAccount({ onSuccess });

	return (
		<div className="w-[500px] px-16 pb-4">
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

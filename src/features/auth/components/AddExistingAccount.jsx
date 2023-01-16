import { useAddAccount } from '../hooks/useAddAccount';
import { useSocialAddAccount } from '../hooks/useSocialAddAccount';
import EnterAccount from './EnterAccount';

const AddExistingAccount = ({ onSuccess }) => {
	const addAccount = useAddAccount({ onSuccess });
	const socialAddAccount = useSocialAddAccount({ onSuccess });
	return (
		<div className=" h-[80vh] w-[500px] px-16">
			<EnterAccount
				title={'Add Existing Account'}
				onSubmit={addAccount.mutate}
				loading={addAccount.isLoading}
				onSocialLogin={socialAddAccount.mutate}
			/>
		</div>
	);
};

export default AddExistingAccount;

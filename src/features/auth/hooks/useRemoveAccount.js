import { removeAccount } from 'api/authApi';
import { setLinkedAccounts } from 'store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';

const useRemoveAccount = () => {
	const dispatch = useDispatch();

	return useMutation(removeAccount, {
		onSuccess: ({ linkedAccounts }) => {
			dispatch(setLinkedAccounts(linkedAccounts));
			toast.success('Account removed successfully');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

export default useRemoveAccount;

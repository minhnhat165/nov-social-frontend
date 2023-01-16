import { toast } from 'react-hot-toast';
const { removeAccount } = require('api/authApi');
const { useMutation } = require('react-query');
const { useDispatch } = require('react-redux');
const { updateUser } = require('store/slices/authSlice');

const useRemoveAccount = () => {
	const dispatch = useDispatch();

	return useMutation(removeAccount, {
		onSuccess: ({ user }) => {
			dispatch(updateUser(user));
			toast.success('Account removed successfully');
		},
		onError: (error) => {
			console.log(error);
			toast.error(error.message);
		},
	});
};

export default useRemoveAccount;

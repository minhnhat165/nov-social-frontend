import { setLinkedAccounts } from 'store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const { useMutation } = require('react-query');

export const useAddAccount = ({ onSuccess }) => {
	const dispatch = useDispatch();

	return useMutation((api) => api, {
		onSuccess: ({ linkedAccounts }) => {
			dispatch(setLinkedAccounts(linkedAccounts));
			toast.success('Account added successfully');
			onSuccess();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/slices/authSlice';

const { addAccount } = require('api/authApi');
const { useMutation } = require('react-query');

export const useAddAccount = ({ onSuccess }) => {
	const dispatch = useDispatch();

	return useMutation(addAccount, {
		onSuccess: (data) => {
			dispatch(updateUser(data.user));
			toast.success('Account added successfully');
			onSuccess();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

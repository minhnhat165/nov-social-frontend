import { toast } from 'react-hot-toast';
import { updateUser } from 'store/slices/authSlice';
const { socialAddAccount } = require('api/authApi');
const { useMutation } = require('react-query');
const { useDispatch } = require('react-redux');

export const useSocialAddAccount = ({ onSuccess }) => {
	const dispatch = useDispatch();
	return useMutation(socialAddAccount, {
		onSuccess: (data) => {
			dispatch(updateUser(data.user));
			onSuccess();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

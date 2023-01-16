import { login } from 'api/authApi';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as loginAction } from 'store/slices/authSlice';

export const useLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return useMutation(login, {
		onSuccess: (data) => {
			dispatch(loginAction({ accessToken: data.access_token }));
			navigate('/');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

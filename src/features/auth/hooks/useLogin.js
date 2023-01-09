import { login } from 'api/authApi';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setAccessToken } from 'store/slices/authSlice';

export const useLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return useMutation(login, {
		onSuccess: (data) => {
			dispatch(setAccessToken(data.access_token));
			navigate('/');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

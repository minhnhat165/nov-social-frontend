import { login } from 'api/authApi';
import { login as loginAction } from 'store/slices/authSlice';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const useLogin = (remoteSite) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return useMutation(login, {
		onSuccess: (data) => {
			if (remoteSite) {
				window.location.href =
					new URL('remote/auth/callback', remoteSite.url).toString() +
					'?access_token=' +
					data.access_token;

				return;
			}
			dispatch(loginAction({ accessToken: data.access_token }));
			navigate('/');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

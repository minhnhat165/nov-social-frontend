import { login } from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const { socialLogin } = require('api/authApi');
const { useMutation } = require('react-query');
const { useDispatch } = require('react-redux');

export const useSocialLogin = (remoteSite) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return useMutation(socialLogin, {
		onSuccess: (data) => {
			if (remoteSite) {
				window.location.href =
					new URL('remote/auth/callback', remoteSite.url).toString() +
					'?access_token=' +
					data.access_token;

				return;
			}

			dispatch(login({ accessToken: data.access_token }));
			navigate('/');
		},
	});
};

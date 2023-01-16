import { useNavigate } from 'react-router-dom';
import { login } from 'store/slices/authSlice';
const { socialLogin } = require('api/authApi');
const { useMutation } = require('react-query');
const { useDispatch } = require('react-redux');

export const useSocialLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return useMutation(socialLogin, {
		onSuccess: (data) => {
			dispatch(login({ accessToken: data.access_token }));
			navigate('/');
		},
	});
};

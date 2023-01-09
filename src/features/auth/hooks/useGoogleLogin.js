import { login } from 'store/slices/authSlice';
const { googleLogin } = require('api/authApi');
const { useMutation } = require('react-query');
const { useDispatch } = require('react-redux');

export const useGoogleLogin = () => {
	const dispatch = useDispatch();
	return useMutation(googleLogin, {
		onSuccess: (data) => {
			dispatch(login({ accessToken: data.access_token }));
		},
	});
};

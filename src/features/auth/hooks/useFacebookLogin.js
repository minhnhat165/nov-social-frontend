import { facebookLogin } from 'api/authApi';
import { login } from 'store/slices/authSlice';

const { useMutation } = require('react-query');
const { useDispatch } = require('react-redux');

export const useFacebookLogin = () => {
	const dispatch = useDispatch();
	return useMutation(facebookLogin, {
		onSuccess: (data) => {
			console.log(data);
			// dispatch(login({ accessToken: data.access_token }));
		},
	});
};

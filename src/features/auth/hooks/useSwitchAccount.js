const { switchAccount } = require('api/authApi');
const { useMutation } = require('react-query');
const { useDispatch } = require('react-redux');
const { setAccessToken } = require('store/slices/authSlice');

const useSwitchAccount = () => {
	const dispatch = useDispatch();
	return useMutation(switchAccount, {
		onSuccess: (data) => {
			dispatch(setAccessToken(data.access_token));
			window.location.reload();
		},
	});
};

export default useSwitchAccount;

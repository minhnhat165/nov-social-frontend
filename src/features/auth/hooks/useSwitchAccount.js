const { switchAccount } = require('api/authApi');
const { useMutation, useQueryClient } = require('react-query');
const { useDispatch } = require('react-redux');
const { setAccessToken } = require('store/slices/authSlice');

const useSwitchAccount = () => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	return useMutation(switchAccount, {
		onSuccess: (data) => {
			dispatch(setAccessToken(data.access_token));
			queryClient.removeQueries();
			window.location.reload();
		},
	});
};

export default useSwitchAccount;

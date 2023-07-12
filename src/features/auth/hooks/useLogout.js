import { useMutation, useQueryClient } from 'react-query';

import { logout } from 'api/authApi';
import { logout as logoutAction } from 'store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation(logout, {
		onSuccess: () => {
			dispatch(logoutAction());
			queryClient.removeQueries();
			navigate('/auth/login');
		},
		onError: (error) => console.log(error),
	});
};

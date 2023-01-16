import { logout } from 'api/authApi';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout as logoutAction } from 'store/slices/authSlice';

export const useLogout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return useMutation(logout, {
		onSuccess: () => {
			dispatch(logoutAction());
			navigate('/auth/login');
		},
		onError: (error) => console.log(error),
	});
};

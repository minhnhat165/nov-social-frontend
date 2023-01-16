import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../api/userApi';
import { setUser } from '../redux/slices/authSlice';
import { useAsyncFn } from '../hooks/useAsync';

const LoggedIn = () => {
	const isLogin = useSelector((state) => state.auth.isLogin);
	const dispatch = useDispatch();
	const getUserInfoFn = useAsyncFn(getUser);
	useEffect(() => {
		let mounted = true;
		if (isLogin) {
			getUserInfoFn.execute().then((data) => {
				if (!mounted) return;
				dispatch(setUser(data.data));
			});
		}
		return () => {
			mounted = false;
		};
	}, [dispatch, isLogin]);

	return <></>;
};

export default LoggedIn;

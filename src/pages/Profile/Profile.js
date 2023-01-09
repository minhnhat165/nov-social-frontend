import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { getUserInfo } from '../../api/userApi';
import { useAsyncFn } from '../../hooks/useAsync';
import { setUser } from '../../redux/slices/profileSlice';
import Header from './Components/Header';

const Profile = () => {
	const currentUserId = useSelector((state) => state.auth.user._id);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.profile.user);
	const { id } = useParams();
	const getUserInfoFn = useAsyncFn(getUserInfo);

	useEffect(() => {
		let mounted = true;
		if (!id) {
			navigate(`/profile/${currentUserId}`);
			return;
		}
		getUserInfoFn.execute(id).then((user) => {
			if (!mounted) return;
			dispatch(setUser(user));
			document.title = user?.name + ' | NovSocial';
		});
		return () => {
			dispatch(setUser(null));
			mounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	const isUser = useMemo(() => {
		return id === currentUserId;
	}, [id, currentUserId]);
	return (
		<div className="h-full w-full">
			{user && (
				<div className="mx-auto h-full w-[1140px] max-w-full py-2">
					<Header isUser={isUser} />
					<Outlet />
				</div>
			)}
		</div>
	);
};

export default Profile;

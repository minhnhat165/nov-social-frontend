import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'components/Head';
import ProfilePanel from './ProfilePanel';
import StickyBox from 'react-sticky-box';
import { getProfile } from 'api/userApi';
import { setProfile } from 'store/slices/profileSlice';
import { useQuery } from 'react-query';

const Layout = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.auth.user?._id);
	const queryId = id ? id : userId;
	const isOwner = userId === queryId;
	const { isSuccess } = useQuery(
		['profile', queryId],
		() => (isOwner ? getProfile() : getProfile(queryId)),
		{
			onSuccess: ({ profile }) => {
				dispatch(setProfile(profile));
			},
		},
	);
	const profile = useSelector((state) => state.profile.data);
	return (
		<>
			{isSuccess && (
				<>
					<Head title={profile.name} />
					<div className="flex h-screen w-full items-start overflow-y-scroll">
						<StickyBox offsetTop={0}>
							<aside className="h-screen pt-20 pb-2">
								<div className="h-full w-full px-2">
									<ProfilePanel profile={profile} />
								</div>
							</aside>
						</StickyBox>
						<div className="flex-1">
							<Outlet
								context={{
									isOwner,
								}}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Layout;

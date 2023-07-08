import { Avatar, Rank } from 'components/DataDisplay';
import { FollowButton, UserProvider, useUser } from 'features/user/context';
import { useQuery, useQueryClient } from 'react-query';

import Layer from 'components/Layout/Layer';
import { LazyTippy } from 'components/OverLay/Popover/LazyTippy';
import { Link } from 'react-router-dom';
import { Text } from 'components/Typography';
import clsx from 'clsx';
import { getUserPreview } from 'api/userApi';
import { routePaths } from 'routes/routeConfig';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ProfilePreview = ({ user: initial, onUpdateUser, className }) => {
	const currentUserId = useSelector((state) => state.auth.user?._id);
	const isCurrentUser = currentUserId === initial._id;
	const cacheKey = ['profile-preview', initial._id];
	const queryClient = useQueryClient();
	const user = queryClient.getQueryData(cacheKey)?.user;
	const { isLoading } = useQuery(
		cacheKey,
		() => getUserPreview({ id: initial._id }),
		{
			onSuccess: (data) => {
				queryClient.setQueryData(cacheKey, data);
				onUpdateUser && onUpdateUser(data.user);
			},
			enabled: !user,
		},
	);

	useEffect(() => {
		if (user) {
			onUpdateUser && onUpdateUser(user);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const handleFollow = (followed) => {
		queryClient.setQueryData(cacheKey, (prev) => {
			return {
				...prev,
				user: {
					...prev.user,
					followed,
					followersCount:
						prev.user.followersCount + (followed ? 1 : -1),
				},
			};
		});
	};

	return (
		<Layer
			className={clsx(
				'min-h-[184px] w-[calc(100vw_-_16px)] cursor-default !bg-inherit p-4 opacity-0 shadow  transition-all sm:w-80',
				isLoading ? 'opacity-0' : 'opacity-100',
				className,
			)}
		>
			{!isLoading && (
				<>
					<div className="flex justify-between">
						<div className="relative">
							<Link to={`${routePaths.PROFILE}/${user?._id}`}>
								<Avatar src={user?.avatar} size="2xl" />
							</Link>
							<div className="absolute bottom-0 right-0 translate-x-2 translate-y-1 rounded-lg bg-white dark:bg-dark-bold">
								<Rank rank={user?.rank?.number} size={6} />
							</div>
						</div>
						{!isCurrentUser && (
							<FollowButton size="sm" onChange={handleFollow} />
						)}
					</div>
					<div>
						<Text
							as={Link}
							to={`${routePaths.PROFILE}/${user?._id}`}
							className="mt-3 block text-lg font-bold leading-5"
						>
							{user?.name}
						</Text>
						<Text className="text-sm" level={4}>
							@{user?.username}
						</Text>
					</div>
					<div className="mt-3 flex gap-3">
						<Text className="" level={4}>
							<Text bold level={1}>
								{user?.followersCount || 0}
							</Text>{' '}
							followers
						</Text>
						<Text level={4}>
							<Text bold level={1}>
								{user?.followingCount || 0}
							</Text>{' '}
							following
						</Text>
						<Text level={4}>
							<Text bold level={1}>
								{user?.postsCount || 0}
							</Text>{' '}
							posts
						</Text>
					</div>
				</>
			)}
		</Layer>
	);
};
export const ProfilePreviewWrapper = ({ children }) => {
	const { user, updateUser } = useUser();
	return (
		<LazyTippy
			placement="bottom"
			appendTo={document.body}
			offset={[0, 6]}
			interactive
			delay={500}
			render={(attrs) => (
				<Layer level={0} {...attrs} className="tooltip" shadow>
					<ProfilePreview user={user} onUpdateUser={updateUser} />
					<div className="arrow" data-popper-arrow />
				</Layer>
			)}
		>
			<Link
				to={`${routePaths.PROFILE}/${user._id}`}
				className="cursor-pointer hover:opacity-80"
			>
				{children}
			</Link>
		</LazyTippy>
	);
};

export const ProfilePreviewTooltip = ({ children, user }) => {
	return (
		<UserProvider user={user}>
			{({ user, updateUser }) => (
				<LazyTippy
					placement="bottom"
					appendTo={document.body}
					offset={[0, 6]}
					interactive
					delay={500}
					render={(attrs) => (
						<Layer level={0} {...attrs} className="tooltip" shadow>
							<ProfilePreview
								user={user}
								onUpdateUser={updateUser}
							/>
							<div className="arrow" data-popper-arrow />
						</Layer>
					)}
				>
					<Link
						to={`${routePaths.PROFILE}/${user._id}`}
						className="cursor-pointer hover:opacity-80"
					>
						{children}
					</Link>
				</LazyTippy>
			)}
		</UserProvider>
	);
};

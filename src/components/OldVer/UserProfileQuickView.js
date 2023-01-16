import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFollowers, getFollowings } from '../api/userApi';
import { useAsyncFn } from '../hooks/useAsync';
import Avatar from './Avatar';
import Button from './ButtonOld/ButtonV2';
import Img from './Img';
import ShowModalUserList from './ShowModalUserList';

const UserProfileQuickView = () => {
	const user = useSelector((state) => state.auth.user);
	const getFollowersFn = useAsyncFn(getFollowers);
	const getFollowingsFn = useAsyncFn(getFollowings);
	const [followers, setFollowers] = useState([]);
	const [followings, setFollowings] = useState([]);
	const handelShowFollowers = () => {
		if (followers.length > 0) return;
		getFollowersFn.execute(user._id).then((followers) => {
			setFollowers(followers);
		});
	};
	const handelShowFollowings = () => {
		if (followings.length > 0) return;
		getFollowingsFn.execute(user._id).then((followings) => {
			setFollowings(followings);
		});
	};

	return (
		<div className=" flex w-80 flex-col overflow-hidden rounded-xl dark:bg-dark-regular">
			<div className="relative flex h-24 w-full">
				<Img src={user?.cover} className="object-cover" />
				<div className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-[#1d9bf0]">
					<Avatar url={user?.avatar} size={'h-16 w-16'} />
				</div>
			</div>
			<div className="mt-9 w-full flex-col items-center justify-center text-center">
				<span className="text-center font-bold dark:text-dark-text-bold">
					{user.name}
				</span>
			</div>
			<div className="mt-2 flex justify-evenly border-y pt-2 pb-4 dark:border-dark-border/20">
				<div className="flex flex-col items-center">
					<span className="text-lg font-bold dark:text-dark-text-bold">
						{user?.following?.length}
					</span>{' '}
					<ShowModalUserList
						userId={user._id}
						list={followings}
						title="Followings"
						onClick={() => handelShowFollowings()}
					>
						<span className="cursor-pointer text-sm leading-3 hover:underline dark:text-dark-text-regular dark:hover:text-dark-text-bold">
							Following
						</span>
					</ShowModalUserList>
				</div>
				<div className="w-[1px] dark:bg-dark-border/20"></div>
				<div className="flex flex-col items-center">
					<span className="text-lg font-bold dark:text-dark-text-bold">
						{user?.followers?.length}
					</span>{' '}
					<ShowModalUserList
						userId={user._id}
						onClick={() => handelShowFollowers()}
						title="Followers"
						list={followers}
					>
						<span className="cursor-pointer text-sm leading-3 hover:underline dark:text-dark-text-regular dark:hover:text-dark-text-bold">
							Followers
						</span>
					</ShowModalUserList>
				</div>
			</div>

			<Link to={`/profile/${user._id}`} className="shrink-0 p-2">
				<Button
					fullWidth
					color="dark:hover:bg-dark-very-light text-primary"
				>
					Show more
				</Button>
			</Link>
		</div>
	);
};

export default UserProfileQuickView;

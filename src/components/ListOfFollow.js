import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFollowings } from '../api/userApi';

import { useAsync } from '../hooks/useAsync';
import AccountQuickView from './AccountQuickView';
import FadeInZoom from './Animate/FadeInZoom';
import Box from './Box';
import OnlineStatus from './OnlineStatus';
import AccountQuickViewLoading from './SkeletonLoading/AccountQuickViewLoading';

const ListOfFollow = () => {
	const user = useSelector((state) => state.auth.user);
	const socket = useSelector((state) => state.socket.socket);
	const { value: followings } = useAsync(
		() => getFollowings(user._id),
		[user.following]
	);

	const [followingsOnline, setFollowingsOnline] = useState([]);

	useEffect(() => {
		if (!socket) return;
		socket.emit('checkUserOnline', {
			following: user.following,
			followers: user.followers,
			_id: user._id,
		});
		socket.on('checkUserOnlineToMe', (listOfFollowingOnline) => {
			setFollowingsOnline(listOfFollowingOnline);
		});
		socket.on('checkUserOnlineToClient', (userId) => {
			setFollowingsOnline((prev) => {
				if (!prev.includes(userId)) prev.push(userId);
				return [...prev];
			});
		});
		socket.on('CheckUserOffline', (userId) => {
			setFollowingsOnline((prev) => prev.map((id) => id !== userId));
		});
		return () => {
			if (!socket) return;
			socket.off('checkUserOnlineToClient');
			socket.off('checkUserOnlineToClient');
		};
	}, [socket, user.following, user.followers, user._id]);

	return (
		<Box
			header={
				<div className="flex items-center justify-between bg-transparent pb-2 text-lg">
					<span>
						List of <span className="text-primary">follow</span>
					</span>
				</div>
			}
			className="h-full w-full"
		>
			{followings && (
				<div className="w-80">
					<AnimatePresence initial={false}>
						{followings.map((user) => (
							<FadeInZoom key={user._id}>
								<div className="group relative flex w-full justify-center gap-2 p-2">
									<AccountQuickView
										accountPreviewAble
										avatarClickAble
										nameClickAble
										key={user._id}
										user={user}
										subName={
											<OnlineStatus
												active={followingsOnline.includes(user._id)}
											/>
										}
									/>
								</div>
							</FadeInZoom>
						))}
					</AnimatePresence>
				</div>
			)}
			{!followings && (
				<div className="p-1">
					<AccountQuickViewLoading />
					<AccountQuickViewLoading />
				</div>
			)}
		</Box>
	);
};

export default ListOfFollow;

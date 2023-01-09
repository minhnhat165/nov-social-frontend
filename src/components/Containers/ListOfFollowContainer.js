import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFollowings } from '../../api/userApi';
import { useAsync } from '../../hooks/useAsync';
import ListOfFollow from '../ListOfFollow';

const ListOfFollowContainer = () => {
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
		<ListOfFollow followings={followings} followingsOnline={followingsOnline} />
	);
};

export default ListOfFollowContainer;

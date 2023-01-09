import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFollow } from '../redux/slices/authSlice';

const Follow = ({ followId, Button }) => {
	const dispatch = useDispatch();
	const { following } = useSelector((state) => state.auth.user);
	const [isFollowed, setIsFollowed] = useState(following.includes(followId));

	useEffect(() => {
		setIsFollowed(following.includes(followId));
	}, [followId, following]);

	const handleToggleFollow = () => {
		dispatch(toggleFollow(followId));
	};
	return (
		<>
			<Button active={isFollowed} onClick={handleToggleFollow} />
		</>
	);
};

export default Follow;

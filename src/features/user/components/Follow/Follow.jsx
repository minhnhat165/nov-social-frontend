import { followUser, unFollowUser } from 'api/userApi';
import { useDispatch, useSelector } from 'react-redux';

import { Children } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import { cloneElement } from 'react';
import { updateUser } from 'store/slices/authSlice';
import { useMutation } from 'react-query';

const Follow = ({ children, followId }) => {
	const followingId = useSelector((state) => state.auth.user.following);
	const isFollowing = followingId.includes(followId);
	const dispatch = useDispatch();
	const { mutate, isLoading } = useMutation(
		(api) => {
			return api(followId);
		},
		{
			onSuccess: ({ data }) => {
				let newFollowing = [];
				if (data.message.includes('UnFollow')) {
					newFollowing = followingId.filter((id) => id !== followId);
				} else {
					newFollowing = [...followingId, followId];
				}

				dispatch(updateUser({ following: newFollowing }));
			},
			onError: (error) => {
				console.log(error);
			},
		},
	);

	const handleFollow = () => {
		const api = isFollowing ? unFollowUser : followUser;
		mutate(api);
	};

	return children && typeof children === 'function'
		? children({
				isFollowing,
				isLoading,
				onClick: handleFollow,
		  })
		: Children.map(children, (child) => {
				return cloneElement(child, {
					onClick: handleFollow,
				});
		  });
};

export default Follow;

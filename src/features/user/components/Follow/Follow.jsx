import { Children, cloneElement } from 'react';

import PropTypes from 'prop-types';
import { useFollowUser } from 'features/user/hooks/useFollowUser';

export const Follow = ({ children, followId, isFollowed, onChange }) => {
	const isFollowing = isFollowed;
	const { isLoading, mutate } = useFollowUser(isFollowed, {
		onSuccess: () => {
			onChange && onChange(!isFollowing);
		},
	});
	const handleFollow = () => {
		mutate(followId);
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

Follow.propTypes = {
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
	followId: PropTypes.string.isRequired,
};

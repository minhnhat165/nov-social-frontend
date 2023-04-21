import { Children, cloneElement } from 'react';

import { Button } from 'components/Action';
import PropTypes from 'prop-types';
import { useFollowUser } from 'features/user/hooks/useFollowUser';

export const Follow = ({ children, followId, followed, onChange }) => {
	const isFollowing = followed;
	const { isLoading, mutate } = useFollowUser(followed, {
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
					isFollowing,
					isLoading,
					onClick: handleFollow,
				});
		  });
};

Follow.Button = ({ isFollowing, isLoading, onClick, ...props }) => {
	return (
		<Button
			rounded
			color={isFollowing ? 'primary' : 'secondary'}
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			loading={isLoading}
			{...props}
		>
			{isFollowing ? 'Following' : 'Follow'}
		</Button>
	);
};

Follow.propTypes = {
	children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
	followId: PropTypes.string,
};

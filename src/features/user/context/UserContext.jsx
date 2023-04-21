import { createContext, useContext, useState } from 'react';

import { Button } from 'components/Action';
import { useFollowUser } from '../hooks/useFollowUser';

const UserContext = createContext({
	user: null,
	updateUser: () => {},
});

const useUser = () => useContext(UserContext);

const UserProvider = ({ user: initialUser, children }) => {
	const [user, setUser] = useState(initialUser);
	const updateUser = (newData) => {
		setUser({ ...user, ...newData });
	};

	return (
		<UserContext.Provider
			value={{
				user,
				updateUser,
			}}
		>
			{typeof children === 'function'
				? children({ user, updateUser })
				: children}
		</UserContext.Provider>
	);
};

const FollowButton = ({ onChange, ...props }) => {
	const { user, updateUser } = useUser();
	const followed = user.followed;
	const { mutate, isLoading } = useFollowUser(user.followed, {
		onSuccess: () => {
			const followed = !user.followed;
			updateUser({
				followed,
				followersCount: user?.followersCount + (followed ? 1 : -1),
			});

			onChange && onChange(followed);
		},
	});

	return (
		<Button
			rounded
			color={followed ? 'primary' : 'secondary'}
			onClick={(e) => {
				e.stopPropagation();
				mutate(user._id);
			}}
			loading={isLoading}
			{...props}
		>
			{followed ? 'Following' : 'Follow'}
		</Button>
	);
};

export { UserContext, UserProvider, useUser, FollowButton };

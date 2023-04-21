import { followUser, unFollowUser } from 'api/userApi';

import { useMutation } from 'react-query';

export const useFollowUser = (
	followed,
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	const queryFn = followed ? unFollowUser : followUser;
	return useMutation(queryFn, {
		onSuccess: () => {
			onSuccess && onSuccess();
		},
		onError: () => {
			onError && onError();
		},
	});
};

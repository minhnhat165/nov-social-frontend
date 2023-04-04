import { likePost, unlikePost } from 'api/postApi';

import { useMutation } from 'react-query';

export const useLikePost = (
	isLiked,
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	const queryFn = isLiked ? unlikePost : likePost;
	return useMutation(queryFn, {
		onSuccess: () => {
			onSuccess && onSuccess();
		},
		onError: () => {
			onError && onError();
		},
	});
};

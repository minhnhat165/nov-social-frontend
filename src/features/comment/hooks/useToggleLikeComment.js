import { likeComment, unlikeComment } from 'api/commentApi';

import { useMutation } from 'react-query';

export const useToggleLikeComment = (
	isLiked = false,
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	const queryFn = isLiked ? unlikeComment : likeComment;
	return useMutation(queryFn, {
		onSuccess: () => {
			onSuccess && onSuccess();
		},
		onError: () => {
			onError && onError();
		},
	});
};

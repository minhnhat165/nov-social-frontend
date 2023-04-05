import { hidePost, unhidePost } from 'api/postApi';

import { useMutation } from 'react-query';

export const useHidePost = (
	isHidden,
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	const queryFn = isHidden ? unhidePost : hidePost;
	return useMutation(queryFn, {
		onSuccess: () => {
			onSuccess && onSuccess();
		},
		onError: () => {
			onError && onError();
		},
	});
};

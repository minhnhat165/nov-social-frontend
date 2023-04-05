import { hidePost } from 'api/postApi';
import { useMutation } from 'react-query';

export const useHidePost = (
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	const queryFn = hidePost;
	return useMutation(queryFn, {
		onSuccess: () => {
			onSuccess && onSuccess();
		},
		onError: () => {
			onError && onError();
		},
	});
};

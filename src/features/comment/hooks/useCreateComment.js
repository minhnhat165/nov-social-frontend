import { createComment } from 'api/commentApi';
import { useMutation } from 'react-query';

export const useCreateComment = (
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess } = options;
	return useMutation((data) => createComment(data), {
		onSuccess: (newPost, variables) => {
			onSuccess && onSuccess(newPost, variables);
		},
	});
};

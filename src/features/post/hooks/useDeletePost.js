import { deletePost } from 'api/postApi';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';

export const useDeletePost = (
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;

	return useMutation(deletePost, {
		onSuccess: (data, variables) => {
			onSuccess && onSuccess(data, variables);
		},
		onError: (error, variables, context) => {
			toast.error(error.message);
			onError && onError(error, variables, context);
		},
	});
};

import { toast } from 'react-hot-toast';
import { updatePost } from 'api/postApi';
import { useMutation } from 'react-query';

export const useUpdatePost = (
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	return useMutation(updatePost, {
		onSuccess: (data, variables) => {
			onSuccess && onSuccess(data, variables);
		},

		onError: (error, variables, context) => {
			console.log('useUpdatePost onError', error, variables, context);
			toast.error(error.message);
			onError && onError(error, variables, context);
		},
	});
};

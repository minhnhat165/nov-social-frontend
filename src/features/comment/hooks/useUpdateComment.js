import { toast } from 'react-hot-toast';
import { updateComment } from 'api/commentApi';
import { useMutation } from 'react-query';

export const useUpdateComment = (
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	return useMutation(updateComment, {
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

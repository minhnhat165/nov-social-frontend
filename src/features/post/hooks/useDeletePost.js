import { useMutation, useQueryClient } from 'react-query';

import { deletePost } from 'api/postApi';
import { toast } from 'react-hot-toast';

export const useDeletePost = (
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	const queryClient = useQueryClient();
	return useMutation(deletePost, {
		onSuccess: (data, variables) => {
			// delete post from cache
			queryClient.setQueryData(
				['posts', window.location.pathname],
				(oldData) => {
					return oldData.filter((post) => post._id !== variables);
				},
			);
			onSuccess && onSuccess(data, variables);
		},
		onError: (error, variables, context) => {
			toast.error(error.message);
			onError && onError(error, variables, context);
		},
	});
};

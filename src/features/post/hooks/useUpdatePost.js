import { useMutation, useQueryClient } from 'react-query';

import { toast } from 'react-hot-toast';
import { updatePost } from 'api/postApi';

export const useUpdatePost = (
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	const queryClient = useQueryClient();
	return useMutation(updatePost, {
		onSuccess: (data, variables) => {
			// update post in cache
			queryClient.setQueryData(
				['posts', window.location.pathname],
				(oldData) => {
					return oldData.map((post) => {
						if (post._id === variables._id) {
							return {
								...post,
								...data,
							};
						}
						return post;
					});
				},
			);
			onSuccess && onSuccess(data, variables);
		},

		onError: (error, variables, context) => {
			console.log('useUpdatePost onError', error, variables, context);
			toast.error(error.message);
			onError && onError(error, variables, context);
		},
	});
};

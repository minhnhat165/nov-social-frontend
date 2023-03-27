import { useMutation, useQueryClient } from 'react-query';

import postApi from 'api/postApi';
import { useSelector } from 'react-redux';

export const useCreatePost = (
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess, onError } = options;
	const queryClient = useQueryClient();
	const user = useSelector((state) => state.auth.user);
	return useMutation((data) => postApi.create(data, user), {
		onSuccess: (newPost) => {
			onSuccess && onSuccess(newPost);
			queryClient.setQueriesData(
				['posts', window.location.pathname],
				(oldData) => [newPost, ...oldData],
			);
		},
	});
};

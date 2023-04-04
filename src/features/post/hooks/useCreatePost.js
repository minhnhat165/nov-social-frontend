import postApi from 'api/postApi';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

export const useCreatePost = (
	options = {
		onSuccess: null,
		onError: null,
	},
) => {
	const { onSuccess } = options;
	const user = useSelector((state) => state.auth.user);
	return useMutation((data) => postApi.create(data, user), {
		onSuccess: (newPost) => {
			onSuccess && onSuccess(newPost);
		},
	});
};

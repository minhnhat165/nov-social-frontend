const { useMemo, useCallback } = require('react');
const { useQueryClient, useInfiniteQuery } = require('react-query');

export const usePostList = ({ queryKey, queryFn, fnParams, limit }) => {
	const queryClient = useQueryClient();
	const {
		data,
		hasNextPage,
		fetchNextPage,
		isLoading,
		refetch,
		isRefetching,
	} = useInfiniteQuery(
		queryKey,
		({ pageParam }) => {
			return queryFn({ ...fnParams, cursor: pageParam, limit: limit });
		},
		{
			getNextPageParam: (lastPage) => {
				const { hasNextPage, endCursor } = lastPage.data;
				if (!hasNextPage) return undefined;
				return endCursor;
			},
		},
	);
	const posts = useMemo(() => {
		if (!data) return [];
		const pages = data.pages;
		return pages.reduce((acc, page) => {
			return [...acc, ...page.data.items];
		}, []);
	}, [data]);

	const handleDeletePost = useCallback(
		(postId) => {
			queryClient.setQueryData(queryKey, (oldData) => {
				if (!oldData) return;
				const newData = {
					...oldData,
					pages: oldData.pages.map((page) => {
						return {
							...page,
							data: {
								...page.data,
								items: page.data.items.filter(
									(post) => post._id !== postId,
								),
							},
						};
					}),
				};
				return newData;
			});
		},
		[queryClient, queryKey],
	);

	const handleUpdatePost = useCallback(
		(newPost) => {
			queryClient.setQueryData(queryKey, (oldData) => {
				if (!oldData) return;
				const newData = {
					...oldData,
					pages: oldData.pages.map((page) => {
						return {
							...page,
							data: {
								...page.data,
								items: page.data.items.map((post) => {
									if (post._id === newPost._id) {
										return newPost;
									}
									return post;
								}),
							},
						};
					}),
				};
				return newData;
			});
		},
		[queryClient, queryKey],
	);

	const handleAddPost = useCallback(
		(newPost) => {
			queryClient.setQueryData(queryKey, (oldData) => {
				if (!oldData) return;
				const newData = {
					...oldData,
					pages: [
						{
							...oldData.pages[0],
							data: {
								...oldData.pages[0].data,
								items: [
									newPost,
									...oldData.pages[0].data.items,
								],
							},
						},
						...oldData.pages.slice(1),
					],
				};
				return newData;
			});
		},
		[queryClient, queryKey],
	);

	return {
		posts,
		hasNextPage,
		fetchNextPage,
		isLoading,
		refetch,
		isRefetching,
		handleDeletePost,
		handleAddPost,
		handleUpdatePost,
	};
};

import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInfiniteQuery, useQueryClient } from 'react-query';

import { Button } from 'components/Action';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layer from 'components/Layout/Layer';
import Layout from '../components/Layout';
import Post from 'features/post/components/Post';
import PostEditor from 'features/post/components/PostEditor';
import { Spinner } from 'components/Loading';
import { Text } from 'components/Typography';
import { getTimeline } from 'api/feedApi';
import { setReload } from 'store/slices/appSlice';
import { useCreatePost } from 'features/post/hooks';
import { useEffect } from 'react';

const Home = () => {
	return (
		<Layout>
			<div className="relative mx-auto flex max-w-[590px] flex-col pt-4">
				<PostCreator />
				<Timeline />
			</div>
		</Layout>
	);
};

export default Home;

const Timeline = () => {
	const isReload = useSelector((state) => state.app.isReload);
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const {
		data,
		hasNextPage,
		fetchNextPage,
		isLoading,
		refetch,
		isRefetching,
	} = useInfiniteQuery(
		'timeline',
		({ pageParam }) => getTimeline({ lastIndex: pageParam }),
		{
			getNextPageParam: (lastPage) => {
				if (!lastPage.moreAvailable) return undefined;
				return lastPage.lastIndex;
			},
		},
	);

	useEffect(() => {
		if (!isReload) return;
		refetch();
	}, [isReload, refetch]);

	useEffect(() => {
		if (isRefetching) return;
		dispatch(setReload(false));
	}, [isRefetching, dispatch]);

	const posts = useMemo(() => {
		if (!data) return [];
		return data?.pages.reduce((acc, page) => {
			return [...acc, ...page.items];
		}, []);
	}, [data]);

	const handleDeletePost = useCallback(
		(postId) => {
			queryClient.setQueryData('timeline', (oldData) => {
				if (!oldData) return;
				const newData = {
					...oldData,
					pages: oldData.pages.map((page) => ({
						...page,
						items: page.items.filter((post) => post._id !== postId),
					})),
				};
				return newData;
			});
		},
		[queryClient],
	);

	const handleUpdatePost = useCallback(
		(newPost) => {
			queryClient.setQueryData('timeline', (oldData) => {
				if (!oldData) return;
				const newData = {
					...oldData,
					pages: oldData.pages.map((page) => ({
						...page,
						items: page.items.map((post) =>
							post._id === newPost._id
								? {
										...post,
										...newPost,
								  }
								: post,
						),
					})),
				};
				return newData;
			});
		},
		[queryClient],
	);

	if (isLoading) return null;

	if (isReload)
		return (
			<Layer
				level={0}
				className="absolute left-1/2 top-10 z-50 -translate-x-1/2 rounded-full p-3"
			>
				<Spinner color="primary" size="lg" />
			</Layer>
		);

	return (
		<>
			<InfiniteScroll
				dataLength={posts.length}
				next={fetchNextPage}
				scrollThreshold={0.7}
				hasMore={hasNextPage}
				loader={<h4>Loading...</h4>}
				scrollableTarget="main-layout"
				endMessage={
					<Layer
						level={1}
						className="mb-4 flex flex-col items-center justify-center gap-5 p-6"
					>
						<div className="mt-2 flex flex-col items-center">
							<Text className="text-xl font-bold">
								No more posts to show
							</Text>
							<Text level={2}>
								Follow more people to see more posts in your
								Feed.
							</Text>
						</div>
						<Button size="md">Find People</Button>
					</Layer>
				}
			>
				<div className="flex flex-col gap-4 pb-4">
					{posts?.map((post) => (
						<Post
							key={post._id}
							post={post}
							onDeletePost={handleDeletePost}
							onUpdatePost={handleUpdatePost}
						/>
					))}
				</div>
			</InfiniteScroll>
		</>
	);
};

function PostCreator() {
	const queryClient = useQueryClient();
	const { mutateAsync } = useCreatePost({
		onSuccess: (data) => {
			queryClient.setQueryData('timeline', (oldData) => {
				if (!oldData) return;
				const newData = {
					...oldData,
					pages: [
						{
							...oldData.pages[0],
							items: [data, ...oldData.pages[0].items],
						},
						...oldData.pages.slice(1),
					],
				};
				return newData;
			});
		},
	});
	return (
		<div className="mb-4">
			<PostEditor onSubmit={mutateAsync} />
		</div>
	);
}

import { useCreatePost, usePostList } from 'features/post/hooks';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from 'components/Action';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layer from 'components/Layout/Layer';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import Post from 'features/post/components/Post';
import PostEditor from 'features/post/components/PostEditor';
import { PostSkeleton } from 'features/post/components/Post/Post';
import { Spinner } from 'components/Loading';
import { Text } from 'components/Typography';
import { getTimelineV2 } from 'api/feedApi';
import { setReload } from 'store/slices/appSlice';
import { useEffect } from 'react';

const Home = () => {
	return (
		<Layout>
			<div className="relative mx-auto flex max-w-[590px] flex-col sm:pt-4">
				<Timeline />
			</div>
		</Layout>
	);
};

export default Home;

const Timeline = () => {
	const isReload = useSelector((state) => state.app.isReload);
	const dispatch = useDispatch();
	const {
		fetchNextPage,
		handleAddPost,
		handleDeletePost,
		handleUpdatePost,
		hasNextPage,
		posts,
		refetch,
		isLoading,
		isRefetching,
	} = usePostList({
		queryKey: 'timeline',
		queryFn: getTimelineV2,
		limit: 5,
	});

	useEffect(() => {
		if (!isReload) return;
		refetch();
	}, [isReload, refetch]);

	useEffect(() => {
		if (isRefetching) return;
		dispatch(setReload(false));
	}, [isRefetching, dispatch]);

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
			<PostCreator handleAddPost={handleAddPost} />

			<InfiniteScroll
				dataLength={posts.length}
				next={fetchNextPage}
				scrollThreshold={0.7}
				hasMore={hasNextPage}
				loader={
					<div className="flex flex-col gap-1 sm:gap-4">
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
					</div>
				}
				endMessage={<FindMorePeople />}
			>
				{posts.length > 0 && (
					<div className="flex flex-col gap-1 pb-1 sm:gap-4 sm:pb-4">
						{posts?.map((post) => (
							<Post
								key={post._id}
								post={post}
								onDeletePost={handleDeletePost}
								onUpdatePost={handleUpdatePost}
							/>
						))}
					</div>
				)}
			</InfiniteScroll>
		</>
	);
};

function PostCreator({ handleAddPost }) {
	const { mutateAsync } = useCreatePost({
		onSuccess: (data) => {
			handleAddPost(data);
		},
	});
	return (
		<div className="mb-1 sm:mb-4">
			<PostEditor onSubmit={mutateAsync} />
		</div>
	);
}

const FindMorePeople = () => {
	return (
		<Layer
			responsive
			level={1}
			className="mb-1 flex flex-col items-center justify-center gap-5 p-6 sm:mb-4"
		>
			<div className="mt-2 flex flex-col items-center">
				<Text className="text-xl font-bold">No more posts to show</Text>
				<Text level={2}>
					Follow more people to see more posts in your Feed.
				</Text>
			</div>
			<Button as={Link} to="/people" size="md">
				Find People
			</Button>
		</Layer>
	);
};

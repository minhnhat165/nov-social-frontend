import { Link, useOutletContext } from 'react-router-dom';
import Post, { PostSkeleton } from 'features/post/components/Post/Post';

import { Button } from 'components/Action';
import { Card } from 'components/DataDisplay';
import InfiniteScroll from 'react-infinite-scroll-component';
import Layer from 'components/Layout/Layer';
import { ProfilePreview } from 'features/user/components';
import { UserProvider } from 'features/user/context';
import { getPosts } from 'api/postApi';
import { useEffect } from 'react';
import { usePostList } from 'features/post/hooks';
import useSearchUser from 'features/user/hooks/useSearchUser';

const MainSearchPage = () => {
	return (
		<div className="flex flex-col gap-1 sm:gap-4">
			<PeopleSection />
			<PostSection />
		</div>
	);
};

export const PostSection = () => {
	const { query } = useOutletContext();
	const {
		posts,
		fetchNextPage,
		handleDeletePost,
		handleUpdatePost,
		hasNextPage,
	} = usePostList({
		queryFn: getPosts,
		queryKey: ['search-posts', query],
		fnParams: { q: query },
	});
	return (
		<div className="flex flex-col gap-4">
			<InfiniteScroll
				dataLength={posts.length}
				next={fetchNextPage}
				scrollThreshold={0.7}
				hasMore={hasNextPage}
				loader={
					<div className="mt-1 flex flex-col gap-1 sm:mt-4 sm:gap-4">
						<PostSkeleton />
						<PostSkeleton />
						<PostSkeleton />
					</div>
				}
			>
				<div className="flex flex-col gap-1 sm:gap-4">
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
		</div>
	);
};

const PeopleSection = () => {
	const { query } = useOutletContext();
	const { data, setQuery } = useSearchUser({ query, limit: 3 });
	const { items: users } = data || { items: [], total: 0 };
	useEffect(() => {
		setQuery(query);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);
	if (users.length === 0) {
		return null;
	}
	return (
		<Card responsive>
			<Card.Header>
				<Card.Title>People</Card.Title>
			</Card.Header>
			<Card.Body className="min-h-[100px] pb-4">
				<div className="flex flex-col gap-2">
					{users.map((user) => (
						<UserProvider key={user._id} user={user}>
							{({ user, updateUser }) => (
								<Layer level={0}>
									<ProfilePreview
										className="!w-full"
										user={user}
										onUpdateUser={updateUser}
									/>
								</Layer>
							)}
						</UserProvider>
					))}
				</div>
				{users.length > 0 && users.length < data.total && (
					<Button
						as={Link}
						className="mt-2"
						variant="text"
						to={`/search/people?q=${query}`}
					>
						See all
					</Button>
				)}
			</Card.Body>
		</Card>
	);
};

export default MainSearchPage;

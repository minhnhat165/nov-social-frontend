import React, { useEffect } from 'react';
import { getPostsByUserId } from '../../../../api/postApi';
import PostList from '../../../../components/Post/PostList';
import PostCardLoading from '../../../../components/SkeletonLoading/PostCardLoading';
import { usePostListContext } from '../../../../contexts/PostListContext';
import { useAsyncFn } from '../../../../hooks/useAsync';

const PostContainer = ({ userId }) => {
	const { postList, setPostList } = usePostListContext();
	const getPostListFn = useAsyncFn(getPostsByUserId);
	useEffect(() => {
		let mounted = true;
		getPostListFn.execute(userId).then((data) => {
			if (!mounted) return;
			setPostList(data.data);
		});
		return () => {
			mounted = false;
			setPostList([]);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);
	return (
		<div>
			<PostList postList={postList} />
			{getPostListFn.loading && (
				<div className="flex w-full flex-col gap-4 pb-4">
					<PostCardLoading />
					<PostCardLoading />
				</div>
			)}
		</div>
	);
};

export default PostContainer;

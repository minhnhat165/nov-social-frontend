import { useEffect, useState } from 'react';
import { getPost } from '../../../api/postApi';
import NotFound from '../../../components/NotFound';
import PostList from '../../../components/Post/PostList';
import { usePostListContext } from '../../../contexts/PostListContext';
import { useAsyncFn } from '../../../hooks/useAsync';

const PostContainer = ({ id }) => {
	const getPostFn = useAsyncFn(getPost);
	const { setPostList, postList } = usePostListContext();
	const [notFound, setNotFound] = useState(false);
	useEffect(() => {
		getPostFn.execute(id).then((post) => {
			if (post) setPostList([post]);
			else setNotFound(true);
		});
	}, [id]);

	return (
		<>
			<PostList postList={postList} />
			{notFound && (
				<div className="flex h-full items-center justify-center">
					<NotFound />
				</div>
			)}
		</>
	);
};

export default PostContainer;

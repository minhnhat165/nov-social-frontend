import { useMemo, useRef } from 'react';

import Layout from '../components/Layout';
import Post from 'features/post/components/Post';
import PostEditor from 'features/post/components/PostEditor';
import { getPosts } from 'api/postApi';
import { useCreatePost } from 'features/post/hooks';
import { useQuery } from 'react-query';

const Home = () => {
	const { mutate } = useCreatePost({
		onSuccess: () => {
			editorRef.current.setIsLoading(false);
			editorRef.current.reset();
		},
	});
	const editorRef = useRef();
	return (
		<Layout>
			<div className="mx-auto flex max-w-[600px] flex-col pt-4">
				<div className="mb-4">
					<PostEditor onSubmit={mutate} ref={editorRef} />
				</div>
				<Timeline />
			</div>
		</Layout>
	);
};

export default Home;

const Timeline = () => {
	const queryKey = useMemo(() => ['posts', window.location.pathname], []);
	const { data: posts, isSuccess } = useQuery(queryKey, () => getPosts());
	return (
		<div className="flex flex-col gap-4 pb-4">
			{isSuccess &&
				posts?.map((post) => <Post key={post._id} post={post} />)}
		</div>
	);
};

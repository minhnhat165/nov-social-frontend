import Layer from 'components/Layout/Layer';
import Layout from '../components/Layout';
import Post from 'features/post/components/Post';
import PostEditor from 'features/post/components/PostEditor';
import { getPosts } from 'api/postApi';
import { useCreatePost } from 'features/post/hooks';
import { useQuery } from 'react-query';

const Home = () => {
	const { mutate } = useCreatePost();
	const { data: posts, isSuccess } = useQuery(
		['posts', window.location.pathname],
		() => getPosts(),
	);
	return (
		<Layout>
			<div className="mx-auto flex max-w-[600px] flex-col pt-2">
				<Layer className="mb-4 h-14"></Layer>
				<div className="mb-4">
					<PostEditor onSubmit={mutate} />
				</div>
				<div className="flex flex-col gap-4">
					{isSuccess &&
						posts?.map((post) => (
							<Post key={post._id} post={post} />
						))}
				</div>
			</div>
		</Layout>
	);
};

export default Home;

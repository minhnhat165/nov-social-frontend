import Head from 'components/Head/Head';
import Post from 'features/post/components/Post/Post';
import { getPost } from 'api/postApi';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

export const Main = () => {
	const { id } = useParams();
	const { data, isSuccess } = useQuery(['post', id], () => {
		return getPost(id);
	});

	const post = { ...data?.post, showComment: true };

	return (
		<div className="flex h-full sm:justify-center sm:pt-14">
			<Head />
			{isSuccess && (
				<div className="w-screen sm:w-[590px]">
					<Post id={id} post={post} />
				</div>
			)}
		</div>
	);
};

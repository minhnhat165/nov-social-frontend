import { EditorState, convertFromRaw } from 'draft-js';
import { useNavigate, useParams } from 'react-router-dom';

import Head from 'components/Head/Head';
import Post from 'features/post/components/Post/Post';
import { getPost } from 'api/postApi';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

export const Main = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, isSuccess } = useQuery(
		['post', id],
		() => {
			return getPost(id);
		},
		{
			onError: (error) => {
				error?.status === 404 && navigate('/404');
			},
		},
	);

	const post = { ...data?.post, showComment: true };
	const { content, photos } = post;
	const initialEditorState = useMemo(() => {
		if (content) {
			return EditorState.createWithContent(
				convertFromRaw(JSON.parse(content)),
			);
		}
		return EditorState.createEmpty();
	}, [content]);

	const text = initialEditorState.getCurrentContent().getPlainText();

	return (
		<div className="flex h-full sm:justify-center sm:pt-14">
			<Head
				title={text?.length > 50 ? `${text.slice(0, 50)}...` : text}
				description={
					text?.length > 50 ? `${text.slice(0, 50)}...` : text
				}
				image={photos?.length > 0 ? photos[0].url : null}
			/>
			{isSuccess && (
				<div className="w-screen sm:w-[590px]">
					<Post id={id} post={post} isDetail />
				</div>
			)}
		</div>
	);
};

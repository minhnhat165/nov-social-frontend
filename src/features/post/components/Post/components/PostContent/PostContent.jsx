import { ContentEditor } from 'features/post/components/PostEditor/components';
import { usePost } from '../../Post';

export const PostContent = () => {
	const { content } = usePost();

	return (
		<div className={`post-content mb-2`}>
			<ContentEditor readOnly={true} initial={content} />
		</div>
	);
};

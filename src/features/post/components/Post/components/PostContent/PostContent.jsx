import './styles/editorStyle.css';

import { RichTextEditor } from 'components/DataEntry';
import { usePost } from '../../Post';

export const PostContent = () => {
	const { content } = usePost();

	return (
		<div className={`post-content mb-2`}>
			<RichTextEditor readOnly={true} initial={content} />
		</div>
	);
};

import '../style.css';

import { RichTextEditor } from 'components/DataEntry';
import { useCallback } from 'react';
import { useCommentEditor } from '../context';

export const CommentTextEditor = ({ placeholder, contentEditorRef }) => {
	const { initial, isFocused, setHasContent, handleDirty } =
		useCommentEditor();
	const handleContentEmpty = useCallback(
		(isEmpty) => {
			setHasContent(!isEmpty);
		},
		[setHasContent],
	);

	const handleContentDirty = useCallback(
		(isDirty) => {
			handleDirty('content', isDirty);
		},
		[handleDirty],
	);
	return (
		<RichTextEditor
			placeholder={placeholder}
			className="my-2"
			fontSizeDefault={1}
			fontSizeReduced={1}
			initial={initial.content}
			onEmptyChange={handleContentEmpty}
			onDirtyChange={handleContentDirty}
			enterToSubmit={true}
			autoFocus={isFocused}
			ref={contentEditorRef}
		/>
	);
};

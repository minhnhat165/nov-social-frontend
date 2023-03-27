import { ContentEditor } from '.';
import { useCallback } from 'react';
import { usePostEditor } from '../context';

export const PostTextEditor = ({ placeholder, contentEditorRef }) => {
	const { initial, isFocused, setHasContent, handleDirty } = usePostEditor();
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
		<ContentEditor
			placeholder={placeholder}
			className="my-2"
			initial={initial.content}
			onEmptyChange={handleContentEmpty}
			onDirtyChange={handleContentDirty}
			autoFocus={isFocused}
			ref={contentEditorRef}
		/>
	);
};

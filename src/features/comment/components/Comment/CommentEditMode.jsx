import { CommentEditor, editorModes } from '../CommentEditor';
import { cloneObject, getModifiedFields } from 'utils';

import { KeyboardTextAction } from './KeyboardTextAction';
import { useComments } from 'features/comment/context/CommentsContext';
import { useEffect } from 'react';
import { useUpdateComment } from 'features/comment/hooks';

export const CommentEditMode = ({ comment, setIsEditing, onUpdate }) => {
	const { updateComment } = useComments();
	const { mutateAsync } = useUpdateComment({
		onSuccess: ({ comment: newData }) => {
			updateComment(newData);
			onUpdate && onUpdate(newData);
		},
	});
	useEffect(() => {
		// add event listener to handle escape key
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				setIsEditing(false);
			}
		};
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="rounded-xl border border-primary-500">
				<CommentEditor
					autoFocus={true}
					initial={cloneObject(comment)} // clone to avoid mutating the original post
					mode={editorModes.EDIT}
					onCanceled={() => setIsEditing(false)}
					onSubmit={(newCommentData) => {
						const newComment = {
							...comment,
							...getModifiedFields(comment, newCommentData),
						};

						updateComment(newComment);
						onUpdate && onUpdate(newComment);
						setIsEditing(false);
						mutateAsync({
							_id: comment._id,
							...getModifiedFields(comment, newCommentData),
						});
					}}
				/>
			</div>
			<div className="prose -mt-2">
				<KeyboardTextAction
					action={() => setIsEditing(false)}
					keyName="Escape"
					keyDisplay="Esc"
					textAction="cancel"
				/>
			</div>
		</>
	);
};

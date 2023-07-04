import {
	COMMENT_STATUS,
	CommentEditor,
	useCreateComment,
} from 'features/comment';

import { useSelector } from 'react-redux';

export function CommentCreator({
	onLocalCommentCreated,
	onServerCommentCreated,
	initial,
	editorRef,
	...props
}) {
	const { mutate } = useCreateComment({
		onSuccess: ({ comment: newComment }, variables) => {
			// update the local comment with the server comment
			onServerCommentCreated?.(
				{ ...newComment, status: COMMENT_STATUS.APPROVED },
				variables._id,
			);
		},
		onError: (error, variables) => {
			// update the local comment with the server comment
			onServerCommentCreated?.(
				{ ...variables, status: COMMENT_STATUS.REJECTED },
				variables._id,
			);
		},
	});
	const user = useSelector((state) => state.auth.user);

	const handleCreateComment = (data) => {
		const newComment = {
			_id: crypto.randomUUID(),
			...data,
		};
		mutate(newComment);
		const localComment = {
			...newComment,
			author: user,
			status: COMMENT_STATUS.PENDING,
		};
		onLocalCommentCreated?.(localComment);
		//
	};

	return (
		<CommentEditor
			initial={{
				...initial,
				hashtags: [],
				mentions: [],
				photos: [],
			}}
			onSubmit={handleCreateComment}
			{...props}
			ref={editorRef}
		/>
	);
}

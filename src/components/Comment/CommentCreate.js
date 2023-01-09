import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../api/commentApi';
import { useAsyncFn } from '../../hooks/useAsync';
import { createNotification } from '../../redux/slices/notificationSlice';
import { useComment } from './CommentContext';
import CommentForm from './CommentForm';

const CommentCreate = ({
	initial = { text: '', image: '' },
	postId,
	postUserId,
}) => {
	const { createLocalComment } = useComment();
	const createCommentFn = useAsyncFn(createComment);

	const user = useSelector((state) => state.auth.user);
	const socket = useSelector((state) => state.socket.socket);
	const dispatch = useDispatch();

	const handleCreateComment = async (data) => {
		data.append('postId', postId);
		data.append('postUserId', postUserId);
		if (initial?.reply) data.append('reply', initial.reply);
		createCommentFn.execute(data).then((comment) => {
			createLocalComment(comment);
			socket.emit('create comment', comment);
			if (user._id === postUserId) return;
			dispatch(
				createNotification({
					data: {
						recipients: postUserId,
						text: 'commented on your post',
						type: 'comment',
						url: `/post/${postId}?cmt`,
					},
					socket,
				})
			);
		});
	};
	return (
		<CommentForm
			initial={initial}
			onSubmit={handleCreateComment}
			loading={createCommentFn.loading}
		/>
	);
};

export default CommentCreate;

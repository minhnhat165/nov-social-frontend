import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import getArrayUniqueByKey from '../../functions/getArrayUniqueByKey';

const Context = createContext();
export function useComment() {
	return useContext(Context);
}

const CommentProvider = ({ children, post }) => {
	const socket = useSelector((state) => state.socket.socket);
	const [comments, setComments] = useState([]);
	const [totalComment, setTotalComment] = useState(post.comments.length);

	const commentsByParentId = useMemo(() => {
		const group = {};
		comments.forEach((comment) => {
			group[comment.reply] ||= [];
			group[comment.reply].push(comment);
		});
		return group;
	}, [comments]);

	const setChildComments = (childComments) => {
		setComments(getArrayUniqueByKey('_id', [...comments, ...childComments]));
	};

	const createLocalComment = (comment) => {
		setComments((prev) => {
			if (comment?.reply) return [...prev, comment];
			return [comment, ...prev];
		});
		setTotalComment((prev) => ++prev);
	};

	const deleteLocalComment = (commentId, deletedCommentCount) => {
		setComments((prev) =>
			prev.filter((comment) => {
				if (comment._id === commentId || comment.reply === commentId) {
					return false;
				}
				return true;
			})
		);
		setTotalComment((prev) => prev - deletedCommentCount);
	};

	const updateLocalComment = (updatedComment) => {
		setComments((prev) =>
			prev.map((comment) => {
				if (comment._id === updatedComment._id) return updatedComment;
				return comment;
			})
		);
	};

	useEffect(() => {
		if (!socket) return;
		socket.on('create comment response', (newComment) => {
			if (newComment.postId !== post._id) return;
			createLocalComment(newComment);
		});

		socket.on('update comment response', (comment) => {
			if (comment.postId !== post._id) return;
			updateLocalComment(comment);
		});
		socket.on(
			'delete comment response',
			({ commentId, deletedCommentCount, postId }) => {
				if (post._id !== postId) return;
				deleteLocalComment(commentId, deletedCommentCount);
			}
		);

		socket.on('toggle like comment response', (comment) => {
			if (post._id !== comment.postId) return;
			updateLocalComment(comment);
		});

		return () => {
			if (socket) {
				socket.off('create comment response');
				socket.off('update comment response');
				socket.off('delete comment response');
				socket.off('toggle like comment response');
			}
		};
	}, [post._id, socket]);
	return (
		<Context.Provider
			value={{
				comments,
				totalComment,
				rootComments: commentsByParentId[undefined],
				commentsByParentId,
				setComments,
				createLocalComment,
				updateLocalComment,
				deleteLocalComment,
				setChildComments,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export default CommentProvider;

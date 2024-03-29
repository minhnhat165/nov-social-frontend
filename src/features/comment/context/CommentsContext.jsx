import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { extractPath } from '../utils';
import { getCommentWithRelatedData } from 'api/commentApi';
import { useMutation } from 'react-query';
import { usePost } from 'features/post/components/Post/Post';
import { useSearchParams } from 'react-router-dom';

const CommentsContext = createContext({
	rootComments: [],
	comments: [],
	setComments: () => {},
	commentsCount: 0,
	addComment: () => {},
	updateComment: () => {},
	replaceComment: () => {},
	getCommentsByParentId: () => {},
	setUniqueComments: () => {},
	deleteComment: () => {},
});
const useComments = () => useContext(CommentsContext);

const CommentsProvider = ({ children, comments: _comments = [] }) => {
	const [comments, setComments] = useState(_comments);
	const [commentsCount, setCommentsCount] = useState(0);
	const { increaseNumComments, decreaseNumComments } = usePost();

	const addComment = (comment, addLast = false) => {
		const { parentIds } = extractPath(comment.path);
		const newComments = comments.map((prevComment) => {
			if (parentIds.includes(prevComment._id)) {
				return {
					...prevComment,
					numReplies: prevComment.numReplies + 1,
				};
			}
			return prevComment;
		});
		if (addLast) {
			newComments.push(comment);
		} else {
			newComments.unshift(comment);
		}
		setComments(newComments);
		setCommentsCount((prev) => prev + 1);
		increaseNumComments();
	};

	const updateComment = (comment) => {
		setComments((prev) =>
			prev.map((prevComment) => {
				if (prevComment._id === comment._id) {
					return {
						...prevComment,
						...comment,
					};
				}
				return prevComment;
			}),
		);
	};

	const deleteComment = (commentId) => {
		// filter out the comment to delete and its replies
		// and also get the comment to delete
		let deletedComment = null;

		let newComments = comments.filter((comment) => {
			if (comment._id === commentId || comment.path.includes(commentId)) {
				if (comment._id === commentId) {
					deletedComment = comment;
				}
				return false;
			}
			return true;
		});

		// get the parentIds of the comment to delete
		const { parentIds } = extractPath(deletedComment.path);

		let count = deletedComment.numReplies + 1;

		// decrease the numReplies of the comments whose parentIds
		// are in the deletedComment path
		newComments = newComments.map((prevComment) => {
			if (parentIds.includes(prevComment._id)) {
				return {
					...prevComment,
					numReplies: prevComment.numReplies - count,
				};
			}
			return prevComment;
		});

		setComments(newComments);

		// decrease the numComments in the state
		decreaseNumComments(count);
	};
	const setUniqueComments = (newComments) => {
		// 1. Create a map of comments to test for uniqueness
		setComments((prev) => {
			// 2. Map new comments to a map of comment ID to comment
			const newCommentsMap = newComments.reduce((acc, comment) => {
				acc[comment._id] = comment;
				return acc;
			}, {});
			// 3. Map previous comments to a map of comment ID to comment
			const prevCommentsMap = prev.reduce((acc, comment) => {
				acc[comment._id] = comment;
				return acc;
			}, {});
			// 4. Combine previous and new comments into a single map of comment ID to comment
			const mergedComments = { ...prevCommentsMap, ...newCommentsMap };
			// 5. Return an array of all comment values
			return Object.values(mergedComments);
		});
	};

	const replaceComment = (comment, localId) => {
		setComments((prev) =>
			prev.map((prevComment) => {
				if (prevComment._id === localId) {
					return comment;
				}
				return prevComment;
			}),
		);
	};

	const commentByParentId = useMemo(() => {
		const group = {};
		comments.forEach((comment) => {
			group[comment.parentId] ||= [];
			group[comment.parentId].push(comment);
		});

		return group;
	}, [comments]);

	const getCommentsByParentId = (parentId) => {
		return commentByParentId[parentId] || [];
	};

	return (
		<CommentsContext.Provider
			value={{
				rootComments: commentByParentId[null] || [],
				setComments,
				getCommentsByParentId,
				comments,
				commentsCount,
				addComment,
				updateComment,
				replaceComment,
				setUniqueComments,
				deleteComment,
			}}
		>
			{children}
		</CommentsContext.Provider>
	);
};

export const ParamComments = () => {
	const { comments, setUniqueComments } = useComments();
	const [searchParams] = useSearchParams();
	const commentId = searchParams.get('commentId');
	const [isFetchedCommentParams, setIsFetchedCommentParams] = useState(false);
	const { mutate } = useMutation(getCommentWithRelatedData, {
		onSuccess: (data) => {
			const { comments: extractComments, comment } = data;
			const parentIds = extractPath(comment.path).parentIds;
			setUniqueComments(
				extractComments.map((comment) => ({
					...comment,
					isShowReplies: parentIds.includes(comment._id),
				})),
			);
			setIsFetchedCommentParams(true);
		},
	});
	useEffect(() => {
		// check list of comments for have commentId
		if (!commentId) return;
		if (!isFetchedCommentParams) {
			const comment = comments.find(
				(comment) => comment._id === commentId,
			);
			if (comment) return;
			mutate(commentId);
		}
		return () => {
			setIsFetchedCommentParams(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [commentId]);
	return <></>;
};

export { CommentsContext, CommentsProvider, useComments };

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	deleteComment,
	getReplyComments,
	likeComment,
	updateComment,
} from '../../api/commentApi';
import { useAsyncFn } from '../../hooks/useAsync';

import Avatar from '../DataDisplay/Avatar';
import CloseButton from '../ButtonOld/CloseButton';
import ConfirmBox from '../ConfirmBox';
import CommentActionBar from './CommentActionBar';
import CommentContent from './CommentContent';
import { useComment } from './CommentContext';
import CommentCreate from './CommentCreate';
import CommentForm from './CommentForm';
import CommentMenu from './CommentMenu';
import RenderReply from './RenderReply';

const CommentCard = ({ comment, onReply }) => {
	const {
		updateLocalComment,
		deleteLocalComment,
		setChildComments,
		commentsByParentId,
	} = useComment();
	const socket = useSelector((state) => state.socket.socket);

	const updateCommentFn = useAsyncFn(updateComment);
	const deleteCommentFn = useAsyncFn(deleteComment);
	const getReplyCommentsFn = useAsyncFn(getReplyComments);
	const toggleLikeCommentFn = useAsyncFn(likeComment);

	const [showEdit, setShowEdit] = useState(false);
	const [replyComments, setReplyComments] = useState([]);
	const [showReply, setShowReply] = useState(comment?.isLoadedReply);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [tagUser, setTagUser] = useState(null);

	useEffect(() => {
		setReplyComments(commentsByParentId[comment._id]);
	}, [comment._id, commentsByParentId]);

	const handleUpdateComment = useCallback(
		async (data) => {
			updateCommentFn.execute(comment._id, data).then((comment) => {
				updateLocalComment(comment);
				setShowEdit(false);
				socket.emit('update comment', comment);
			});
		},
		[socket]
	);

	const handleDeleteComment = useCallback(() => {
		const commentId = comment._id;
		deleteCommentFn.execute(commentId).then((data) => {
			const deletedCommentCount = data.deletedCommentCount;
			deleteLocalComment(commentId, deletedCommentCount);
			setShowConfirmDelete(false);
			socket.emit('delete comment', {
				commentId,
				deletedCommentCount,
				postId: comment.postId,
			});
		});
	}, [socket]);

	const handleLike = useCallback(() => {
		toggleLikeCommentFn.execute(comment._id).then((comment) => {
			updateLocalComment(comment);
			socket.emit('toggle like comment', comment);
		});
	}, []);
	const handleShowReply = useCallback(() => {
		setShowReply(true);
		if (comment?.isLoadedReply) return;
		getReplyCommentsFn.execute(comment._id).then((comments) => {
			setChildComments(comments);
			updateLocalComment({ ...comment, isLoadedReply: true });
		});
	}, [comment]);

	const handleReply = useCallback(
		(commentReply) => {
			if (onReply) {
				onReply(commentReply.user);
				return;
			}
			if (!showReply) handleShowReply();
			setTagUser(commentReply.user);
		},
		[handleShowReply, showReply]
	);

	return useMemo(() => {
		return (
			<>
				{showEdit ? (
					<div className="flex gap-2">
						<div className="flex-1">
							<CommentForm
								initial={comment}
								onSubmit={handleUpdateComment}
								loading={updateCommentFn.loading}
							/>
						</div>
						<CloseButton
							onClick={() => setShowEdit(false)}
							className="mt-[6px] dark:bg-dark-very-light"
						/>
					</div>
				) : (
					<div className="relative" key={comment._id}>
						{(comment?.childComments.length > 0 || showReply) && (
							<div className="comment-line absolute top-0 left-4 h-full w-[2px] -translate-x-1/2"></div>
						)}
						<div className="flex gap-2">
							<Avatar url={comment.user.avatar} size="w-8 h-8" />
							<div className="w-full">
								<div className="group w-full">
									<div className="text-sm dark:text-dark-text-bold">
										{comment.user.name}
									</div>
									<div className="flex items-center gap-2">
										<CommentContent comment={comment} />
										<CommentMenu
											comment={comment}
											onEdit={() => setShowEdit(true)}
											onDelete={() =>
												setShowConfirmDelete(true)
											}
										/>
									</div>
									<div className="mt-1">
										<CommentActionBar
											comment={comment}
											onReply={handleReply}
											onLike={handleLike}
										/>
									</div>
								</div>
								{showReply ? (
									<div className="relative -ml-10 dark:bg-dark-regular">
										<div className="comment-line absolute top-0 left-4 h-full w-[2px] -translate-x-1/2"></div>
										<div className="ml-10">
											<div className="ml-2">
												<RenderReply
													replies={replyComments}
													onReply={handleReply}
												/>
												<div className="relative mt-2">
													<div className="absolute top-0 -left-[2px] h-full w-8 -translate-x-full pl-[1.5px] dark:bg-dark-regular">
														<div className="h-4 w-full rounded-bl-xl border-l-2 border-b-2 dark:border-dark-very-light"></div>
													</div>
													<CommentCreate
														postId={comment.postId}
														postUserId={
															comment.postUserId
														}
														initial={{
															text: '',
															image: '',
															reply: comment._id,
															tag: tagUser,
														}}
													/>
												</div>
											</div>
										</div>
									</div>
								) : (
									<>
										{comment?.childComments.length > 0 && (
											<div
												onClick={handleShowReply}
												className="group relative mt-2 cursor-pointer"
											>
												<div>
													<span className="mt-[2px] inline-block">
														<i className="fa-solid fa-angles-right text-primary/75 group-hover:text-primary"></i>
													</span>
													<span className="mx-2 text-[14px] group-hover:text-white">
														{
															comment
																?.childComments
																.length
														}{' '}
														<span className="font-bold">
															replies
														</span>
													</span>
												</div>
												<div className="comment-line absolute bottom-0 left-0 h-full w-[26px] -translate-x-full dark:bg-dark-regular">
													<div className="ml-[1px] h-[calc(50%_+_2px)] w-full rounded-bl-xl border-l-[2px] border-b-[2px] dark:border-dark-very-light"></div>
												</div>
											</div>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				)}
				<ConfirmBox
					loading={deleteCommentFn.loading}
					show={showConfirmDelete}
					setShow={setShowConfirmDelete}
					onConfirm={handleDeleteComment}
					header={
						<span>
							Delete your{' '}
							<span className="text-primary">comment</span> ?
						</span>
					}
					content={'Are you sure you want to delete this comment?'}
					buttonText={'Delete'}
				/>
			</>
		);
	}, [
		comment,
		deleteCommentFn.loading,
		handleDeleteComment,
		handleLike,
		handleReply,
		handleShowReply,
		handleUpdateComment,
		replyComments,
		showConfirmDelete,
		showEdit,
		showReply,
		tagUser,
		updateCommentFn.loading,
	]);
};

export default memo(CommentCard);

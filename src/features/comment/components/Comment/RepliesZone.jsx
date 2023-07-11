import { Corner, Line, MAX_LEVEL, useComment } from './Comment';
import {
	Fragment,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';

import { CommentCreator } from '../CommentCreator';
import { KeyboardTextAction } from './KeyboardTextAction';
import Layer from 'components/Layout/Layer';
import { ReplyList } from './ReplyList';
import { ShowReplyButton } from './ShowReplyButton';
import clsx from 'clsx';
import { generateContentWithMentionUser } from 'features/post/components/PostEditor/utils';
import { getChildComments } from 'api/commentApi';
import { useComments } from 'features/comment/context';
import { useMutation } from 'react-query';

export const RepliesZone = forwardRef((props, ref) => {
	const {
		comment,
		currentLevel,
		hideReplyForm,
		isReplying,
		setIsReplying,
		isActivated,
	} = useComment();
	const {
		addComment,
		setUniqueComments,
		replaceComment,
		comments: AllComments,
		updateComment: updateLocalComment,
		getCommentsByParentId,
	} = useComments();

	const { numReplies, isShowReplies: _isShowReplies } = comment;

	const replies = useMemo(() => {
		return getCommentsByParentId(comment._id); // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AllComments]);
	const [isShowReplies, setIsShowReplies] = useState(_isShowReplies);
	const [newReplies, setNewReplies] = useState([]); // use for create but not show replies yet

	const replaceNewReply = (comment, localId) => {
		setNewReplies((prev) =>
			prev.map((prevComment) => {
				if (prevComment._id === localId) {
					return comment;
				}
				return prevComment;
			}),
		);
	};

	const updateNewReply = (comment) => {
		setNewReplies((prev) =>
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

	const deleteNewReply = (commentId) => {
		setNewReplies((prev) =>
			prev.filter((prevComment) => prevComment._id !== commentId),
		);
	};

	const { isLoading, mutateAsync } = useMutation(getChildComments, {
		onSuccess: ({ comments }) => {
			setUniqueComments(comments);
			replaceComment({ ...comment, isLoadedChild: true }, comment._id);
		},
	});

	const showReplies = async () => {
		if (!comment?.isLoadedChild) {
			await mutateAsync(comment._id);
		}
		setIsShowReplies(true);
		updateLocalComment({
			_id: comment._id,
			isShowReplies: true,
		});
	};

	const hideReplies = () => {
		setIsShowReplies(false);
		updateLocalComment({
			_id: comment._id,
			isShowReplies: false,
		});
	};

	const toggleReply = () => {
		if (isShowReplies) {
			hideReplies();
			return;
		}
		showReplies();
	};

	const [initialContent, setInitialContent] = useState(null);

	const commentFormRef = useRef(null);
	const handleClickReply = useCallback(
		(comment) => {
			setIsReplying(true);
			setInitialContent(generateContentWithMentionUser(comment.author));
			setTimeout(() => {
				commentFormRef.current?.focus();
			}, 100);
			commentFormRef.current?.reply(comment.author);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[commentFormRef],
	);
	useImperativeHandle(
		ref,
		() => ({
			reply: handleClickReply,
		}),
		[handleClickReply],
	);

	useEffect(() => {
		setIsShowReplies(_isShowReplies);
	}, [_isShowReplies]);

	const numRepliesToShow = numReplies - newReplies.length;

	return (
		<div
			className={clsx(
				'flex pl-2',
				currentLevel === 0 && !isShowReplies && 'pb-2',
			)}
		>
			<div className="flex w-9 justify-center">
				<Line />
			</div>
			<div className="relative flex-1">
				{currentLevel < MAX_LEVEL && (
					<Fragment>
						{numRepliesToShow > 0 && (
							<div className="relative pl-2">
								<ShowReplyButton
									toggleReply={toggleReply}
									isLoading={isLoading}
									isShowReplies={isShowReplies}
									numRepliesToShow={numRepliesToShow}
								/>
								{!isShowReplies && (
									<Layer
										className={clsx(
											'absolute left-0 top-0 h-9 w-9 -translate-x-full',
											isReplying && '!bg-transparent',
											newReplies.length > 0 &&
												'!bg-transparent',
										)}
									>
										<div className="absolute left-1/2 top-0 z-10 -ml-[1px]">
											<Corner height={20} />
										</div>
									</Layer>
								)}
							</div>
						)}
						{isShowReplies && (
							<ReplyList
								comments={replies}
								currentLevel={currentLevel}
								updateNewReply={updateNewReply}
								deleteNewReply={deleteNewReply}
								handleClickReply={handleClickReply}
								isReplying={isReplying}
								isActivated={isActivated}
							/>
						)}

						{!isShowReplies && newReplies.length > 0 && (
							<ReplyList
								comments={newReplies}
								currentLevel={currentLevel}
								updateNewReply={updateNewReply}
								deleteNewReply={deleteNewReply}
								handleClickReply={handleClickReply}
								isReplying={isReplying}
								isActivated={isActivated}
							/>
						)}
					</Fragment>
				)}
				{isReplying && initialContent && (
					<div className="relative ml-2 mt-2">
						<CommentCreator
							editorRef={commentFormRef}
							autoFocus={true}
							onLocalCommentCreated={(data) => {
								hideReplyForm();
								addComment(data, true);
								if (!isShowReplies)
									setNewReplies((prev) => [...prev, data]);
							}}
							onServerCommentCreated={(newComment, replaceId) => {
								replaceNewReply(newComment, replaceId);
								replaceComment(newComment, replaceId);
							}}
							initial={{
								parentId:
									currentLevel >= MAX_LEVEL
										? comment.parentId
										: comment._id,
								postId: comment.postId,
								path: `${comment.path}/${comment._id}`,
								content: JSON.stringify(initialContent),
							}}
							placeholder={`Reply to this ${comment.author.username}`}
						/>
						<KeyboardTextAction
							action={() => setIsReplying(false)}
							keyName="Escape"
							keyDisplay="Esc"
							textAction="cancel"
						/>

						<Layer className="absolute bottom-0 left-0 h-[90%] w-9 -translate-x-full">
							<div className="absolute left-0 top-0 z-10 -ml-[16.25px] -mt-[1.25px] translate-x-full">
								<Corner />
							</div>
						</Layer>
					</div>
				)}
			</div>
		</div>
	);
});

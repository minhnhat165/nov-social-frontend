import { Comment, Corner, Line, MAX_LEVEL, useComment } from './Comment';
import { useMemo, useState } from 'react';

import { ArrowDropDownIcon } from 'components/Icon';
import { Button } from 'components/Action';
import { CommentCreator } from '../CommentCreator';
import { CommentSkeleton } from '../CommentSkeleton';
import { KeyboardTextAction } from './KeyboardTextAction';
import Layer from 'components/Layout/Layer';
import clsx from 'clsx';
import { genKey } from 'draft-js';
import { getChildComments } from 'api/commentApi';
import { useComments } from 'features/comment/context/CommentsContext';
import { useMutation } from 'react-query';

export function RepliesZone() {
	const { comment, currentLevel, hideReplyForm, isReplying, setIsReplying } =
		useComment();
	const {
		addComment,
		setUniqueComments,
		replaceComment,
		comments: AllComments,
		getCommentsByParentId,
	} = useComments();

  const { author, numReplies } = comment;

  	const replies = useMemo(() => {
		return getCommentsByParentId(comment._id); // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [AllComments]);

	const [isShowReplies, setIsShowReplies] = useState(false);
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

	const { isLoading, mutate } = useMutation(getChildComments, {
		onSuccess: ({ comments }) => {
			setUniqueComments(comments);
			replaceComment({ ...comment, isLoadedChild: true }, comment._id);
		},
	});

	const showReplies = () => {
		setIsShowReplies(true);
		if (!comment?.isLoadedChild) mutate(comment._id);
	};

	const hideReplies = () => {
		setIsShowReplies(false);
	};

	const toggleReply = () => {
		if (isShowReplies) {
			hideReplies();
			return;
		}
		showReplies();
	};

	const initialContent = useMemo(() => {
		return {
			blocks: [
				{
					key: genKey(),
					text: `@${author.username} `,
					type: 'unstyled',
					depth: 0,
					inlineStyleRanges: [],
					entityRanges: [
						{
							offset: 0,
							length: author.username.length + 1,
							key: 0,
						},
					],
					data: {},
				},
			],
			entityMap: {
				0: {
					type: 'mention',
					mutability: 'IMMUTABLE',
					data: {
						mention: {
							_id: author._id,
							name: author.username,
							avatar: author.avatar,
							username: author.name,
							id: author._id,
						},
					},
				},
			},
		};
	}, [author]);

	return (
		<div className="flex">
			<div className="flex w-9 justify-center">
				<Line />
			</div>
			<div className="relative flex-1">
				{currentLevel < MAX_LEVEL && (
					<>
						{numReplies - newReplies.length > 0 && (
							<>
								<Button
									onClick={toggleReply}
									variant="text"
									rounded
									size="sm"
									startIcon={
										<ArrowDropDownIcon
											with={48}
											height={48}
											className={clsx(
												isShowReplies &&
													'rotate-180 transform',
											)}
										/>
									}
								>
									{isShowReplies
										? `Hide ${
												numReplies - newReplies.length
										  } replies`
										: `Show ${
												numReplies - newReplies.length
										  } replies`}
								</Button>
								{!isShowReplies && (
									<Layer
										className={clsx(
											'absolute left-0 top-0 h-9 w-9 -translate-x-full',
											isReplying && '!bg-transparent',
											newReplies.length > 0 &&
												'!bg-transparent',
										)}
									>
										<div className="absolute left-0 top-0 z-10 -ml-[1.25px] -mt-[1.25px] translate-x-full">
											<Corner />
										</div>
									</Layer>
								)}
							</>
						)}
						{isShowReplies && (
							<div className="flex flex-col gap-4 pt-2">
								{replies?.map((reply, index) => (
									<div
										key={reply._id}
										className={
											index === replies.length - 1
												? 'relative'
												: ''
										}
									>
										<Comment
											comment={reply}
											className="!border-transparent !p-0 !pl-2"
											currentLevel={currentLevel + 1}
											onUpdate={updateNewReply}
											onDelete={deleteNewReply}
											onClickReply={() => {
												setIsReplying(true);
											}}
										/>
										{index === replies.length - 1 &&
											!isReplying && (
												<Layer className="absolute left-0 top-0 h-full w-9 -translate-x-full" />
											)}
									</div>
								))}
								{isLoading && (
									<div className="my-2">
										<CommentSkeleton />
									</div>
								)}
							</div>
						)}

						{!isShowReplies && newReplies.length > 0 && (
							<div className="flex flex-col gap-4 pt-2">
								{newReplies?.map((comment, index) => (
									<div
										key={comment._id}
										className={
											index === newReplies.length - 1
												? 'relative'
												: ''
										}
									>
										<Comment
											key={comment._id}
											comment={comment}
											className="!border-transparent !p-0"
											currentLevel={currentLevel + 1}
											onUpdate={updateNewReply}
											onDelete={deleteNewReply}
											onClickReply={() => {
												setIsReplying(true);
											}}
										/>
										{index === newReplies.length - 1 &&
											!isReplying && (
												<Layer className="absolute left-0 top-0 h-full w-9 -translate-x-full" />
											)}
									</div>
								))}
							</div>
						)}
					</>
				)}
				{isReplying && (
					<div className="relative mt-2">
						<CommentCreator
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
							<div className="absolute left-0 top-0 z-10 -ml-[1.25px] -mt-[1.25px] translate-x-full">
								<Corner />
							</div>
						</Layer>
					</div>
				)}
			</div>
		</div>
	);
}

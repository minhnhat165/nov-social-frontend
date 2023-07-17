import {
	createContext,
	memo,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

import { CommentEditMode } from './CommentEditMode';
import { CommentHeader } from './CommentHeader';
import { CommentPhoto } from './CommentPhoto';
import Layer from 'components/Layout/Layer';
import { RepliesZone } from './RepliesZone';
import { RichTextEditor } from 'components/DataEntry';
import { SCREEN_MODE } from 'constants/app';
import { ToolBar } from './ToolBar';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const MAX_LEVEL = 2;

export const COMMENT_STATUS = {
	PENDING: 'pending',
	APPROVED: 'approved',
	REJECTED: 'rejected',
};

const CommentContext = createContext({
	comment: {},
	isReplying: false,
	rootCommentId: '',
	currentLevel: 0,
	handleClickReply: () => {},
	hideReplyForm: () => {},
	setIsEditing: () => {},
	onDelete: () => {},
	onUpdate: () => {},
	setIsReplying: () => {},
	handleToggleLike: () => {},
});

export const useComment = () => useContext(CommentContext);

const Comment = ({
	comment,
	className,
	currentLevel = 0,
	onUpdate,
	onDelete,
	onClickReply,
}) => {
	const [isReplying, setIsReplying] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [searchParams] = useSearchParams();
	const isActivated = comment._id === searchParams.get('commentId');
	const screenMode = useSelector((state) => state.app.screenMode);

	useEffect(() => {
		if (isActivated) {
			const element = document.getElementById(comment._id);
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'nearest',
			});
		}
	}, [comment._id, isActivated]);

	const replyZoneRef = useRef(null);
	const handleClickReply = () => {
		if (currentLevel === MAX_LEVEL) {
			onClickReply && onClickReply(comment);
			return;
		}
		replyZoneRef.current?.reply(comment);
		setIsReplying(true);
	};

	const hideReplyForm = () => {
		setIsReplying(false);
	};

	if (isEditing) {
		return (
			<CommentEditMode
				comment={comment}
				setIsEditing={setIsEditing}
				onUpdate={onUpdate}
			/>
		);
	}

	return (
		<CommentContext.Provider
			value={{
				comment,
				currentLevel: currentLevel || 0,
				isReplying,
				setIsReplying,
				handleClickReply,
				hideReplyForm,
				setIsEditing,
				onDelete,
				onUpdate,
			}}
		>
			<Layer
				id={comment._id}
				className={clsx(
					'border-normal relative border !bg-transparent',
					className,
				)}
			>
				<div
					className={clsx(
						'relative rounded-xl p-2 pb-0',
						isActivated ? '!bg-[#2a4158]' : '!bg-transparent',
					)}
				>
					{currentLevel !== 0 && (
						<div className="absolute left-0 top-0 z-10 -ml-[1.25px] -mt-[1.25px] -translate-x-full">
							<Corner />
						</div>
					)}
					<div className={`group items-center gap-2`}>
						<CommentHeader />
						<div className="flex">
							<div className="mr-2 flex w-9 justify-center">
								{(comment.numReplies > 0 || isReplying) && (
									<Line />
								)}
							</div>
							<div className="comment-content relative flex-1 pt-2">
								{comment?.content && (
									<RichTextEditor
										readOnly={true}
										initial={comment.content}
										fontSizeDefault={
											screenMode ===
											SCREEN_MODE.MOBILE.name
												? 0.75
												: 1
										}
										fontSizeReduced={
											screenMode ===
											SCREEN_MODE.MOBILE.name
												? 0.75
												: 1
										}
									/>
								)}
								{!!comment?.photos?.length && (
									<CommentPhoto photos={comment.photos} />
								)}
								<ToolBar />
							</div>
						</div>
					</div>
				</div>
				{
					// (isReplying || comment.numReplies > 0) &&
					currentLevel !== MAX_LEVEL && (
						<RepliesZone ref={replyZoneRef} />
					)
				}
			</Layer>
		</CommentContext.Provider>
	);
};

const commentMemo = memo(Comment);
const Corner = ({ height = 26, width = 26 }) => (
	<div
		className={clsx(
			'rounded-bl-lg border-b border-l-2 border-slate-200 dark:border-dark-600',
		)}
		style={{
			width: `${width}px`,
			height: `${height}px`,
		}}
	/>
);

const Line = ({ isVertical = true }) => (
	<Layer
		level={3}
		className={clsx(
			'rounded-none',
			isVertical ? 'h-full w-[2px]' : 'h-[2px] w-full',
		)}
	/>
);

export { commentMemo as Comment, Corner, Line };

import { createContext, memo, useContext, useState } from 'react';

import { CommentEditMode } from './CommentEditMode';
import { CommentHeader } from './CommentHeader';
import { Image } from 'components/DataDisplay';
import Layer from 'components/Layout/Layer';
import { RepliesZone } from './RepliesZone';
import { RichTextEditor } from 'components/DataEntry';
import { ToolBar } from './ToolBar';
import clsx from 'clsx';

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

	const handleClickReply = () => {
		if (currentLevel === MAX_LEVEL) {
			onClickReply && onClickReply();
			return;
		}
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
				className={clsx(
					'border-normal relative border !bg-transparent p-2',
					className,
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
							{(comment.numReplies > 0 || isReplying) && <Line />}
						</div>
						<div className="comment-content flex-1 pt-2">
							{comment?.content && (
								<RichTextEditor
									readOnly={true}
									initial={comment.content}
									fontSizeDefault={1}
									fontSizeReduced={1}
								/>
							)}
							{!!comment?.photos?.length && (
								<div className="mt-2 max-w-[120px] overflow-hidden rounded">
									<Image src={comment.photos[0].url} />
								</div>
							)}
							<ToolBar />
						</div>
					</div>
				</div>
				{currentLevel !== MAX_LEVEL && <RepliesZone />}
			</Layer>
		</CommentContext.Provider>
	);
};

const commentMemo = memo(Comment);
const Corner = () => (
	<div className="h-[18px] w-[18px] rounded-bl-xl border-b border-l border-slate-200 dark:border-dark-600" />
);

const Line = ({ isVertical = true }) => (
	<Layer
		level={3}
		className={clsx(isVertical ? 'h-full w-[1px]' : 'h-[1px] w-full')}
	/>
);

export { commentMemo as Comment, Corner, Line };

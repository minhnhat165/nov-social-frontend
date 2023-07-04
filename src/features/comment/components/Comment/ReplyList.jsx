import { Comment } from './Comment';
import Layer from 'components/Layout/Layer';
import clsx from 'clsx';

export function ReplyList({
	comments,
	currentLevel,
	updateNewReply,
	deleteNewReply,
	handleClickReply,
	isReplying,
	isActivated,
}) {
	return (
		<div className="flex flex-col gap-4 pt-2">
			{comments?.map((reply, index) => (
				<div
					key={reply._id}
					className={index === comments.length - 1 ? 'relative' : ''}
				>
					<Comment
						comment={reply}
						className="!border-transparent !px-2"
						currentLevel={currentLevel + 1}
						onUpdate={updateNewReply}
						onDelete={deleteNewReply}
						onClickReply={handleClickReply}
						isActivated={isActivated}
					/>
					{index === comments.length - 1 && !isReplying && (
						<Layer
							className={clsx(
								'absolute  left-0 top-0 h-full w-9 -translate-x-full',
								isActivated && '!bg-[#2a4158]',
							)}
						/>
					)}
				</div>
			))}
		</div>
	);
}

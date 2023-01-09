import React, { memo, useMemo } from 'react';
import checkIncludesUser from '../../utils/checkIncludesUser';
import DiffTime from '../DiffTime';

const CommentActionBar = ({ comment, onReply, onLike }) => {
	const isLiked = useMemo(() => {
		return checkIncludesUser(comment.likes);
	}, [comment.likes]);
	return (
		<div className="flex justify-start">
			<div className="flex shrink-0 gap-2 text-sm">
				<span
					onClick={() => onLike()}
					className="cursor-pointer transition-all dark:hover:text-dark-text-bold"
				>
					{isLiked ? (
						<span>
							<i className="fa-solid fa-heart text-red-500"></i> Unlike
						</span>
					) : (
						<span>
							<i className="fa-solid fa-heart"></i> Like
						</span>
					)}
				</span>
				<span
					onClick={() => onReply(comment)}
					className="cursor-pointer transition-all dark:hover:text-dark-text-bold"
				>
					<i className="fa-solid fa-comment"></i> reply
				</span>
				<DiffTime startDate={comment.createdAt} className="font-normal" />
			</div>
		</div>
	);
};

export default memo(CommentActionBar);

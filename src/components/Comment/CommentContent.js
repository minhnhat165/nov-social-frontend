import React from 'react';
import { Link } from 'react-router-dom';
import Img from '../Img';

const CommentContent = ({ comment }) => {
	return (
		<div className="max-w-[calc(100%_-_40px)] break-all">
			{comment.text && (
				<div className="mt-1 min-w-[80px] rounded-xl px-2 py-2 dark:bg-dark-light">
					{comment?.tag && (
						<Link
							to={`/profile/${comment.tag._id}`}
							className="dark:hover:text-primary mr-1 dark:text-dark-text-bold"
						>
							@{comment.tag.name}
						</Link>
					)}
					<span className="w-auto break-words">{comment.text}</span>
				</div>
			)}
			{comment.image && (
				<div className="mt-2 max-w-[120px] overflow-hidden rounded-md">
					<Img
						clickAble
						src={comment.image}
						className="max-w-[120px] object-cover"
					/>
				</div>
			)}
		</div>
	);
};

export default CommentContent;

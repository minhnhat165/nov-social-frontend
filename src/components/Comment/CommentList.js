import { AnimatePresence } from 'framer-motion';
import React from 'react';
import FadeInZoom from '../Animate/FadeInZoom';

import CommentCard from './CommentCard';

const CommentList = ({ comments }) => {
	return (
		<>
			{comments?.length > 0 && (
				<div className="flex w-full flex-col gap-4 transition-all">
					<AnimatePresence>
						{comments.map((comment) => (
							<FadeInZoom key={comment._id}>
								<CommentCard key={comment._id} comment={comment} />
							</FadeInZoom>
						))}
					</AnimatePresence>
				</div>
			)}
		</>
	);
};

export default React.memo(CommentList);

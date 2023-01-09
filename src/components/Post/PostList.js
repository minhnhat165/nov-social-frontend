import { AnimatePresence } from 'framer-motion';
import PostCard from './PostCard';

const PostList = ({ postList = [] }) => {
	return (
		<>
			{postList.length > 0 && (
				<div className="flex flex-col">
					<AnimatePresence>
						{postList.map((post) => (
							<div key={post._id} className="mb-4">
								<PostCard post={post} />
							</div>
						))}
					</AnimatePresence>
				</div>
			)}
		</>
	);
};

export default PostList;

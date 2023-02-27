import { Avatar, Card } from 'components/DataDisplay';
import { Poll, PostContent, PostFooter, PostHeader } from './components';
import { createContext, memo, useContext } from 'react';

import PreviewBox from '../PostEditor/components/PreviewBox';

const PostContext = createContext({
	post: {},
	postId: '',
	author: {},
	photos: [],
	content: '',
	createdAt: '',
	poll: {},
});

export const usePost = () => useContext(PostContext);

const Post = ({ post }) => {
	const { author, photos, content, createdAt, poll, _id: postId } = post;
	return (
		<PostContext.Provider
			value={{
				post,
				postId,
				author,
				photos,
				content,
				createdAt,
				poll,
			}}
		>
			<Card className="flex pt-4">
				<div className="px-2 pl-4">
					<Avatar src={author.avatar} />
				</div>
				<div className="flex flex-1 flex-col gap-3 pr-4">
					<PostHeader />
					<div>
						{content && <PostContent />}
						{poll && <Poll />}
						<PreviewBox previews={photos} />
					</div>
					<PostFooter />
				</div>
			</Card>
		</PostContext.Provider>
	);
};

Post.propTypes = {};

export default memo(Post);

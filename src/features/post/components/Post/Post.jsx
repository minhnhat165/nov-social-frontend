import 'react-awesome-lightbox/build/style.css';

import { Poll, PostContent, PostFooter, PostHeader } from './components';
import { createContext, memo, useContext, useState } from 'react';
import { useHidePost, useLikePost, useSavePost } from 'features/post/hooks';

import { Card } from 'components/DataDisplay';
import { PostEditMode } from './PostEditMode';
import { PostHiddenMode } from './PostHiddenMode';
import { PostPhoto } from './components/PostPhoto/PostPhoto';
import PropTypes from 'prop-types';

const PostContext = createContext({
	post: {},
	postId: '',
	author: {},
	photos: [],
	content: '',
	createdAt: '',
	poll: {},
	handleUnHidePost: () => {},
	handleHidePost: () => {},
	setIsEditing: () => {},
	onDeletePost: () => {},
	handleLike: () => {},
	handleSavePost: () => {},
	increaseNumComments: () => {},
	decreaseNumComments: () => {},
});

export const usePost = () => useContext(PostContext);

const Post = ({ post: initial, onDeletePost, onUpdatePost }) => {
	const [post, setPost] = useState(initial);
	const {
		author,
		photos,
		content,
		createdAt,
		poll,
		_id: postId,
		isLiked,
		likesCount,
	} = post;
	const [isEditing, setIsEditing] = useState(false);
	const [isHidden, setIsHidden] = useState(false);

	const handleUpDatePost = (updatedPost) => {
		setPost((prev) => ({ ...prev, ...updatedPost }));
		onUpdatePost(updatedPost);
	};

	const hidePost = useHidePost(isHidden);
	const handleHidePost = () => {
		setIsHidden(true);
		hidePost.mutate(postId);
	};
	const handleUnHidePost = () => {
		setIsHidden(false);
		hidePost.mutate(postId);
	};

	const savePost = useSavePost(post?.isSaved, {
		onSuccess: () => {
			onUpdatePost({
				...post,
				isSaved: !post.isSaved,
			});
		},
	});

	const handleSavePost = () => {
		savePost.mutate(postId);
	};

	const { mutate } = useLikePost(isLiked);

	const increaseNumComments = () => {
		setPost((prev) => ({
			...prev,
			numComments: prev.numComments + 1,
		}));
	};

	const decreaseNumComments = (num = 1) => {
		setPost((prev) => ({
			...prev,
			numComments: prev.numComments - num,
		}));
	};

	const handleLike = (postId) => {
		mutate(postId);
		onUpdatePost({
			_id: postId,
			isLiked: !isLiked,
			likesCount: isLiked ? likesCount - 1 : likesCount + 1,
		});

		setPost((prev) => ({
			...prev,
			isLiked: !isLiked,
			likesCount: isLiked ? likesCount - 1 : likesCount + 1,
		}));
	};

	if (isHidden) return <PostHiddenMode onUnHidePost={handleUnHidePost} />;

	if (isEditing)
		return (
			<PostEditMode
				post={post}
				onUpdatePost={handleUpDatePost}
				setIsEditing={setIsEditing}
			/>
		);

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
				setIsEditing,
				handleHidePost,
				handleUnHidePost,
				handleSavePost,
				onDeletePost,
				handleLike: () => handleLike(postId),
				increaseNumComments,
				decreaseNumComments,
			}}
		>
			<Card className="flex flex-col overflow-hidden pt-4 shadow">
				<PostHeader />
				<div className="mt-2 flex flex-1 flex-col gap-3 pl-16 pr-4">
					<div>
						{content && <PostContent />}
						{poll && <Poll />}
						<PostPhoto photos={photos} />
					</div>
				</div>
				<PostFooter />
			</Card>
		</PostContext.Provider>
	);
};

Post.propTypes = {
	post: PropTypes.object.isRequired,
};

export default memo(Post);

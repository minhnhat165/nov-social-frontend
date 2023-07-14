import 'react-awesome-lightbox/build/style.css';

import { Poll, PostContent, PostFooter, PostHeader } from './components';
import { createContext, memo, useContext, useEffect, useState } from 'react';
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

const Post = ({ post: initial, onDeletePost, onUpdatePost = () => {} }) => {
	const [post, setPost] = useState(initial);
	const {
		author,
		photos,
		content,
		createdAt,
		poll,
		_id: postId,
		isLiked,
		likesCount = 0,
	} = post;
	const [isEditing, setIsEditing] = useState(false);
	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		setPost(initial);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initial._id]);

	const handleUpDatePost = (updatedData) => {
		setPost((prev) => ({ ...prev, ...updatedData }));
		onUpdatePost({
			_id: postId,
			...updatedData,
		});
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
			handleUpDatePost({
				isSaved: !post.isSaved,
			});
		},
	});

	const handleSavePost = () => {
		savePost.mutate(postId);
	};

	const { mutate, isLoading } = useLikePost(isLiked);

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
		if (isLoading) return;
		handleUpDatePost({
			isLiked: !isLiked,
			likesCount: isLiked ? likesCount - 1 : likesCount + 1,
		});
		mutate(postId);
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
			<Card
				responsive
				className="flex flex-col overflow-hidden pt-2 shadow sm:pt-4"
			>
				<PostHeader />
				<div className="mt-2 flex flex-1 flex-col gap-3 pl-[60px] pr-2 sm:pl-16 sm:pr-4">
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
export const PostSkeleton = () => {
	return (
		<Card
			responsive
			className="flex flex-col overflow-hidden p-2 shadow sm:p-4 "
		>
			<div className="flex gap-2">
				<div className="h-10 w-10 animate-pulse rounded-full bg-dark-300" />
				<div>
					<div className="mt-2 h-3 w-40 animate-pulse rounded-full bg-dark-300" />
					<div className="mt-2 h-2 w-20 animate-pulse rounded-full bg-dark-300" />
				</div>
			</div>

			<div className="mt-2 pl-12">
				<div className="mt-2 h-4 w-[90%] animate-pulse rounded-full bg-dark-300" />
				<div className="mt-2 h-4 w-40 animate-pulse rounded-full bg-dark-300" />
			</div>
			<div className="ml-auto mt-4 flex gap-2 sm:gap-4">
				<div className="mt-2 h-8 w-[108px] animate-pulse rounded-full bg-dark-300" />
				<div className="mt-2 h-8 w-[108px] animate-pulse rounded-full bg-dark-300" />
				<div className="mt-2 h-8 w-[108px] animate-pulse rounded-full bg-dark-300" />
			</div>
		</Card>
	);
};
Post.propTypes = {
	post: PropTypes.object.isRequired,
};

export default memo(Post);

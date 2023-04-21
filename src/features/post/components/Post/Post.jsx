import 'react-awesome-lightbox/build/style.css';

import { Avatar, Card, IconWrapper } from 'components/DataDisplay';
import { Poll, PostContent, PostFooter, PostHeader } from './components';
import { cloneObject, getModifiedFields } from 'utils';
import { createContext, memo, useContext, useState } from 'react';
import {
	useHidePost,
	useLikePost,
	useSavePost,
	useUpdatePost,
} from 'features/post/hooks';

import { ArchiveBoxXMarkIcon } from 'components/Icon';
import { Button } from 'components/Action';
import Lightbox from 'react-awesome-lightbox';
import PostEditor from '../PostEditor';
import PreviewBox from '../PostEditor/components/PreviewBox';
import PropTypes from 'prop-types';
import { Text } from 'components/Typography';
import { editorModes } from '../PostEditor/PostEditor';
import { getOriginalImageByPublicId } from 'utils/cloundinaryUtils';

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

	if (isHidden) return <PostHidden onUnHidePost={handleUnHidePost} />;

	if (isEditing)
		return (
			<PostEdit
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
				<div className="flex gap-2 px-2 pl-4">
					<Avatar src={author.avatar} />
					<PostHeader />
				</div>
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

function PostHidden({ onUnHidePost }) {
	return (
		<Card className="flex h-14 items-center justify-between px-4 ">
			<div className="flex items-center gap-2">
				<IconWrapper>
					<ArchiveBoxXMarkIcon className="text-normal" />
				</IconWrapper>
				<Text level={2}>Post hidden</Text>
			</div>
			<Button onClick={onUnHidePost} size="sm" color="secondary" rounded>
				Undo
			</Button>
		</Card>
	);
}

function PostEdit({ post, setIsEditing, onUpdatePost }) {
	const { mutateAsync } = useUpdatePost({
		onSuccess: (data) => {
			setIsEditing(false);
			onUpdatePost(data);
		},
	});

	return (
		<div className="rounded-xl border border-primary-500">
			<PostEditor
				autoFocus={true}
				initial={cloneObject(post)} // clone to avoid mutating the original post
				mode={editorModes.EDIT}
				onCanceled={() => setIsEditing(false)}
				onSubmit={(newPost) => {
					mutateAsync({
						_id: post._id,
						...getModifiedFields(post, newPost),
					});
				}}
			/>
		</div>
	);
}

function PostPhoto({ photos }) {
	const [currentImage, setCurrentImage] = useState(0);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const handleImageClick = (index) => {
		setCurrentImage(index);
		setIsLightboxOpen(true);
	};

	return (
		<div>
			<PreviewBox previews={photos} onClick={handleImageClick} />
			{isLightboxOpen && (
				<Lightbox
					startIndex={currentImage}
					image={photos.length === 1 ? photos[0].url : null}
					images={
						photos.length === 1
							? null
							: photos.map((photo) => ({
									url: getOriginalImageByPublicId(
										photo.publicId,
									),
							  }))
					}
					onClose={() => setIsLightboxOpen(false)}
				/>
			)}
		</div>
	);
}

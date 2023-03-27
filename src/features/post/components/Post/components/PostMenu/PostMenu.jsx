import {
	BookmarkIcon,
	EyeIcon,
	FlagIcon,
	PencilSquareIcon,
	TrashIcon,
	UserMinusIcon,
} from 'components/Icon';
import { cloneObject, getModifiedFields } from 'utils';
import { useDeletePost, useUpdatePost } from 'features/post/hooks';

import { Button } from 'components/Action';
import { Menu } from 'components/Navigation';
import { Modal } from 'components/OverLay';
import PostEditor from 'features/post/components/PostEditor';
import { Text } from 'components/Typography';
import { toast } from 'react-hot-toast';
import { usePost } from '../../Post';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const PostMenu = () => {
	const { author, handleHidePost, setIsEditing } = usePost();
	const userId = useSelector((state) => state.auth.user._id);
	const isAuthor = author._id === userId;
	return (
		<Menu>
			{!isAuthor && (
				<Menu.Item icon={<BookmarkIcon />}>Save post</Menu.Item>
			)}

			{isAuthor && (
				<>
					<Menu.Item
						onClick={() => setIsEditing(true)}
						icon={<PencilSquareIcon />}
					>
						Edit
					</Menu.Item>
					<DeletePost />
				</>
			)}
			{!isAuthor && (
				<>
					<Menu.Item onClick={handleHidePost} icon={<EyeIcon />}>
						Hide post
					</Menu.Item>
					<Menu.Item
						onClick={() => setIsEditing(true)}
						icon={<UserMinusIcon />}
					>
						Hide all from {author.name}
					</Menu.Item>
					<Menu.Item icon={<FlagIcon />}>Report post</Menu.Item>
				</>
			)}
		</Menu>
	);
};

function DeletePost() {
	const [open, setOpen] = useState(false);
	const { postId } = usePost();
	const { mutate, isLoading } = useDeletePost({
		onSuccess: () => {
			toast.success('Post deleted successfully');
			handleClose();
		},
	});

	const handleClose = () => setOpen(false);

	return (
		<>
			<Menu.Item onClick={() => setOpen(true)} icon={<TrashIcon />}>
				Delete
			</Menu.Item>
			<Modal open={open} onClose={handleClose}>
				<Modal.Panel>
					<Modal.Header>Delete this post?</Modal.Header>

					<Modal.Body className="w-[490px]">
						<Text>
							Are you sure you want to delete this post? This
							action cannot be undone.
						</Text>
					</Modal.Body>
					<Modal.Footer className="justify-end gap-2">
						<Button
							color="secondary"
							className="w-full sm:w-auto"
							onClick={handleClose}
						>
							Cancel
						</Button>
						<Button
							loading={isLoading}
							className="w-full sm:w-auto"
							onClick={() => mutate(postId)}
						>
							Delete
						</Button>
					</Modal.Footer>
				</Modal.Panel>
			</Modal>
		</>
	);
}

function EditPost() {
	const [open, setOpen] = useState(false);
	const { post } = usePost();
	const { mutate } = useUpdatePost({
		onSuccess: () => {
			toast.success('Post updated successfully');
			handleClose();
		},
	});

	const handleClose = () => setOpen(false);
	return (
		<>
			<Menu.Item
				onClick={() => setOpen(true)}
				icon={<PencilSquareIcon />}
			>
				Edit
			</Menu.Item>
			<Modal open={open} onClose={handleClose}>
				<Modal.Panel>
					<Modal.Header>Edit post</Modal.Header>
					<Modal.Body className="my-0 w-[600px] px-0 !pb-0">
						<PostEditor
							autoFocus
							initial={cloneObject(post)} // clone to avoid mutating the original post
							onSubmit={(newPost) => {
								mutate({
									_id: post._id,
									...getModifiedFields(post, newPost),
								});
							}}
						/>
					</Modal.Body>
				</Modal.Panel>
			</Modal>
		</>
	);
}

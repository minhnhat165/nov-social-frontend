import {
	BookmarkIcon,
	BookmarkSlashIcon,
	EyeIcon,
	FlagIcon,
	PencilSquareIcon,
	TrashIcon,
} from 'components/Icon';

import { Button } from 'components/Action';
import { Menu } from 'components/Navigation';
import { Modal } from 'components/OverLay';
import { Text } from 'components/Typography';
import { toast } from 'react-hot-toast';
import { useDeletePost } from 'features/post/hooks';
import { usePost } from '../../Post';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const PostMenu = () => {
	const { author, handleHidePost, handleSavePost, setIsEditing, post } =
		usePost();
	const userId = useSelector((state) => state.auth.user._id);
	const isAuthor = author._id === userId;
	return (
		<Menu>
			<Menu.Trigger size="sm" />
			<Menu.Content className="flex max-h-[200px] w-60 flex-col gap-2 p-2 drop-shadow-[0_0_6px_rgba(0,0,0,0.2)] dark:shadow-2xl">
				<Menu.Item
					onClick={handleSavePost}
					icon={
						post.isSaved ? <BookmarkSlashIcon /> : <BookmarkIcon />
					}
				>
					{post.isSaved ? 'Unsave post' : 'Save post'}
				</Menu.Item>
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
						<Menu.Item icon={<FlagIcon />}>Report post</Menu.Item>
					</>
				)}
			</Menu.Content>
		</Menu>
	);
};

function DeletePost() {
	const [open, setOpen] = useState(false);
	const { postId, onDeletePost } = usePost();
	const { mutate, isLoading } = useDeletePost({
		onSuccess: () => {
			toast.success('Post deleted successfully');
			handleClose();
			onDeletePost(postId);
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

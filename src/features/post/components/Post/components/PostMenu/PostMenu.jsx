import {
	BookmarkIcon,
	BookmarkSlashIcon,
	EyeIcon,
	FlagIcon,
	PencilSquareIcon,
	TrashIcon,
} from 'components/Icon';

import { AlertDialog } from 'components/OverLay';
import { Menu } from 'components/Navigation';
import { toast } from 'react-hot-toast';
import { useDeletePost } from 'features/post/hooks';
import { useModal } from 'hooks/useModal';
import { usePost } from '../../Post';
import { useSelector } from 'react-redux';

export const PostMenu = () => {
	const { close, isOpen, open } = useModal();
	const { postId, onDeletePost } = usePost();
	const { mutate, isLoading } = useDeletePost({
		onSuccess: () => {
			toast.success('Post deleted successfully');
			onDeletePost(postId);
		},
	});
	const { author, handleHidePost, handleSavePost, setIsEditing, post } =
		usePost();
	const userId = useSelector((state) => state.auth.user?._id);
	const isAuthor = author?._id === userId;
	return (
		<>
			<Menu>
				<Menu.Trigger size="sm" />
				<Menu.Content className="flex max-h-[200px] w-60 flex-col gap-2 p-2 drop-shadow-[0_0_6px_rgba(0,0,0,0.2)] dark:shadow-2xl">
					<Menu.Item
						onClick={handleSavePost}
						icon={
							post.isSaved ? (
								<BookmarkSlashIcon />
							) : (
								<BookmarkIcon />
							)
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
							{/* <DeletePost /> */}
							<Menu.Item onClick={open} icon={<TrashIcon />}>
								Delete
							</Menu.Item>
						</>
					)}
					{!isAuthor && (
						<>
							<Menu.Item
								onClick={handleHidePost}
								icon={<EyeIcon />}
							>
								Hide post
							</Menu.Item>
							<Menu.Item icon={<FlagIcon />}>
								Report post
							</Menu.Item>
						</>
					)}
				</Menu.Content>
			</Menu>
			<AlertDialog
				close={close}
				bodyText="Are you sure you want to delete this post? This action cannot be undone."
				headerText="Delete this post?"
				isLoading={isLoading}
				isOpen={isOpen}
				onOk={() => mutate(postId)}
				okText="Delete"
			/>
		</>
	);
};

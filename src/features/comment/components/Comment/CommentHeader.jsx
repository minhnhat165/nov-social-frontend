import { COMMENT_STATUS, useComment } from './Comment';
import { useMemo, useState } from 'react';

import { Avatar } from 'components/DataDisplay';
import { Button } from 'components/Action';
import { Menu } from 'components/Navigation';
import { Modal } from 'components/OverLay';
import { Text } from 'components/Typography';
import { deleteComment } from 'api/commentApi';
import { getDiffTime } from 'utils';
import { toast } from 'react-hot-toast';
import { useComments } from 'features/comment/context/CommentsContext';
import { useMutation } from 'react-query';
import { usePost } from 'features/post/components/Post/Post';
import { useSelector } from 'react-redux';

export function CommentHeader() {
	const { comment } = useComment();

	const { post } = usePost();
	const { author, createdAt = null } = comment;
	const timeDisplay = useMemo(() => {
		if (!createdAt) return '';
		return getDiffTime(createdAt);
	}, [createdAt]);

	const isPostAuthor = post.author._id === author._id;

	return (
		<div className="flex">
			<Avatar src={author.avatar} size="md" />
			<div className="ml-2 flex flex-1 flex-col">
				<div className="flex items-center gap-1">
					<Text bold level={0} size="sm">
						{author.name}
					</Text>

					{isPostAuthor ? (
						<>
							<Text
								level={3}
								className="pb-2 leading-3"
								size="lg"
								bold
							>
								.
							</Text>
							<Text
								level={3}
								size="xs"
								className="!text-yellow-500"
							>
								Author
							</Text>
						</>
					) : null}
				</div>
				<div className="flex items-center gap-1">
					<Text level={3} size="sm">
						@{author.username}
					</Text>

					{comment.status !== COMMENT_STATUS.PENDING &&
						comment.status !== COMMENT_STATUS.REJECTED && (
							<>
								<Text
									level={3}
									className="pb-2 leading-3"
									size="lg"
									bold
								>
									.
								</Text>
								<Text level={3} size="sm">
									{timeDisplay}
								</Text>
							</>
						)}
				</div>
			</div>
			<Menu>
				<div
					className={`ml-auto opacity-0 transition-all 
            duration-300 ease-in-out group-hover:opacity-100`}
				>
					<Menu.Trigger size="sm" />
				</div>
				<Menu.Content className="min-w-[160px] p-2">
					<MenuItems />
				</Menu.Content>
			</Menu>
		</div>
	);
}

const MenuItems = () => {
	const { comment, setIsEditing } = useComment();
	const { post } = usePost();
	const userId = useSelector((state) => state.auth.user._id);
	const isCommentAuthor = comment.author._id === userId;
	const isPostAuthor = post.author._id === userId;

	return (
		<>
			{(isPostAuthor || isCommentAuthor) && <DeleteComment />}
			{isCommentAuthor ? (
				<Menu.Item
					onClick={() => {
						setIsEditing(true);
					}}
				>
					Edit
				</Menu.Item>
			) : (
				<>
					<Menu.Item>Hide comment</Menu.Item>
					<Menu.Item>Report comment</Menu.Item>
				</>
			)}
		</>
	);
};

function DeleteComment() {
	const [open, setOpen] = useState(false);
	const { comment, onDelete } = useComment();
	const { deleteComment: deleteLocalComment } = useComments();
	const { mutate, isLoading } = useMutation(deleteComment, {
		onSuccess: (data, variables) => {
			deleteLocalComment(variables);
			onDelete && onDelete(variables);
			setOpen(false);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleConfirmDelete = () => {
		mutate(comment._id);
	};

	const handleClose = () => setOpen(false);

	return (
		<>
			<Menu.Item onClick={() => setOpen(true)}>Delete</Menu.Item>
			<Modal open={open} onClose={handleClose}>
				<Modal.Panel>
					<Modal.Header>Delete comment?</Modal.Header>
					<Modal.Body className="w-[490px]">
						<Text>
							Are you sure you want to delete this comment? This
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
							onClick={handleConfirmDelete}
						>
							Delete
						</Button>
					</Modal.Footer>
				</Modal.Panel>
			</Modal>
		</>
	);
}

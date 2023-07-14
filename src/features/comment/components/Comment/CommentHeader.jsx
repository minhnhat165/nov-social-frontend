import { Avatar, TimeDisplay } from 'components/DataDisplay';
import { COMMENT_STATUS, useComment } from './Comment';

import { AlertDialog } from 'components/OverLay';
import { Menu } from 'components/Navigation';
import { Text } from 'components/Typography';
import { deleteComment } from 'api/commentApi';
import { toast } from 'react-hot-toast';
import { useComments } from 'features/comment/context';
import { useModal } from 'hooks/useModal';
import { useMutation } from 'react-query';
import { usePost } from 'features/post/components/Post/Post';
import { useSelector } from 'react-redux';

export function CommentHeader() {
	const { comment } = useComment();

	const { post } = usePost();
	const { author, createdAt = null } = comment;

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
								className="pb-2 text-lg leading-3"
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
				<div className="flex flex-wrap items-center gap-1">
					<Text level={3} className="text-xs sm:text-sm">
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
									<TimeDisplay date={createdAt} />
								</Text>
							</>
						)}
				</div>
			</div>
			<CommentMenu />
		</div>
	);
}

const CommentMenu = () => {
	const userId = useSelector((state) => state.auth?.user?._id);
	const { post } = usePost();
	const { comment, setIsEditing, onDelete } = useComment();
	const { deleteComment: deleteLocalComment } = useComments();
	const { close, isOpen, open } = useModal();
	const { mutate, isLoading } = useMutation(deleteComment, {
		onSuccess: (data, variables) => {
			deleteLocalComment(variables);
			onDelete && onDelete(variables);
			close();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const isCommentAuthor = comment.author._id === userId;
	const isPostAuthor = post.author._id === userId;
	return (
		<>
			<Menu>
				<div
					className={`ml-auto transition-all duration-300 
              ease-in-out group-hover:opacity-100 sm:opacity-0`}
				>
					<Menu.Trigger size="sm" />
				</div>
				<Menu.Content className="min-w-[160px] p-2">
					{(isPostAuthor || isCommentAuthor) && (
						<Menu.Item onClick={open}>Delete</Menu.Item>
					)}
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
				</Menu.Content>
			</Menu>
			<AlertDialog
				close={close}
				bodyText="Are you sure you want to delete this post? This action cannot be undone."
				headerText="Delete this post?"
				isLoading={isLoading}
				isOpen={isOpen}
				onOk={() => mutate(comment._id)}
				okText="Delete"
			/>
		</>
	);
};

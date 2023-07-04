import { COMMENT_STATUS, useComment } from '.';

import { IconWrapper } from 'components/DataDisplay';
import { SparklesIcon } from 'components/Icon';
import { Spinner } from 'components/Loading';
import { Text } from 'components/Typography';
import { useComments } from 'features/comment/context';
import { useToggleLikeComment } from 'features/comment/hooks';

export function ToolBar() {
	const { comment, handleClickReply, onUpdate } = useComment();
	const { liked = false, numLikes = 0, status, _id } = comment;
	const { updateComment } = useComments();
	const { mutate, isLoading } = useToggleLikeComment(liked, {
		onSuccess: () => {
			const newData = {
				_id,
				liked: !liked,
				numLikes: liked ? numLikes - 1 : numLikes + 1,
			};
			updateComment(newData);
			onUpdate && onUpdate(newData);
		},
	});
	return (
		<div className="my-2">
			{status === COMMENT_STATUS.PENDING && <Text>Uploading...</Text>}

			{status !== COMMENT_STATUS.PENDING &&
				status !== COMMENT_STATUS.REJECTED && (
					<div className="flex w-full items-center gap-4">
						<Text
							role="button"
							onClick={() => mutate(_id)}
							primary={liked}
							className="cursor-pointer"
						>
							{isLoading ? (
								<Spinner size="xs" />
							) : liked ? (
								'Liked'
							) : (
								'Like'
							)}
						</Text>
						<Text
							className="cursor-pointer  dark:hover:text-dark-50"
							onClick={handleClickReply}
						>
							Reply
						</Text>

						<div className="ml-auto">
							{numLikes > 0 && (
								<Text className=" flex items-center gap-1 rounded-full px-2">
									<Text>{numLikes}</Text>
									<IconWrapper size={4}>
										<SparklesIcon />
									</IconWrapper>
								</Text>
							)}
						</div>
					</div>
				)}
		</div>
	);
}

import './styles.css';

import {
	ChatBubbleBottomCenterTextIcon,
	ShareIcon,
	SparklesIcon,
} from 'components/Icon';
import { useMemo, useRef } from 'react';

import { CommentZone } from './CommentZone';
import { CommentsProvider } from 'features/comment/context';
import { IconWrapper } from 'components/DataDisplay';
import { Modal } from 'components/OverLay';
import { Text } from 'components/Typography';
import { UserItem } from 'features/user/components';
import clsx from 'clsx';
import { formatNumber } from 'utils';
import { useModal } from 'hooks/useModal';
import { usePost } from '../../Post';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

export const PostFooter = () => {
	const { post, handleLike } = usePost();
	const { likesCount, isLiked, numComments = 0 } = post;

	const { close, isOpen, open } = useModal();

	const commentZoneRef = useRef();

	return (
		<div>
			<footer className="border-normal flex items-center justify-between px-2 py-2 sm:justify-end sm:gap-3 sm:px-4 sm:py-3">
				<ActionButton
					onIconClick={handleLike}
					onNumberClick={open}
					icon={
						<SparklesIcon
							className={clsx(
								'transition-all duration-300 ease-in-out',
								isLiked ? 'text-color-primary' : 'text-normal',
							)}
						/>
					}
					number={likesCount}
				/>
				<ActionButton
					onIconClick={() => commentZoneRef.current.toggleComments()}
					icon={<ChatBubbleBottomCenterTextIcon />}
					number={numComments}
				/>
				<ActionButton icon={<ShareIcon />} number={0} />
			</footer>
			<CommentsProvider
				comments={() => {
					if (!post?.comments?.comments) return [];
					return post?.comments?.comments.map((comment) => ({
						...comment,
						isShowReplies: true,
					}));
				}}
			>
				<CommentZone
					ref={commentZoneRef}
					postId={post._id}
					fetchOnMount={post?.comments?.comments?.length === 0}
					showComment={
						post?.comments?.comments.length > 0 || post?.showComment
					}
				/>
			</CommentsProvider>
			<Modal onClose={close} open={isOpen}>
				<Modal.Panel responsive className="sm:h-[600px] sm:!w-[380px]">
					<Modal.Header>Users Liked</Modal.Header>
					<Modal.Body>
						<UsersLiked postId={post._id} />
					</Modal.Body>
				</Modal.Panel>
			</Modal>
		</div>
	);
};

const ActionButton = ({ icon, number = 0, onIconClick, onNumberClick }) => {
	const numberDisplay = useMemo(() => {
		return formatNumber(number);
	}, [number]);
	return (
		<div className="flex h-9 min-w-[108px]  items-center justify-between overflow-hidden rounded-full bg-slate-200 dark:bg-dark-700">
			<div
				className="button-active-effect button group rounded-l-full"
				onClick={onIconClick}
			>
				<IconWrapper size={5} className="text-normal">
					{icon}
				</IconWrapper>
			</div>
			<div className="h-[70%] w-[1px] bg-slate-300 dark:bg-dark-500" />
			<div
				className="button-active-effect button rounded-r-full"
				onClick={onNumberClick}
			>
				<Text level={1} className="text-base">
					{numberDisplay}
				</Text>
			</div>
		</div>
	);
};

const UsersLiked = ({ postId }) => {
	const user = useSelector((state) => state.auth.user);
	const { data } = useQuery(
		['post-liked', postId],
		() => {
			return [user, user, user];
		},
		{
			staleTime: Infinity,
		},
	);
	const users = [user, user, user];
	return (
		<div>
			{users.map((user) => (
				<UserItem key={user._id} user={user} />
			))}
		</div>
	);
};

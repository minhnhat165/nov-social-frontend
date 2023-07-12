import './styles.css';

import {
	ChatBubbleBottomCenterTextIcon,
	FacebookIcon,
	ShareIcon,
	SparklesIcon,
} from 'components/Icon';
import { Modal, Popover } from 'components/OverLay';
import { useMemo, useRef, useState } from 'react';

import { CommentZone } from './CommentZone';
import { CommentsProvider } from 'features/comment/context';
import { FacebookShareButton } from 'react-share';
import { IconWrapper } from 'components/DataDisplay';
import { Menu } from 'components/Navigation';
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

	const { close: closeLike, isOpen: isOpenLike, open: openLike } = useModal();
	const { close: closeCmt, isOpen: isOpenCmt, open: openCmt } = useModal();

	const commentZoneRef = useRef();

	const shareRef = useRef();
	const [shareOpen, setShareOpen] = useState(false);

	return (
		<div>
			<footer className="border-normal flex items-center justify-between px-2 py-2 sm:justify-end sm:gap-3 sm:px-4 sm:py-3">
				<ActionButton
					onIconClick={handleLike}
					onNumberClick={openLike}
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
					onNumberClick={openCmt}
					icon={<ChatBubbleBottomCenterTextIcon />}
					number={numComments}
				/>
				<ActionButton
					buttonRef={shareRef}
					onIconClick={() => setShareOpen(!shareOpen)}
					icon={<ShareIcon />}
					number={0}
				/>
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
			<Modal onClose={closeLike} open={isOpenLike}>
				<Modal.Panel responsive className="sm:h-[520px] sm:!w-[400px]">
					<Modal.Header>Users Liked</Modal.Header>
					<Modal.Body>
						<UsersLiked postId={post._id} />
					</Modal.Body>
				</Modal.Panel>
			</Modal>
			<Modal onClose={closeCmt} open={isOpenCmt}>
				<Modal.Panel responsive className="sm:h-[520px] sm:!w-[400px]">
					<Modal.Header>Users Liked</Modal.Header>
					<Modal.Body>
						<UsersLiked postId={post._id} />
					</Modal.Body>
				</Modal.Panel>
			</Modal>
			<Popover
				visible={shareOpen}
				interactive
				appendTo={document.body}
				placement="bottom"
				onClickOutside={() => setShareOpen(false)}
				reference={shareRef}
				render={(attrs) => (
					<Popover.Content
						{...attrs}
						level={0}
						className="p-2 shadow-4xl"
					>
						<Popover.Arrow />

						<FacebookShareButton
							url={`${process.env.REACT_APP_BASE_URL}/post/${post._id}`}
						>
							<Menu.Item icon={<FacebookIcon />}>
								{`Share to Facebook`}
							</Menu.Item>
						</FacebookShareButton>
					</Popover.Content>
				)}
			></Popover>
		</div>
	);
};

const ActionButton = ({
	icon,
	number = 0,
	onIconClick,
	onNumberClick,
	buttonRef,
}) => {
	const numberDisplay = useMemo(() => {
		return formatNumber(number);
	}, [number]);
	return (
		<div
			ref={buttonRef}
			className="flex h-9 min-w-[108px]  items-center justify-between overflow-hidden rounded-full bg-slate-200 dark:bg-dark-700"
		>
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

const UsersCmt = ({ postId }) => {
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

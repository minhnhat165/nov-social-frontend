import './styles.css';

import {
	ChatBubbleBottomCenterTextIcon,
	FacebookIcon,
	LinkIcon,
	ShareIcon,
	SparklesIcon,
	TwitterIcon,
} from 'components/Icon';
import { CommentsProvider, ParamComments } from 'features/comment/context';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { Modal, Popover } from 'components/OverLay';
import { getUsersCommentedPost, getUsersLikedPost } from 'api/postApi';
import { useMemo, useRef, useState } from 'react';

import { CommentZone } from './CommentZone';
import { IconWrapper } from 'components/DataDisplay';
import LogoIcon from 'components/Icon/LogoIcon';
import { Menu } from 'components/Navigation';
import { Spinner } from 'components/Loading';
import { Text } from 'components/Typography';
import { UserItem } from 'features/user/components';
import clsx from 'clsx';
import { formatNumber } from 'utils';
import { toast } from 'react-hot-toast';
import { useModal } from 'hooks/useModal';
import { usePost } from '../../Post';
import { useQuery } from 'react-query';

export const PostFooter = () => {
	const { post, handleLike, isDetail } = usePost();
	const { likesCount, isLiked, numComments = 0 } = post;

	const { close: closeLike, isOpen: isOpenLike, open: openLike } = useModal();
	const { close: closeCmt, isOpen: isOpenCmt, open: openCmt } = useModal();

	const commentZoneRef = useRef();

	const shareRef = useRef();
	const [shareOpen, setShareOpen] = useState(false);
	const postUrl = `${process.env.REACT_APP_BASE_URL}/post/${post._id}`;

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

				{isDetail && <ParamComments />}
			</CommentsProvider>
			<Modal onClose={closeLike} open={isOpenLike}>
				<Modal.Panel
					responsive
					className="flex flex-col sm:h-[520px] sm:!w-[400px]"
				>
					<Modal.Header>Users Liked</Modal.Header>
					<Modal.Body className="flex-1">
						<UsersLiked postId={post._id} />
					</Modal.Body>
				</Modal.Panel>
			</Modal>
			<Modal onClose={closeCmt} open={isOpenCmt}>
				<Modal.Panel responsive className="sm:h-[520px] sm:!w-[400px]">
					<Modal.Header>Users Comment</Modal.Header>
					<Modal.Body>
						<UsersCmt postId={post._id} />
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
						className="flex flex-col p-2 shadow-4xl"
					>
						<Popover.Arrow />

						<FacebookShareButton url={postUrl}>
							<Menu.Item icon={<FacebookIcon />}>
								Share to Facebook
							</Menu.Item>
						</FacebookShareButton>
						<TwitterShareButton url={postUrl}>
							<Menu.Item icon={<TwitterIcon />}>
								Share to Twitter
							</Menu.Item>
						</TwitterShareButton>
						<Menu.Item icon={<LogoIcon />}>
							Share on your feed
						</Menu.Item>
						<Menu.Item
							onClick={() => {
								navigator.clipboard.writeText(postUrl);
								toast.success('Copied link to clipboard');
							}}
							icon={<LinkIcon />}
						>
							Copy link
						</Menu.Item>
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
	const { data, isLoading } = useQuery(
		['post-users-liked', postId],
		() => getUsersLikedPost({ id: postId }),
		{
			staleTime: Infinity,
		},
	);
	const { items } = data || { items: [] };
	return (
		<div className="h-full  overflow-y-auto">
			{isLoading && (
				<Spinner
					size="xl"
					color="primary"
					className="absolute inset-0 m-auto"
				/>
			)}
			{items.map((user) => (
				<UserItem key={user._id} user={user} />
			))}
		</div>
	);
};

const UsersCmt = ({ postId }) => {
	const { data, isLoading } = useQuery(
		['post-users-cmt', postId],
		() => getUsersCommentedPost({ id: postId }),
		{
			staleTime: Infinity,
		},
	);
	const { items } = data || { items: [] };
	return (
		<div className="h-full  overflow-y-auto">
			{isLoading && (
				<Spinner
					size="xl"
					color="primary"
					className="absolute inset-0 m-auto"
				/>
			)}
			{items.map((user) => (
				<UserItem key={user._id} user={user} />
			))}
		</div>
	);
};

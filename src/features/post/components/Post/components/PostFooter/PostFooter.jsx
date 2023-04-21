import './styles.css';

import { Button, SwitchButton } from 'components/Action';
import {
	ChatBubbleBottomCenterTextIcon,
	ShareIcon,
	SparklesIcon,
} from 'components/Icon';
import { Comment, CommentCreator, CommentSkeleton } from 'features/comment';
import {
	CommentsProvider,
	useComments,
} from 'features/comment/context/CommentsContext';
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';

import { IconWrapper } from 'components/DataDisplay';
import { Text } from 'components/Typography';
import clsx from 'clsx';
import { formatNumber } from 'utils';
import { getPostComments } from 'api/postApi';
import { usePost } from '../../Post';
import { useQuery } from 'react-query';

export const PostFooter = () => {
	const { post, handleLike } = usePost();
	const { likesCount, isLiked, numComments = 0 } = post;

	const commentZoneRef = useRef();

	return (
		<div>
			<footer className="border-normal flex items-center justify-end gap-3 px-4 py-3">
				<ActionButton
					onIconClick={handleLike}
					onNumberClick={handleLike}
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
				<ActionButton icon={<ShareIcon />} number={9} />
			</footer>
			<CommentsProvider>
				<CommentZone ref={commentZoneRef} postId={post._id} />
			</CommentsProvider>
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
const LIMIT = 10;
const CommentZone = forwardRef(({ postId }, ref) => {
	const { addComment, replaceComment, rootComments, setComments } =
		useComments();
	const [showComments, setShowComments] = useState(false);

	const [hasNextPage, setHasNextPage] = useState(true);

	const [page, setPage] = useState(0);
	const [currentPage, setCurrentPage] = useState(-1);
	const { isLoading } = useQuery(
		['comments', postId, page],
		() => getPostComments({ id: postId, page }),
		{
			onSuccess: ({ comments, total }) => {
				setComments((prev) => [...prev, ...comments]);
				setCurrentPage(page);
				setHasNextPage(comments.length === LIMIT);
			},
			enabled: showComments && currentPage !== page,
		},
	);

	useImperativeHandle(
		ref,
		() => {
			return {
				showComments: () => setShowComments(true),
				hideComments: () => setShowComments(false),
				toggleComments: () => {
					setShowComments((prev) => !prev);
				},
			};
		},
		[],
	);

	if (!showComments) return null;

	return (
		<div className="border-normal border-t">
			<div className="px-4 pb-2 pt-4">
				<CommentCreator
					onLocalCommentCreated={addComment}
					onServerCommentCreated={replaceComment}
					initial={{
						parentId: null,
						postId,
						path: postId,
					}}
				/>

				<CommentList isLoading={isLoading} comments={rootComments} />
			</div>
			{hasNextPage && (
				<div className="flex justify-center px-4 pb-4">
					<Button
						loading={isLoading}
						variant="text"
						fullWidth
						onClick={() => setPage((prev) => prev + 1)}
					>
						<Text level={1} className="text-base">
							Load more
						</Text>
					</Button>
				</div>
			)}
		</div>
	);
});

const MAX_HEIGHT = 384;
function CommentList({ isLoading, comments }) {
	const [scrollMode, setScrollMode] = useState(false);
	const CommentsWrapper = scrollMode ? ScrollableCommentsWrapper : Fragment;

	const [hasSwitchMode, setHasSwitchMode] = useState(true);

	const listRef = useRef(null);

	useEffect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const { height } = entries[0].contentRect;
			if (height >= MAX_HEIGHT) {
				setHasSwitchMode(true);
			} else {
				setHasSwitchMode(false);
				setScrollMode(false);
			}
		});
		resizeObserver.observe(listRef.current);
		return () => {
			resizeObserver.disconnect();
		};
	}, [listRef]);

	return (
		<>
			{hasSwitchMode && (
				<div className="my-2 flex items-center justify-end gap-2">
					<Text>Scroll mode</Text>
					<SwitchButton
						size="sm"
						isOn={scrollMode}
						onChange={setScrollMode}
					/>
				</div>
			)}
			<div ref={listRef}>
				<CommentsWrapper>
					<div className="flex flex-col gap-2 py-2">
						{comments.map((comment) => (
							<Comment key={comment._id} comment={comment} />
						))}
					</div>
					{isLoading && (
						<div className="mb-2">
							<CommentSkeleton />
							<CommentSkeleton />
						</div>
					)}
				</CommentsWrapper>
			</div>
		</>
	);
}

const ScrollableCommentsWrapper = ({ children }) => {
	return (
		<div
			id="scrollable-comments-wrapper"
			className="overflow-y-overlay border-normal -mx-4 max-h-96 border-t px-4"
		>
			{children}
		</div>
	);
};

import { Button, SwitchButton } from 'components/Action';
import { Comment, CommentCreator, CommentSkeleton } from 'features/comment';
import {
	Fragment,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react';

import { ChatBubbleBottomCenterTextIcon } from 'components/Icon';
import { IconWrapper } from 'components/DataDisplay';
import { Text } from 'components/Typography';
import { getPostComments } from 'api/postApi';
import { useComments } from 'features/comment/context/CommentsContext';
import { useQuery } from 'react-query';

const LIMIT = 10;
export const CommentZone = forwardRef(({ postId }, ref) => {
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

				{rootComments.length === 0 && !isLoading ? (
					<div className="flex h-32 flex-col items-center justify-center">
						<Text primary>
							<IconWrapper size={10}>
								<ChatBubbleBottomCenterTextIcon />
							</IconWrapper>
						</Text>
						<Text level={1} className="text-xl">
							No comments yet
						</Text>
						<Text level={2} className="text-sm">
							Be the first to comment
						</Text>
					</div>
				) : (
					<CommentList comments={rootComments} />
				)}
				{isLoading && (
					<div className="mb-2">
						<CommentSkeleton />
						<CommentSkeleton />
					</div>
				)}
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
function CommentList({ comments }) {
	const [scrollMode, setScrollMode] = useState(false);
	const CommentsWrapper = scrollMode ? ScrollableCommentsWrapper : Fragment;

	const [hasSwitchMode, setHasSwitchMode] = useState(true);

	const listRef = useRef(null);

	useEffect(() => {
		if (!listRef?.current) return;
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

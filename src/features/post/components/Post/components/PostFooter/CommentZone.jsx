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
import clsx from 'clsx';
import { getPostComments } from 'api/postApi';
import { useComments } from 'features/comment/context';
import { useInfiniteQuery } from 'react-query';

const LIMIT = 10;
export const CommentZone = forwardRef(
	({ postId, showComment: _showComment = false, fetchOnMount }, ref) => {
		const { addComment, replaceComment, rootComments, setUniqueComments } =
			useComments();
		const [showComments, setShowComments] = useState(_showComment);
		const [fetchEnabled, setFetchEnabled] = useState(
			fetchOnMount && _showComment,
		);

		const { isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery(
			['comments', postId],
			({ pageParam }) =>
				getPostComments({
					id: postId,
					cursor: pageParam,
					limit: LIMIT,
				}),
			{
				getNextPageParam: (lastPage) => {
					if (!lastPage.hasMore) return undefined;
					return lastPage.endCursor;
				},
				onSuccess: ({ pages }) => {
					const comments = pages.flatMap((page) => page.comments);
					setUniqueComments(comments);
				},
				enabled: fetchEnabled,
				staleTime: 1000 * 60 * 5, // 5 minutes
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
		useEffect(() => {
			setFetchEnabled(showComments);
		}, [showComments]);

		if (!showComments) return null;

		return (
			<div className="border-normal border-t">
				<div className="p-2 pb-2 sm:p-4 ">
					<CommentCreator
						onLocalCommentCreated={addComment}
						onServerCommentCreated={replaceComment}
						initial={{
							parentId: null,
							postId,
							path: postId,
						}}
					/>

					{rootComments.length === 0 && !isFetching ? (
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
					{isFetching && (
						<div className="mb-2">
							<CommentSkeleton />
							<CommentSkeleton />
						</div>
					)}
				</div>
				{hasNextPage && (
					<div className="flex justify-center px-4 pb-4">
						<Button
							loading={isFetching}
							variant="text"
							fullWidth
							onClick={fetchNextPage}
						>
							<Text level={1} className="text-base">
								Load more
							</Text>
						</Button>
					</div>
				)}
			</div>
		);
	},
);
const MAX_HEIGHT = 383;
function CommentList({ comments }) {
	const [scrollMode, setScrollMode] = useState(false);

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
		<Fragment>
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
			<div
				ref={listRef}
				id="scrollable-comments-wrapper"
				className={clsx(
					scrollMode &&
						'overflow-y-overlay border-normal -mx-4 max-h-96 border-t px-4',
				)}
			>
				<div className="flex flex-col gap-2 py-2">
					{comments.map((comment) => (
						<Comment key={comment._id} comment={comment} />
					))}
				</div>
			</div>
		</Fragment>
	);
}

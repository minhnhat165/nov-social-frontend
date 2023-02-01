import { AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getComments } from '../../../api/commentApi';
import {
	getUsersCmtPost,
	getUsersLikePost,
	likePost,
} from '../../../api/postApi';
import { usePostListContext } from '../../../contexts/PostListContext';
import { useAsyncFn } from '../../../hooks/useAsync';
import { createNotification } from '../../../redux/slices/notificationSlice';
import checkIncludesUser from '../../../utils/checkIncludesUser';
import Button from '../../ButtonOld';
import LikeButton from '../../ButtonOld/LikeButton';
import { useComment } from '../../Comment/CommentContext';
import CommentCreate from '../../Comment/CommentCreate';
import CommentList from '../../Comment/CommentList';
import ShowModalUserList from '../../ShowModalUserList';
import { SpinnerV2 } from '../../Loading/Spinner';

import Tooltip from '../../OverLay/Tooltip';

const Footer = ({ post }) => {
	const socket = useSelector((state) => state.socket.socket);
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();

	const getCommentsFn = useAsyncFn(getComments);
	const toggleLikePostFn = useAsyncFn(likePost);
	const getUsersLikeFn = useAsyncFn(getUsersLikePost);
	const getUsersCommentFn = useAsyncFn(getUsersCmtPost);

	const { setComments, rootComments, totalComment } = useComment();
	const { toggleLikeLocalPost } = usePostListContext();

	const [showComment, setShowComment] = useState(false);
	const [usersLike, setUsersLike] = useState([]);
	const [usersComment, setUsersComment] = useState([]);
	const isLoadedComment = useRef(false);
	const isLikePost = useMemo(() => {
		return checkIncludesUser(post.likes);
	}, [post.likes]);

	const handleLike = async () => {
		toggleLikePostFn.execute(post._id).then((data) => {
			toggleLikeLocalPost(post._id, data.post.likes);
			socket.emit('toggle like post', {
				postId: post._id,
				postLikes: data.post.likes,
			});
			if (user._id === post.user._id) return;
			const notificationData = {
				data: {
					recipients: post.user._id,
					text: 'liked your post',
					type: 'like',
					url: `/post/${post._id}`,
				},
				socket,
			};
			let action = createNotification(notificationData);
			dispatch(action);
		});
	};

	const handleShowUsersLike = () => {
		getUsersLikeFn.execute(post._id).then((users) => {
			setUsersLike(users);
		});
	};

	const handleShowUsersComment = () => {
		getUsersCommentFn.execute(post._id).then((users) => {
			setUsersComment(users);
		});
	};

	const handleToggleShowComment = async () => {
		setShowComment(!showComment);
		if (isLoadedComment.current) return;
		getCommentsFn.execute(post._id).then((comments) => {
			setComments(comments);
			isLoadedComment.current = true;
		});
	};

	return (
		<div className="relative w-full p-4 pb-0 dark:text-dark-text-regular">
			<div className="absolute top-0 right-4 flex -translate-y-1/2 gap-2">
				<Tooltip content="Comment" placement="top" arrow>
					<Button
						circle
						shadow
						className="dark:hover:text-dark-text-bold"
						onClick={handleToggleShowComment}
					>
						<i className="fa-solid fa-comment "></i>
					</Button>
				</Tooltip>
				<Tooltip content="Share" placement="top" arrow>
					<Link to={`/post/${post._id}`}>
						<Button
							circle
							shadow
							className="dark:hover:text-dark-text-bold"
						>
							<i className="fa-solid fa-share"></i>
						</Button>
					</Link>
				</Tooltip>

				<LikeButton
					onClick={handleLike}
					className="shadow dark:hover:text-dark-text-bold"
					isActive={isLikePost}
				/>
			</div>{' '}
			<div className="flex items-center gap-2 pb-3">
				<ShowModalUserList
					title="Comment"
					list={usersComment}
					onClick={handleShowUsersComment}
				>
					<span className="hover:bg-primary/20 cursor-pointer rounded p-1">
						<span>{totalComment}</span>{' '}
						<i className="fa-solid fa-comment text-green-500"></i>
					</span>{' '}
				</ShowModalUserList>
				<span className="hover:bg-primary/20 cursor-pointer rounded p-1">
					<span className="hover:text-primary"> 2</span>{' '}
					<i className="fa-solid fa-share text-primary"></i>
				</span>{' '}
				<ShowModalUserList
					title="Like"
					list={usersLike}
					onClick={handleShowUsersLike}
				>
					<span className="hover:bg-primary/20 cursor-pointer rounded p-1">
						<span>{post.likes.length}</span>{' '}
						<i className="fa-solid fa-heart heart relative z-10 text-red-500"></i>
					</span>
				</ShowModalUserList>
			</div>
			<AnimatePresence>
				{showComment && (
					<div className="flex w-full flex-col gap-4 border-t py-4 transition-all dark:border-dark-border">
						<CommentCreate
							postId={post._id}
							postUserId={post.user._id}
						/>
						<CommentList comments={rootComments} />
						{getCommentsFn.loading && (
							<div className="flex justify-center">
								<div className="mt-2 text-center">
									<SpinnerV2 />
								</div>
							</div>
						)}
					</div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Footer;

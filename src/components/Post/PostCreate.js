import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../api/postApi';
import { usePostListContext } from '../../contexts/PostListContext';
import { useAsyncFn } from '../../hooks/useAsync';
import { createNotification } from '../../redux/slices/notificationSlice';
import Avatar from '../DataDisplay/Avatar';
import Modal from '../OverLay/Modal';
import PostForm, { formTypes } from './PostForm';

const PostCreate = () => {
	const { addPost } = usePostListContext();
	const createPostFn = useAsyncFn(createPost);
	const socket = useSelector((state) => state.socket.socket);

	const user = useSelector((state) => state.auth.user);
	const [openForm, setOpenForm] = useState(false);
	const [formState, setFromState] = useState('');

	const dispatch = useDispatch();

	const handleOpenForm = (formState) => {
		setOpenForm(true);
		setFromState(formState);
	};

	const handleCreatePost = async (data) => {
		await createPostFn.execute(data).then((data) => {
			addPost(data.newPost);
			dispatch(
				createNotification({
					data: {
						recipients: user.followers,
						text: 'created a new post',
						type: 'post',
						url: `/post/${data.newPost._id}`,
					},
					socket,
				})
			);
			setOpenForm(false);
		});
	};

	return (
		<div className="w-full rounded-xl p-4 dark:bg-dark-regular">
			<div className="flex items-center gap-2">
				<Avatar url={user.avatar} />
				<div
					onClick={() => handleOpenForm('')}
					className="hover:dark:bg-primary/20 flex-1 cursor-pointer rounded-xl py-2 px-4 transition-all dark:bg-dark-light dark:text-dark-text-regular hover:dark:text-dark-text-bold"
				>
					{' '}
					what's on your mind?
				</div>
				<div
					className="hover-brightness flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl dark:bg-dark-light dark:text-dark-text-regular"
					onClick={() => handleOpenForm(formTypes.upload)}
				>
					{' '}
					<i className="fa-duotone fa-camera text-md"></i>
				</div>
				<div className="hover-brightness flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl dark:bg-dark-light dark:text-dark-text-regular">
					{' '}
					<i className="fa-duotone fa-face-smile-wink text-md"></i>
				</div>
			</div>

			<Modal show={openForm} setShow={setOpenForm}>
				<PostForm formState={formState} onSubmit={handleCreatePost} />
			</Modal>
		</div>
	);
};

export default PostCreate;

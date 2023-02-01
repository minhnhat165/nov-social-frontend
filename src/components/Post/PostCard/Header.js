import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { deletePost, updatePost as updatePostApi } from '../../../api/postApi';
import { usePostListContext } from '../../../contexts/PostListContext';
import { useAsyncFn } from '../../../hooks/useAsync';
import AccountQuickView from '../../AccountQuickView';
import ConfirmBox from '../../ConfirmBox';
import DiffTime from '../../DiffTime';
import Modal from '../../OverLay/Modal';
import Popover from '../../OverLay/Popover/Popover';
import PostForm, { formTypes } from '../PostForm';
import PostMenu from '../PostMenu';

const Header = ({ post }) => {
	const userId = useSelector((state) => state.auth.user._id);
	const { removePost, updatePost } = usePostListContext();
	const deletePostFn = useAsyncFn(deletePost);
	const updatePostFn = useAsyncFn(updatePostApi);
	const [showMenu, setShowMenu] = useState(false);
	const [showConfirmDelete, setShowConfirmDelete] = useState(false);
	const [openEditForm, setOpenEditForm] = useState(false);
	const handleDeletePost = () => {
		deletePostFn.execute(post._id).then(() => {
			removePost(post._id);
			setShowConfirmDelete(false);
		});
	};
	const handleEditPost = async (data) => {
		await updatePostFn.execute(data, post._id).then((data) => {
			updatePost(data.data);
			setOpenEditForm(false);
		});
	};

	const menuItems = useMemo(() => {
		if (post.user._id === userId)
			return [
				{
					title: 'Edit post',
					icon: <i className="fa-light fa-pen-to-square"></i>,
					action: () => {
						setOpenEditForm(true);
						setShowMenu(false);
					},
				},
				{
					title: 'Edit audience',
					icon: <i className="fa-light fa-lock"></i>,
				},
				{
					title: 'Delete post',
					icon: <i className="fa-light fa-trash-can-xmark"></i>,
					action: () => {
						setShowConfirmDelete(true);
						setShowMenu(false);
					},
				},
			];
		return [
			{
				title: 'Bookmark',
				icon: <i className="fa-light fa-bookmark"></i>,
			},
		];
	}, [post.user._id, userId]);

	return (
		<div className="mb-1 flex items-center justify-between p-2 pb-0">
			<AccountQuickView
				nameClickAble
				accountPreviewAble
				avatarClickAble
				user={post.user}
				subName={
					<div className="flex justify-start">
						<DiffTime
							startDate={post.createdAt}
							className="dark:text-light text-xs"
						/>
					</div>
				}
				className="dark:hover:bg-transparent"
			/>
			<Popover
				visible={showMenu}
				// setVisible={setShowMenu}
				// placement="right"
				// render={<PostMenu menuItems={menuItems} />}
				// className="z-10 mr-2 mt-2 origin-[93%_0%] dark:bg-dark-regular"
				// hideOnClickParent
				hoverContent={<PostMenu menuItems={menuItems} />}
			>
				<div
					className="mr-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-dark-light dark:text-dark-text-light dark:hover:text-dark-text-bold"
					onClick={() => setShowMenu(!showMenu)}
				>
					<i className="fa-solid fa-ellipsis-vertical"></i>
				</div>
			</Popover>
			<ConfirmBox
				show={showConfirmDelete}
				setShow={setShowConfirmDelete}
				onConfirm={handleDeletePost}
				header={
					<span>
						Delete your <span className="text-primary">Post</span> ?
					</span>
				}
				content={'Are you sure you want to delete this post?'}
				buttonText={'Delete'}
			/>
			<Modal show={openEditForm} setShow={setOpenEditForm}>
				<PostForm
					initial={post}
					formState={post.image ? formTypes.upload : ''}
					onSubmit={handleEditPost}
				/>
			</Modal>
		</div>
	);
};

export default Header;

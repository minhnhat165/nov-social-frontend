import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import postApi from '../../api/postApi';
import { addNewPost } from '../../redux/slices/postSlice';
import Modal from '../OverLay/Modal';
import PostForm from './PostForm';

const PostModal = () => {
	const [openForm, setOpenForm] = useState(false);
	const [formState, setFromState] = useState('');
	const dispatch = useDispatch();
	const handleOpenForm = (formState) => {
		setOpenForm(true);
		setFromState(formState);
	};
	const handleCreatePost = async (data) => {
		try {
			const res = await postApi.create(data);
			dispatch(addNewPost(res.data.newPost));
		} catch (error) {
			toast.error('something went wrong');
		}
		setOpenForm(false);
	};
	return (
		<Modal show={openForm} setShow={setOpenForm}>
			<PostForm formState={formState} onSubmit={handleCreatePost} />
		</Modal>
	);
};

export default PostModal;

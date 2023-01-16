import React, { useEffect, useId, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import Avatar from '../Avatar';
import CloseButton from '../ButtonOld/CloseButton';
import Img from '../Img';
import TextArea from '../TextArea';
import useUploadImg from '../../hooks/useUpLoadImg';
import Button from '../ButtonOld';
import createImgUrl from '../../utils/createImgUrl';
import { SpinnerV2 } from '../Spinner';

const CommentForm = ({ initial, onSubmit, loading }) => {
	const { previewImg, setPreviewImg, file, setFile, handleUpLoad } =
		useUploadImg(initial?.image);
	const user = useSelector((state) => state.auth.user);
	const [text, setText] = useState(initial?.text);
	const [tagUser, setTagUser] = useState('');
	const inputFileRef = useRef(null);
	const inputFileId = useId();

	const [dragLayer, setDragLayer] = useState(null);
	const [dropLayer, setDropLayer] = useState(null);
	const { isDragging } = useDragAndDrop(dragLayer, dropLayer, (file) => {
		if (file) {
			const url = createImgUrl(file);
			if (url) {
				setFile(file);
				setPreviewImg(url);
			}
		}
	});
	useEffect(() => {
		setTagUser(initial?.tag);
	}, [initial?.tag]);

	const handleSubmit = async () => {
		if (text || file || previewImg) {
			const formData = new FormData();
			formData.append('text', text);
			if (!previewImg && !file) formData.append('image', 'no image');
			formData.append('image', file ? file : initial.image);
			if (tagUser) formData.append('tag', JSON.stringify(tagUser));
			await onSubmit(formData);
			setPreviewImg('');
			setFile('');
			setText('');
			setTagUser(null);
			inputFileRef.current.value = null;
		}
	};

	const handlePaste = (e) => {
		const file = e.clipboardData.files[0];
		const url = createImgUrl(file);
		if (url) {
			setFile(file);
			setPreviewImg(url);
		}
	};

	const handleCloseUpload = () => {
		setFile('');
		setPreviewImg('');
		inputFileRef.current.value = null;
	};
	const handleRemoveTag = (e) => {
		if (e.key === 'Backspace' && !text && tagUser) {
			setTagUser(null);
		}
	};

	return (
		<div className="flex gap-2" onKeyDown={handleRemoveTag}>
			<Avatar url={user.avatar} size="w-8 h-8" />
			<div className="relative flex-1">
				<div
					className="relative flex w-full overflow-hidden rounded-xl px-2 py-2 dark:bg-dark-light"
					ref={(ref) => {
						setDragLayer(ref);
						setDropLayer(ref);
					}}
				>
					{tagUser && (
						<Link
							to={`/profile/${tagUser._id}`}
							className="dark:hover:text-primary mr-1 dark:text-dark-text-bold"
						>
							@{tagUser.name}
						</Link>
					)}
					<div className="flex-1">
						<TextArea
							onChange={setText}
							onPaste={handlePaste}
							value={text}
							onEnter={handleSubmit}
							// autoFocus
						/>
					</div>
					<div>
						<div className="absolute right-1 -bottom-3 -translate-y-1/2">
							<label
								htmlFor={inputFileId}
								className="cursor-pointer dark:hover:bg-dark-very-light"
							>
								<input
									type="file"
									id={inputFileId}
									className="invisible absolute"
									onChange={handleUpLoad}
									ref={inputFileRef}
								/>{' '}
								<div className="hover-brightness flex h-[30px] w-[30px] items-center justify-center rounded-full">
									{isDragging ? (
										<i className="fa-duotone fa-upload"></i>
									) : (
										<i className="fa-duotone fa-image"></i>
									)}
								</div>
							</label>
						</div>
					</div>
				</div>
				{loading && (
					<>
						<div className="absolute top-0 right-0 left-0 bottom-0"></div>
						<div className="mt-2">
							<SpinnerV2 />
						</div>
					</>
				)}
				{previewImg && (
					<div className="relative max-w-[120px]">
						<div className="bg-primary/20 mt-3 max-w-[120px] overflow-hidden rounded-md">
							<Img
								src={previewImg}
								className="max-w-[120px] object-cover"
							/>
						</div>
						<div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
							<CloseButton
								onClick={handleCloseUpload}
								className="text-sm dark:bg-slate-500 dark:text-dark-very-light"
								size="w-5 h-5"
							/>
						</div>
					</div>
				)}
			</div>
			<Button primary className="h-9 w-9" onClick={handleSubmit}>
				<i className="fa-solid fa-paper-plane"></i>
			</Button>
		</div>
	);
};

export default CommentForm;

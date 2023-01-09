import React, { useEffect, useId, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CloseButton from '../../ButtonOld/CloseButton';
import Img from '../../Img';
import TextArea from '../../TextArea';
import useDragAndDrop from '../../../hooks/useDragAndDrop';
import useUploadImg from '../../../hooks/useUpLoadImg';
import createImgUrl from '../../../utils/createImgUrl';
import Button from '../../ButtonOld';
import AnimationWrapper from '../../Animate/AnimationWrapper';
import { AnimatePresence } from 'framer-motion';
import { zoom } from '../../Animate/variants';

const MessageCreator = ({ initial, onSubmit, conversationId }) => {
	const socket = useSelector((state) => state.socket.socket);
	const [text, setText] = useState(initial?.text || '');
	const [tagUser, setTagUser] = useState('');
	const inputFileRef = useRef(null);
	const inputFileId = useId();
	const [loading, setLoading] = useState(false);
	const { previewImg, setPreviewImg, file, setFile, handleUpLoad } =
		useUploadImg(initial?.image);
	const [typing, setTyping] = useState(false);
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
	const handleTyping = (text) => {
		setText(text);
		if (text.trim() && !typing) {
			socket.emit('send typing', {
				room: conversationId,
				isTyping: true,
			});
			setTyping(true);
		}
		if (!text.trim() && typing) {
			setTyping(false);
			socket.emit('send typing', {
				room: conversationId,
				isTyping: false,
			});
		}
	};

	const handleSubmit = async () => {
		if (text.trim() || file || previewImg) {
			setLoading(true);
			const formData = new FormData();
			formData.append('text', text);
			formData.append('image', file);
			if (tagUser) formData.append('tag', JSON.stringify(tagUser));
			setText('');
			setPreviewImg('');
			setFile('');
			handleTyping('');
			setTagUser(null);
			inputFileRef.current.value = null;
			setLoading(false);
			onSubmit(formData);
			setTyping(false);
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

	useEffect(() => {
		return () => {
			setTyping(false);
			socket.emit('send typing', {
				room: conversationId,
				isTyping: false,
			});
		};
	}, [conversationId, socket]);

	return (
		<div className="flex w-full items-center justify-center">
			<div className="mr-2 flex items-center justify-center gap-2 text-xl">
				<label
					htmlFor={inputFileId}
					className="cursor-pointer rounded-full dark:hover:bg-dark-text-light/10"
				>
					<input
						type="file"
						id={inputFileId}
						className="invisible absolute"
						onChange={handleUpLoad}
						ref={inputFileRef}
					/>{' '}
					<div className="text-md flex h-10 w-10 items-center justify-center rounded-full text-dark-text-light dark:hover:text-dark-text-bold">
						{isDragging ? (
							<i className="fa-solid fa-upload"></i>
						) : (
							<i className="fa-solid fa-image "></i>
						)}
					</div>
				</label>
			</div>
			<div
				className="relative flex-1 rounded-xl px-4 py-[11px] dark:bg-dark-semiBold"
				ref={(ref) => {
					setDragLayer(ref);
					setDropLayer(ref);
				}}
			>
				{previewImg && (
					<div className="relative max-w-[120px]">
						<div className="mt-1 mb-5 max-w-[120px] overflow-hidden rounded-md bg-primary/20">
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
				<TextArea
					onChange={handleTyping}
					onPaste={handlePaste}
					value={text}
					onEnter={handleSubmit}
				/>
			</div>
			<AnimatePresence>
				{(text.trim() || file || previewImg) && (
					<AnimationWrapper animation={zoom}>
						<Button
							onClick={handleSubmit}
							className="primary ml-2 h-10 w-10 rounded-xl p-4"
						>
							<i className="fa-solid fa-paper-plane"></i>
						</Button>
					</AnimationWrapper>
				)}
			</AnimatePresence>
		</div>
	);
};

export default MessageCreator;

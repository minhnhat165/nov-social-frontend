import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import imageCompression from '../../functions/imageCompression';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import createImgUrl from '../../utils/createImgUrl';
import AccountQuickView from '../AccountQuickView';
import Button from '../ButtonOld/ButtonV2';
import LoadingOverlay from '../LoadingOverlay';
import TextArea from '../TextArea';
import UploadPhoto from '../UploadPhoto';
export const formTypes = {
	upload: 'upload',
	activity: 'activity',
	normal: 'normal',
};

const PostForm = ({
	initial = { text: '', image: '' },
	formState = formTypes.normal,
	onSubmit = () => {},
}) => {
	const user = useSelector((state) => state.auth.user);
	const [showUpload, setShowUpload] = useState(
		formState === formTypes.upload
	);
	const [text, setText] = useState(initial?.text);
	const [postFile, setPostFile] = useState(null);
	const [formImg, setFormImg] = useState(initial.image);
	const [loading, setLoading] = useState(false);
	const handleCloseUpload = () => {
		setShowUpload(false);
		setPostFile(null);
		setFormImg('');
	};
	const [dragLayer, setDragLayer] = useState(null);
	const [dropLayer, setDropLayer] = useState(null);
	const { dropResult, isDragging } = useDragAndDrop(dragLayer, dropLayer);

	useEffect(() => {
		if (dropResult) {
			const url = createImgUrl(dropResult);
			if (url) {
				setPostFile(dropResult);
				setFormImg(url);
				setShowUpload(true);
			}
		}
	}, [dropResult]);

	const handleSubmit = async () => {
		setLoading(true);
		const formData = new FormData();
		formData.append('text', text);
		if (!formImg && !postFile) formData.append('image', 'no image');
		else formData.append('image', postFile ? postFile : initial.image);
		await onSubmit(formData);
		setLoading(false);
	};
	const handlePaste = async (e) => {
		const file = e.clipboardData.files[0];
		if (!file) return;
		const compressedFile = await imageCompression(file);
		const url = createImgUrl(compressedFile);
		if (url) {
			setPostFile(compressedFile);
			setFormImg(url);
			setShowUpload(true);
		}
	};

	return (
		<form
			className="min-h-96  relative w-[500px] flex-col overflow-hidden rounded-xl transition-all dark:bg-dark-regular"
			ref={(ref) => setDragLayer(ref)}
		>
			<div
				className="border-b p-4 py-3 text-2xl font-bold text-light-text-bold 
        dark:border-dark-border/20 dark:text-dark-text-bold"
			>
				{'Create your'} <span className="text-primary">{'Post'}</span>
			</div>
			<div className="flex h-full flex-col gap-2">
				<div className="px-1">
					<AccountQuickView user={user} />
				</div>
				<div className="mb-2 min-h-[180px] px-1">
					<div className="scrollAble mb-4 max-h-48 px-2">
						<TextArea
							onPaste={handlePaste}
							onChange={setText}
							value={text}
							autoFocus
						/>
					</div>

					<AnimatePresence>
						{showUpload && (
							<div className="scrollAble max-h-[320px] overflow-x-hidden px-1">
								<UploadPhoto
									setShow={handleCloseUpload}
									initial={formImg}
									onChange={setPostFile}
								/>
							</div>
						)}
					</AnimatePresence>
				</div>
				<div className="mt-auto flex gap-2 border-t p-2 dark:border-dark-border/20">
					<Button
						fullWidth
						animation
						color="dark:bg-dark-very-light dark:text-dark-text-regular"
						onClick={() => setShowUpload(true)}
						leftIcon={
							<i className="fa-duotone fa-photo-film text-green-300"></i>
						}
					>
						Photo/Video
					</Button>

					<Button
						fullWidth
						animation
						color="dark:bg-dark-very-light dark:text-dark-text-regular"
						onClick={() => setShowUpload(true)}
						leftIcon={
							<i className="fa-duotone fa-face-smile-wink text-yellow-500"></i>
						}
					>
						Feeling/Activity
					</Button>
					<Button
						fullWidth
						animation
						color="primary"
						disabled={
							!(text.trim() || formImg || postFile) || loading
						}
						onClick={handleSubmit}
					>
						Post
					</Button>
				</div>
			</div>
			{isDragging && (
				<div
					ref={(ref) => setDropLayer(ref)}
					className="absolute -top-1 -left-1 -bottom-1 -right-1 bg-primary/20"
				></div>
			)}
			{loading && <LoadingOverlay />}
		</form>
	);
};

export default PostForm;

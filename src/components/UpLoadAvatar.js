import React, { useEffect, useId, useState } from 'react';
import images from '../assets/images';
import Button from './ButtonOld';
import Img from './Img';
import useDragAndDrop from '../hooks/useDragAndDrop';
import useUploadImg from '../hooks/useUpLoadImg';
import createImgUrl from '../utils/createImgUrl';
const UpLoadAvatar = ({
	setAvatarSelected,
	initialImage,
	size = 'h-32 w-32',
}) => {
	const id = useId();
	const { previewImg, setPreviewImg, handleUpLoad, file, setFile } =
		useUploadImg(initialImage);
	const [dragLayer, setDragLayer] = useState(null);
	const [dropLayer, setDropLayer] = useState(null);
	const { isDragging } = useDragAndDrop(dragLayer, dropLayer, (file) => {
		if (file) {
			const url = createImgUrl(file);
			if (url) {
				setPreviewImg(url);
				setFile(file);
			}
		}
	});

	useEffect(() => {
		if (file) {
			setAvatarSelected(file);
		}
	}, [file]);

	return (
		<div
			ref={(ref) => setDragLayer(ref)}
			className={`border p-2  ${
				previewImg
					? 'border-primary dark:border-primary'
					: 'border-slate-400 dark:border-slate-600'
			}  relative rounded-full`}
		>
			<div
				className={`${size} overflow-hidden rounded-full bg-dark-very-light dark:bg-white`}
			>
				<Img
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.5 }}
					src={previewImg || images.defaultAvatar}
					alt=""
					className="block h-full w-full object-cover"
				/>
			</div>
			{isDragging && (
				<div
					ref={(ref) => setDropLayer(ref)}
					className={`dark:bg-dark-regular ${size} absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full`}
				>
					<i className="fa-duotone fa-upload text-4xl text-primary-bold"></i>
				</div>
			)}
			<div className="absolute top-[2px] right-[2px] h-10 w-10">
				<input
					type="file"
					name="file"
					id={id}
					placeholder=""
					onChange={(e) => handleUpLoad(e)}
				/>
				<Button
					className="h-full w-full
          bg-transparent
          p-0
          shadow-none
          dark:bg-transparent"
				>
					<label
						htmlFor={id}
						className="flex h-full w-full cursor-pointer items-center justify-center rounded-full  border-4 bg-slate-400 text-primary-bold transition-all hover:bg-primary-bold hover:text-white dark:border-dark-light"
					>
						<i className="fa-solid fa-plus "></i>
					</label>
				</Button>
			</div>
		</div>
	);
};

UpLoadAvatar.propTypes = {};

export default UpLoadAvatar;

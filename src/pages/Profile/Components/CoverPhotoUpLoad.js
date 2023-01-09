import { useEffect, useId, useState } from 'react';
import Img from '../../../components/Img';
import useDragAndDrop from '../../../hooks/useDragAndDrop';
import useUploadImg from '../../../hooks/useUpLoadImg';
import createImgUrl from '../../../utils/createImgUrl';

const CoverPhotoUpLoad = ({ img, onChange = () => {} }) => {
	const id = useId();
	const [dragLayer, setDragLayer] = useState(null);
	const [dropLayer, setDropLayer] = useState(null);
	const { previewImg, setPreviewImg, file, setFile, handleUpLoad } =
		useUploadImg(img);

	useDragAndDrop(dragLayer, dropLayer, (file) => {
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
			onChange(file);
		}
	}, [file]);
	return (
		<div
			className="group relative h-full w-full object-cover"
			ref={(ref) => {
				setDragLayer(ref);
				setDropLayer(ref);
			}}
		>
			<Img src={previewImg} className="w-full object-cover" />
			<input
				type="file"
				name="file"
				id={id}
				placeholder=""
				className="invisible absolute"
				onChange={(e) => handleUpLoad(e)}
			/>
			<label
				htmlFor={id}
				className="absolute top-4 left-4 cursor-pointer rounded-lg bg-white/50 px-2 py-2 text-sm font-bold opacity-0 transition-all hover:bg-white group-hover:opacity-100"
			>
				<i className="fa-duotone fa-photo-film text-md mr-2"></i>
				Update cover photo
			</label>
		</div>
	);
};
export default CoverPhotoUpLoad;

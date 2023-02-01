import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import getImageFileCompression from 'utils/getImageFileCompression';

export const initialValueUploadImgType = {
	FILE: 'file',
	STRING: 'string',
};

function useUploadImg(initialValue, handleUpLoadCallback = () => {}) {
	const [imagePreview, setImagePreview] = useState();
	useEffect(() => {
		return () => {
			if (imagePreview) URL.revokeObjectURL(imagePreview);
		};
	}, [imagePreview]);

	useEffect(() => {
		if (initialValue?.type === initialValueUploadImgType.STRING) {
			setImagePreview(initialValue.value);
			return;
		}
		if (
			initialValue?.type === initialValueUploadImgType.FILE &&
			initialValue?.length > 0
		) {
			setImagePreview(URL.createObjectURL(initialValue[0]));
		}
	}, [initialValue]);

	const handleUpload = async (rawFile) => {
		if (!rawFile) return;
		try {
			const file = await getImageFileCompression(rawFile);
			const image = URL.createObjectURL(file);
			handleUpLoadCallback(file);
			setImagePreview(image);
		} catch (error) {
			toast.error(error.message);
		}
	};

	return { imagePreview, handleUpload };
}
export default useUploadImg;

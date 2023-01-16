import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import getImageFileCompression from 'utils/getImageFileCompression';

function useUploadImg(initialValue, handleUpLoadCallback = () => {}) {
	const [imagePreview, setImagePreview] = useState();
	useEffect(() => {
		return () => {
			if (imagePreview) URL.revokeObjectURL(imagePreview);
		};
	}, [imagePreview]);

	useEffect(() => {
		if (initialValue?.length > 0) {
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

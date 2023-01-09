import { useEffect, useState } from 'react';
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

	const handleUpload = async (e) => {
		try {
			const file = await getImageFileCompression(e.target.files[0]);
			const image = URL.createObjectURL(file);
			handleUpLoadCallback(file);
			setImagePreview(image);
		} catch (error) {
			console.log(error);
		}
	};

	return { imagePreview, handleUpload };
}
export default useUploadImg;

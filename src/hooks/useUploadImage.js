import { useEffect, useState } from 'react';

import getImageFileCompression from 'utils/getImageFileCompression';
import { toast } from 'react-hot-toast';

function useUploadImage(defaultImage, defaultFile, onFinished) {
	const [imagePreview, setImagePreview] = useState(defaultImage);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		return () => {
			if (imagePreview) URL.revokeObjectURL(imagePreview);
		};
	}, [imagePreview]);

	useEffect(() => {
		if (defaultFile) {
			setImagePreview(URL.createObjectURL(defaultFile));
		}
	}, [defaultFile]);

	const handleUpload = async (rawFile) => {
		if (!rawFile) return;
		setLoading(true);
		try {
			const file = await getImageFileCompression(rawFile);
			const image = URL.createObjectURL(file);
			onFinished(file);
			setImagePreview(image);
		} catch (error) {
			toast.error(error.message);
		}
		setLoading(false);
	};

	const handleCancel = () => {
		setImagePreview(null);
	};

	return {
		imagePreview,
		setImagePreview,
		loading,
		handleUpload,
		handleCancel,
	};
}
export default useUploadImage;

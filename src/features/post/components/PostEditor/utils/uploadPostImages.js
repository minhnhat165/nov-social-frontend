import { getImageWithDimension, uploadImage } from 'utils/cloundinaryUtils';

export const uploadPostImages = async (file, userId) => {
	if (!file.length) return [];
	const publicIds = await Promise.all(
		file.map((file) => uploadImage(file, `${userId}/posts`, true)),
	);
	const postingWidthPhotos = publicIds.length > 1 ? 500 : 1000;
	return publicIds.map((publicId) => ({
		publicId,
		url: getImageWithDimension({
			publicId,
			width: postingWidthPhotos,
		}),
	}));
};

export const uploadCommentImages = async (file, path) => {
	if (!file.length) return [];
	const publicIds = await Promise.all(
		file.map((file) => uploadImage(file, path, true)),
	);
	const postingWidthPhotos = 320;
	return publicIds.map((publicId) => ({
		publicId,
		url: getImageWithDimension({
			publicId,
			width: postingWidthPhotos,
		}),
	}));
};

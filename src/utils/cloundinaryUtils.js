import axios from 'axios';
import getImageFileCompression from './getImageFileCompression';
import { toast } from 'react-hot-toast';

export const uploadImage = async (
	file,
	folder = 'nov-social',
	hasCompression,
) => {
	if (!file) return;
	let fileUpload = file;
	if (hasCompression) fileUpload = await getImageFileCompression(file);

	const data = new FormData();
	data.append('file', fileUpload);
	data.append(
		'upload_preset',
		process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
	);
	data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_NAME);
	data.append('folder', folder);
	try {
		const res = await axios.post(
			`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
			data,
		);
		return res.data.public_id;
	} catch (err) {
		toast.error(err.message);
	}
};

export const getOriginalImageFromURL = (url) => {
	if (!url) return null;
	if (!url.startsWith('https://res.cloudinary.com')) return url;
	const publicId = url.split('/').slice(7).join('/').split('.')[0];
	return `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload/${publicId}`;
};
export const getOriginalImageByPublicId = (publicId) => {
	if (!publicId) return null;
	return `https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload/${publicId}`;
};

export const getImageWithDimension = ({ publicId, width, height }) => {
	if (!publicId) return null;
	return `https://res.cloudinary.com/${
		process.env.REACT_APP_CLOUDINARY_NAME
	}/image/upload/${width ? `w_${width},` : ''}${
		height ? `h_${height},` : ''
	}c_fill/${publicId}`;
};

const cloudinaryUtils = {
	uploadImage,
};
export default cloudinaryUtils;

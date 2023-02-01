import axios from 'axios';
import { toast } from 'react-hot-toast';

export const uploadImage = async (file, folder = 'nov-social') => {
	if (!file) return;
	const data = new FormData();
	data.append('file', file);
	data.append(
		'upload_preset',
		process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
	);
	data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_NAME);
	data.append('folder', folder);
	try {
		const res = await axios.post(
			`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
			data
		);
		return res.data.secure_url;
	} catch (err) {
		toast.error(err.message);
	}
};

const cloudinaryUtils = {
	uploadImage,
};
export default cloudinaryUtils;

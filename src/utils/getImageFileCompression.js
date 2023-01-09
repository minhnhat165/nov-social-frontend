import compression from 'browser-image-compression';

const getImageFileCompression = async (file) => {
	try {
		if (file.size / (1024 * 1024) < 1) return file;
		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};
		const result = await compression(file, options);
		return result;
	} catch (error) {
		console.log(error);
	}
};
export default getImageFileCompression;

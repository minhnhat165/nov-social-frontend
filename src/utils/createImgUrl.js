const createImgUrl = (file) => {
	if (file && file['type'].split('/')[0] === 'image') {
		const url = URL.createObjectURL(file);
		return url;
	}
	return null;
};

export default createImgUrl;

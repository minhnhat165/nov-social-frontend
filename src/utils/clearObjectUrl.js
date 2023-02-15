const clearObjectUrl = (url) => {
	if (url) {
		URL.revokeObjectURL(url);
	}
};

export default clearObjectUrl;

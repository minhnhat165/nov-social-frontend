// create function to get image from file
const getImageFromFile = (file) => {
	if (!file) return null;
	return URL.createObjectURL(file);
};

export default getImageFromFile;

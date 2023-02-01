const generateCropImage = (image, crop) => {
	const canvas = document.createElement('canvas');
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	canvas.width = crop.width;
	canvas.height = crop.height;
	const ctx = canvas.getContext('2d');

	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width,
		crop.height
	);

	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			console.log(blob);
			if (!blob) {
				// reject(new Error('Canvas is empty'));
				console.error('Canvas is empty');
				return;
			}

			blob.name = image.name;
			window.URL.revokeObjectURL(image.src);
			resolve(blob);
		}, 'image/jpeg');
	});
};

export default generateCropImage;

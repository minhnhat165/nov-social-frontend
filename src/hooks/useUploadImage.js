import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

function useUploadImage(
	options = {
		defaultImagesProp: [],
		multiple: false,
		onRemoveDefaultImage: () => {},
	},
) {
	const {
		multiple = false,
		defaultImagesProp = [],
		onRemoveDefaultImage = () => {},
	} = options;
	const [files, setFiles] = useState([]);
	const [previews, setPreviews] = useState([
		...defaultImagesProp.map((img) => ({ type: 'default', url: img.url })),
	]);

	const getFilesAndPreviews = (files) => {
		let previews = [];
		let newFiles = [];
		files.forEach((file) => {
			const url = URL.createObjectURL(file);
			newFiles.push(Object.assign(file, { url }));
			previews.push({ type: 'file', url });
		});
		return [newFiles, previews];
	};

	const handleNewFilesUpload = (files) => {
		if (!files.length) return;
		const [newFiles, previews] = getFilesAndPreviews(files);
		if (multiple) {
			setFiles((prev) => [...prev, ...newFiles]);
			setPreviews((prev) => [...prev, ...previews]);
		} else {
			setFiles(newFiles);
			setPreviews(previews);
			setFiles([newFiles[files.length - 1]]);
			setPreviews([previews[previews.length - 1]]);
		}
	};

	const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
		accept: {
			'image/*': [],
		},
		multiple: multiple,
		onDrop: (acceptedFiles) => {
			handleNewFilesUpload(acceptedFiles);
		},
		noClick: true,
	});

	const onPaste = (e) => {
		const items = e.clipboardData.items;
		const files = [];
		for (let i = 0; i < items.length; i++) {
			if (items[i].type.indexOf('image') !== -1) {
				files.push(items[i].getAsFile());
			}
		}
		handleNewFilesUpload(files);
	};

	const removeByPreview = (previewRemove) => {
		URL.revokeObjectURL(previewRemove.url);
		setPreviews((prev) =>
			prev.filter((preview) => {
				if (preview.url !== previewRemove.url) return true;
				if (preview.type === 'default') {
					onRemoveDefaultImage(
						defaultImagesProp.find(
							(img) => img.url === preview.url,
						),
					);
				} else {
					setFiles((prev) =>
						prev.filter((file) => file.url !== preview.url),
					);
				}
				return false;
			}),
		);
	};

	const removeAll = () => {
		files.forEach((file) => URL.revokeObjectURL(file.url));
		setPreviews([]);
		setFiles([]);
	};

	return {
		files,
		previews,
		getRootProps,
		getInputProps,
		isDragActive,
		open,
		removeByPreview,
		onPaste,
		removeAll,
	};
}
export default useUploadImage;

import { createContext, useContext, useState } from 'react';

import { useDropzone } from 'react-dropzone';

const ImgUploaderContext = createContext({
	open: () => {},
	isDragActive: false,

	removeUpload: () => {},
	multiple: false,
	files: [],
	setFiles: () => {},
});

const useImgUploader = () => useContext(ImgUploaderContext);

const ImgUploaderProvider = ({ children, multiple, onChange }) => {
	const [files, setFiles] = useState([]);

	const getNewFilesList = (uploadFiles) => {
		if (multiple) {
			return [
				...files,
				...uploadFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					}),
				),
			];
		}

		return [
			Object.assign(uploadFiles[0], {
				preview: URL.createObjectURL(uploadFiles[0]),
			}),
		];
	};

	const { open, getRootProps, isDragActive } = useDropzone({
		multiple: multiple,
		accept: {
			'image/*': [],
		},
		onDrop: (acceptedFiles) => {
			const newFilesList = getNewFilesList(acceptedFiles);
			setFiles(newFilesList);
			onChange && onChange(newFilesList);
		},

		noClick: true,
	});

	const handlePaste = (e) => {
		const items = e.clipboardData.items;
		const files = [];
		for (let i = 0; i < items.length; i++) {
			if (items[i].type.indexOf('image') !== -1) {
				files.push(items[i].getAsFile());
			}
		}
		const newFilesList = getNewFilesList(files);
		setFiles(newFilesList);
		onChange && onChange(newFilesList);
	};

	const removeUpload = (url) => {
		const newList = files.filter((file) => file.preview !== url);
		setFiles(newList);
		onChange && onChange(newList);
	};

	return (
		<ImgUploaderContext.Provider
			value={{
				multiple,
				isDragActive,
				files,
				setFiles,
				open,
				getRootProps,
				removeUpload,
			}}
		>
			<div {...getRootProps()} onPaste={handlePaste}>
				{children}
			</div>
		</ImgUploaderContext.Provider>
	);
};

export { ImgUploaderProvider, useImgUploader, ImgUploaderContext };

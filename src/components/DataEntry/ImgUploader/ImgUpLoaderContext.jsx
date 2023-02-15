import {
	Children,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

import clearObjectUrl from 'utils/clearObjectUrl';
import { useDropzone } from 'react-dropzone';

const ImgUploaderContext = createContext({
	imagePreview: null,
	setImagePreview: () => {},
	handleSetImagePreview: () => {},
	rawImagePreview: null,
	setRawImagePreview: () => {},
	file: null,
	setFile: () => {},
	handleSetFile: () => {},
	handleUpload: () => {},
	isDragActive: false,
	open: () => {},
	getRootProps: () => {},
	handleRemove: () => {},
});

const useImgUploader = () => useContext(ImgUploaderContext);

const ImgUploaderProvider = ({
	defaultImg,
	onChange,
	onRemove,
	onPreview,
	onDragStateChange,
	children,
}) => {
	const [imagePreview, setImagePreview] = useState(defaultImg || null);

	const hasCrop = useMemo(() => {
		return Children.toArray(children).some(
			(child) => child.type.name === 'Cropper',
		);
	}, [children]);

	const [rawImagePreview, setRawImagePreview] = useState(null);
	const [file, setFile] = useState(null);
	const { open, getRootProps, isDragActive } = useDropzone({
		multiple: false,
		accept: {
			'image/*': ['.jpeg', '.png'],
		},
		onDrop: (acceptedFiles) => {
			const url = URL.createObjectURL(acceptedFiles[0]);
			if (hasCrop) {
				setRawImagePreview(url);
			} else {
				handleSetImagePreview(url);
				handleSetFile(acceptedFiles[0]);
			}
		},

		noClick: true,
	});

	useEffect(() => {
		onDragStateChange && onDragStateChange(isDragActive);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDragActive]);

	const handleSetFile = (file) => {
		setFile(file);
		onChange && onChange(file);
	};

	const handleSetImagePreview = (imagePreview) => {
		setImagePreview(imagePreview);
		onPreview && onPreview(imagePreview);
	};

	const handleRemove = () => {
		setRawImagePreview(null);
		handleSetFile(null);
		handleSetImagePreview(null);
		onRemove && onRemove();
	};

	// clear object url image preview for performance
	useEffect(() => {
		return () => {
			if (defaultImg !== imagePreview) clearObjectUrl(imagePreview);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imagePreview]);
	// clear object url raw image preview for performance
	useEffect(() => {
		return () => {
			clearObjectUrl(rawImagePreview);
		};
	}, [rawImagePreview]);

	return (
		<ImgUploaderContext.Provider
			value={{
				imagePreview,
				setImagePreview,
				rawImagePreview,
				setRawImagePreview,
				file,
				setFile,
				open,
				getRootProps,
				isDragActive,
				handleSetFile,
				handleSetImagePreview,
				handleRemove,
			}}
		>
			<div {...getRootProps()}>{children}</div>
		</ImgUploaderContext.Provider>
	);
};

export { ImgUploaderProvider, useImgUploader };

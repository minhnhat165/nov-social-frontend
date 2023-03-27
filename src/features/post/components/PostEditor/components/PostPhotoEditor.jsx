import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import PreviewBox from './PreviewBox';
import { usePostEditor } from '../context';
import useUploadImage from 'hooks/useUploadImage';

export const PostPhotoEditor = forwardRef(({ children }, ref) => {
	const { initial, handleDirty, setIsValid, hasContent } = usePostEditor();
	const [photos, setPhotos] = useState(initial.photos || []);
	const {
		open,
		files: photoFiles,
		getRootProps,
		onPaste,
		previews,
		isDragActive,
		removeByPreview,
		removeAll,
	} = useUploadImage({
		defaultImagesProp: initial.photos,
		onRemoveDefaultImage: (image) => {
			setPhotos(photos.filter((photo) => photo.url !== image.url));
		},
		multiple: true,
	});

	const { setIsFocused } = usePostEditor();

	useEffect(() => {
		if (hasContent || photoFiles.length > 0 || photos.length > 0)
			setIsValid(true);
		else setIsValid(false);
	}, [hasContent, photoFiles, photos, setIsValid]);

	useEffect(() => {
		handleDirty('photos', photoFiles.length > 0);
	}, [handleDirty, photoFiles]);

	useEffect(() => {
		handleDirty('photos', photos.length !== initial.photos?.length);
	}, [handleDirty, initial.photos?.length, photos]);

	useImperativeHandle(
		ref,
		() => {
			return {
				getRootProps,
				triggerUpload: open,
				getPhotos: () => photos,
				getPhotoFiles: () => photoFiles,
				reset: () => {
					removeAll();
					setPhotos([]);
				},
			};
		},
		[getRootProps, open, photoFiles, photos, removeAll],
	);

	return (
		<div
			{...getRootProps()}
			onPaste={onPaste}
			onClick={() => {
				setIsFocused(true);
			}}
			className="relative w-full rounded-xl"
		>
			{children}

			{!!previews.length && (
				<PreviewBox
					previews={previews}
					onRemove={removeByPreview}
					className="border-normal mb-3 w-full rounded-xl border p-1"
				/>
			)}

			{isDragActive && (
				<div className="absolute inset-0 animate-pulse rounded-xl border-2 border-dashed border-primary-500 bg-black/50" />
			)}
		</div>
	);
});

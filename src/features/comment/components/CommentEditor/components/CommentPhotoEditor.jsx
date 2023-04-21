import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { CloseButton } from 'components/Action';
import { Image } from 'components/DataDisplay';
import { useCommentEditor } from '../context';
import useUploadImage from 'hooks/useUploadImage';

export const CommentPhotoEditor = forwardRef(({ children }, ref) => {
	const { initial, handleDirty, setIsValid, hasContent, setIsFocused } =
		useCommentEditor();
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
		multiple: false,
	});

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
				<div className="relative mt-2 max-w-[120px] overflow-hidden rounded">
					<Image src={previews[0].url} />
					<CloseButton
						onClick={() => {
							removeByPreview(previews[0]);
						}}
						size="xs"
						className="absolute right-0.5 top-0.5"
					/>
				</div>
			)}

			{isDragActive && (
				<div className="absolute inset-0 animate-pulse rounded-xl border-2 border-dashed border-primary-500 bg-black/50" />
			)}
		</div>
	);
});

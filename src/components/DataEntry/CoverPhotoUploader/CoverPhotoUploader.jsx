import { ArrowLeftIcon, ArrowUpOnSquareIcon, XMarkIcon } from 'components/Icon';
import React, { useState } from 'react';

import IconButton from 'components/Action/IconButton';
import IconWrapper from 'components/Icon/IconWrapper';
import ImageCropper from '../ImageCropper';
import Layer from 'components/Layout/Layer';
import Modal from 'components/OverLay/Modal';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import useUploadImage from 'hooks/useUploadImage';

const CoverPhotoUploader = ({ defaultImage = null, onChange, onRemove }) => {
	const { imagePreview, handleUpload, handleCancel } = useUploadImage(
		defaultImage,
		null,
		(file) => {
			onChange(file);
			handleCloseCropper();
		}
	);
	const [openCropper, setOpenCropper] = useState(false);
	const [rawImagePreview, setRawImagePreview] = useState(null);

	const { open, getRootProps, isDragActive } = useDropzone({
		multiple: false,
		accept: {
			'image/*': ['.jpeg', '.png'],
		},
		onDrop: (acceptedFiles) => {
			setRawImagePreview(URL.createObjectURL(acceptedFiles[0]));
			setOpenCropper(true);
		},
		noClick: true,
	});

	const handleCloseCropper = () => {
		setOpenCropper(false);
		URL.revokeObjectURL(rawImagePreview);
		setRawImagePreview(null);
	};

	return (
		<div className="relative" {...getRootProps()}>
			<Layer
				level={3}
				className={clsx(
					'relative aspect-[3/1] w-full overflow-hidden ',
					isDragActive && 'animate-pulse ring-2 ring-primary-500'
				)}
			>
				{imagePreview && (
					<>
						<img
							src={imagePreview}
							alt="upload img"
							className="block h-full w-full object-cover"
						/>
					</>
				)}
			</Layer>
			<div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
				<div className="flex gap-2">
					<IconButton rounded onClick={open}>
						<IconWrapper>
							<ArrowUpOnSquareIcon />
						</IconWrapper>
					</IconButton>
					{imagePreview && (
						<IconButton
							color="secondary"
							rounded
							onClick={() => {
								handleCancel();
								onRemove();
							}}
						>
							<IconWrapper>
								<XMarkIcon />
							</IconWrapper>
						</IconButton>
					)}
				</div>
				<ChipDragAndDrop isDragging={isDragActive} />
			</div>
			<Modal show={openCropper} onClose={handleCloseCropper}>
				<Modal.Close>
					<ArrowLeftIcon />
				</Modal.Close>
				<Modal.Panel className="w-[480px]">
					<Modal.Panel.Header>Edit cover photo</Modal.Panel.Header>

					<ImageCropper
						onApply={({ file }) => {
							handleUpload(file);
						}}
						aspect={3 / 1}
						initialValue={rawImagePreview}
					/>
				</Modal.Panel>
			</Modal>
		</div>
	);
};

export default CoverPhotoUploader;

const ChipDragAndDrop = ({ isDragging }) => {
	return (
		<div
			className={clsx(
				'min-w-[200px]  rounded-full bg-slate-900/50 p-2 text-center text-slate-50 dark:bg-slate-50/50 dark:text-dark-900',
				isDragging && 'bg-slate-900/100 dark:bg-slate-50/100'
			)}
		>
			<span>{isDragging ? 'Drop here' : 'Drag and drop to upload'}</span>
		</div>
	);
};

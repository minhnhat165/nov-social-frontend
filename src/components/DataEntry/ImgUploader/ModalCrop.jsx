import React, { cloneElement, useState } from 'react';

import { ArrowLeftIcon } from 'components/Icon';
import { ImageCropper } from '../ImageCropper';
import { Modal } from 'components/OverLay';

const ModalCrop = ({ children, aspect, cropShape, onSubmit }) => {
	const [open, setOpen] = useState(false);
	const [rawFile, setRawFile] = useState(null);

	const handleOpen = (file) => {
		setRawFile(file);
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = ({ url, file }) => {
		file.preview = url;
		onSubmit && onSubmit(file);
		handleClose();
	};
	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				closeIcon={<ArrowLeftIcon />}
			>
				<Modal.Panel responsive className="sm:!w-[480px]">
					<Modal.Header>Edit cover photo</Modal.Header>
					<ImageCropper
						onApply={handleSubmit}
						aspect={aspect}
						cropShape={cropShape}
						initialValue={rawFile?.preview}
					/>
				</Modal.Panel>
			</Modal>
			{children &&
				cloneElement(children, {
					onClick: handleOpen,
					onChange: (files) => {
						files.length && handleOpen(files[0]);
					},
				})}
		</>
	);
};

export default ModalCrop;

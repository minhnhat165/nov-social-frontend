import {
	ArrowLeftIcon,
	ArrowUpOnSquareIcon,
	PlusIcon,
	UserIcon,
} from 'components/Icon';

import IconWrapper from 'components/Icon/IconWrapper';
import ImageCropper from '../ImageCropper';
import Modal from 'components/OverLay/Modal';
import PropTypes from 'prop-types';
import UploadField from '../UploadField';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import useUploadImage from 'hooks/useUploadImage';

const AvatarUploader = ({ onChange, defaultImage, defaultFile }) => {
	const [openCropper, setOpenCropper] = useState(false);
	const [rawImagePreview, setRawImagePreview] = useState(null);
	const { imagePreview, handleUpload, loading } = useUploadImage(
		defaultImage,
		defaultFile,
		onChange
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		noClick: true,
		onDrop: (values) => {
			setOpenCropper(true);
			setRawImagePreview(URL.createObjectURL(values[0]));
		},
	});

	const handleCloseCropper = () => {
		setOpenCropper(false);
		URL.revokeObjectURL(rawImagePreview);
		setRawImagePreview(null);
	};

	return (
		<>
			<UploadField {...getInputProps()}>
				{({ id }) => (
					<div
						{...getRootProps()}
						className="relative flex h-[264px] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-dark-700"
					>
						<AvatarPreview
							inputId={id}
							previewImg={imagePreview}
							uploading={isDragActive}
						/>
						<div className="mt-4 text-slate-800 dark:text-dark-200">
							<span>
								Add a profile photo or drag and drop one here
							</span>
						</div>
						{isDragActive && (
							<div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center rounded-xl backdrop-blur-sm transition-all">
								<ArrowUpOnSquareIcon className="text-normal h-20 w-20" />
								<span className="text-slate-800 dark:text-dark-100">
									Drop the files here ...
								</span>
							</div>
						)}
					</div>
				)}
			</UploadField>
			<Modal
				title="Edit image"
				show={openCropper}
				onClose={() => {
					setOpenCropper(false);
				}}
			>
				<Modal.Close>
					<ArrowLeftIcon />
				</Modal.Close>
				<Modal.Panel className="w-[480px]">
					<Modal.Panel.Header>Edit image</Modal.Panel.Header>
					<ImageCropper
						cropShape="round"
						onApply={async ({ url, file }) => {
							await handleUpload(file);
							handleCloseCropper();
						}}
						aspect={1}
						loading={loading}
						initialValue={rawImagePreview}
					/>
				</Modal.Panel>
			</Modal>
		</>
	);
};

const AvatarPreview = ({ previewImg, size = 'h-32 w-32', inputId }) => {
	return (
		<div
			className={clsx(
				'relative aspect-square max-w-fit rounded-full border p-2',
				previewImg
					? 'border-primary-700 dark:border-primary-500'
					: 'border-slate-400 dark:border-dark-600'
			)}
		>
			<div
				className={clsx(
					'flex items-center justify-center overflow-hidden rounded-full bg-slate-300 dark:bg-dark-800',
					size
				)}
			>
				{previewImg ? (
					<img
						alt="avatar"
						style={{ margin: 0 }}
						src={previewImg}
						className="block h-full w-full object-cover"
						onLoad={() => {
							URL.revokeObjectURL(previewImg);
						}}
					/>
				) : (
					<UserIcon className="text-8xl text-primary-700 dark:text-primary-500" />
				)}
			</div>
			<div className="absolute top-[2px] right-[2px] h-10 w-10">
				<label
					htmlFor={inputId}
					className="text-primary-bold hover:bg-primary-bold flex h-full w-full cursor-pointer items-center  justify-center rounded-full border-2 border-slate-100 bg-slate-300 transition-all hover:bg-primary-700 hover:text-dark-50 active:scale-95 dark:border-dark-700 dark:bg-dark-800 dark:text-dark-100 dark:hover:bg-primary-500 dark:hover:text-dark-50"
				>
					<IconWrapper size={5}>
						{previewImg ? <ArrowUpOnSquareIcon /> : <PlusIcon />}
					</IconWrapper>
				</label>
			</div>
		</div>
	);
};

AvatarUploader.propTypes = {
	initialValue: PropTypes.any,
	onChange: PropTypes.func,
	props: PropTypes.object,
};

AvatarUploader.defaultProps = {
	initialValue: [],
	onChange: () => {},
	props: {},
};

export default AvatarUploader;

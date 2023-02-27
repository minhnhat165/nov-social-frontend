import { ArrowUpOnSquareIcon, PlusIcon, UserIcon } from 'components/Icon';

import { IconWrapper } from 'components/DataDisplay';
import { ImgUploader } from '../ImgUploader';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useState } from 'react';

export const AvatarUploader = ({ onChange, defaultImage }) => {
	const [file, setFile] = useState(
		defaultImage ? { preview: defaultImage } : null,
	);

	return (
		<ImgUploader.Cropper
			aspect={1 / 1}
			cropShape="rounded"
			onSubmit={(file) => {
				setFile(file);
				onChange(file);
			}}
		>
			<ImgUploader>
				<div className="relative flex h-[264px] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-dark-700">
					<div className="relative">
						<AvatarPreview src={file ? file.preview : null} />
						<ImgUploader.Trigger>
							<UploadButton
								isUploaded={file && file.preview ? true : false}
							/>
						</ImgUploader.Trigger>
					</div>
					<div className="mt-4 text-slate-800 dark:text-dark-200">
						<span>
							Add a profile photo or drag and drop one here
						</span>
					</div>
					<ImgUploader.DropZone>
						{({ isDragActive }) =>
							isDragActive && (
								<div className="border-dash absolute inset-0 animate-pulse rounded-xl border-2 border-primary-500 bg-black/50"></div>
							)
						}
					</ImgUploader.DropZone>
				</div>
			</ImgUploader>
		</ImgUploader.Cropper>
	);
};

const AvatarPreview = ({ src, size = 'h-32 w-32' }) => {
	return (
		<div
			className={clsx(
				'relative aspect-square max-w-fit rounded-full border-2 p-1',
				src
					? 'border-primary-500/50 dark:border-primary-200/50'
					: 'border-slate-400 dark:border-dark-600',
			)}
		>
			<div
				className={clsx(
					'flex items-center justify-center overflow-hidden rounded-full bg-slate-300 dark:bg-dark-800',
					size,
				)}
			>
				{src ? (
					<img
						alt="avatar"
						style={{ margin: 0 }}
						src={src}
						className="block h-full w-full object-cover"
						onLoad={() => {
							URL.revokeObjectURL(src);
						}}
					/>
				) : (
					<UserIcon className="text-8xl text-primary-700 dark:text-primary-500" />
				)}
			</div>
		</div>
	);
};

const UploadButton = ({ isUploaded, onClick }) => {
	return (
		<div
			onClick={onClick}
			className="absolute top-[2px] right-[2px] h-10 w-10"
		>
			<label className="text-primary-bold hover:bg-primary-bold flex h-full w-full cursor-pointer items-center  justify-center rounded-full border-2 border-slate-100 bg-slate-300 transition-all hover:bg-primary-700 hover:text-dark-50 active:scale-95 dark:border-dark-700 dark:bg-dark-800 dark:text-dark-100 dark:hover:bg-primary-500 dark:hover:text-dark-50">
				<IconWrapper size={5}>
					{isUploaded ? <ArrowUpOnSquareIcon /> : <PlusIcon />}
				</IconWrapper>
			</label>
		</div>
	);
};

UploadButton.propTypes = {
	isUploaded: PropTypes.bool,
	onClick: PropTypes.func,
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

import { ArrowUpOnSquareIcon, XMarkIcon } from 'components/Icon';
import { Card, Img } from 'components/DataDisplay';

import { IconButton } from 'components/Action';
import { ImgUploader } from '../ImgUploader';
import clsx from 'clsx';
import { useState } from 'react';

export const CoverPhotoUploader = ({
	defaultImage = null,
	onChange,
	onRemove,
}) => {
	const [file, setFile] = useState(
		defaultImage
			? {
					preview: defaultImage,
			  }
			: null,
	);
	return (
		<Card
			level={3}
			className="relative aspect-[3/1] w-full overflow-hidden"
		>
			<ImgUploader.Cropper
				aspect={3 / 1}
				onSubmit={(file) => {
					setFile(file);
					onChange(file);
				}}
			>
				<ImgUploader>
					{file && (
						<Img
							src={file.preview}
							alt="upload img"
							className="block h-full w-full object-cover"
						/>
					)}

					<UploadControl
						file={file}
						onRemove={() => {
							setFile(null);
							onRemove();
						}}
					/>
					<ImgUploader.DropZone>
						{({ isDragActive }) =>
							isDragActive && (
								<div className="border-dash absolute inset-0 animate-pulse rounded-xl border-2 border-primary-500 bg-black/50"></div>
							)
						}
					</ImgUploader.DropZone>
				</ImgUploader>
			</ImgUploader.Cropper>
		</Card>
	);
};

export const ChipDragAndDrop = ({ isDragging, children }) => {
	return (
		<div
			className={clsx(
				'flex h-8 min-w-[200px] items-center justify-center rounded-full bg-slate-900/50 p-2 text-center text-slate-50 dark:bg-slate-50/50 dark:text-dark-900',
				isDragging && 'bg-slate-900/100 dark:bg-slate-50/100',
			)}
		>
			<span className="text-sm">
				{isDragging ? 'Drop here' : children}
			</span>
		</div>
	);
};

function UploadControl({ file, onRemove }) {
	return (
		<div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
			<div className="flex gap-2">
				<ImgUploader.Trigger>
					<IconButton rounded>
						<ArrowUpOnSquareIcon />
					</IconButton>
				</ImgUploader.Trigger>
				{file && (
					<IconButton onClick={onRemove} color="secondary" rounded>
						<XMarkIcon />
					</IconButton>
				)}
			</div>
			<ChipDragAndDrop>Drag and drop to upload</ChipDragAndDrop>
		</div>
	);
}

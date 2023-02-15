import { ArrowUpOnSquareIcon, XMarkIcon } from 'components/Icon';

import Card from 'components/DataDisplay/Card';
import IconButton from 'components/Action/IconButton';
import Img from 'components/DataDisplay/Img';
import ImgUploader from '../ImgUploader';
import clsx from 'clsx';
import { useState } from 'react';

const CoverPhotoUploader = ({ defaultImage = null, onChange, onRemove }) => {
	const [isDragActive, setIsDragActive] = useState(false);
	return (
		<ImgUploader
			defaultImage={defaultImage}
			onChange={onChange}
			onRemove={onRemove}
			onDragStateChange={(state) => setIsDragActive(state)}
		>
			<ImgUploader.Cropper aspect={3 / 1} />
			<div className="relative">
				<Card
					level={3}
					className={clsx(
						'relative aspect-[3/1] w-full overflow-hidden ',
						isDragActive && 'animate-pulse ring-2 ring-primary-500',
					)}
				>
					<ImgUploader.Preview hideIfNull>
						<Img
							alt="upload img"
							className="block h-full w-full object-cover"
						/>
					</ImgUploader.Preview>
				</Card>
				<div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
					<div className="flex gap-2">
						<ImgUploader.Trigger>
							<IconButton rounded>
								<ArrowUpOnSquareIcon />
							</IconButton>
						</ImgUploader.Trigger>
						<ImgUploader.Remove>
							<IconButton color="secondary" rounded>
								<XMarkIcon />
							</IconButton>
						</ImgUploader.Remove>
					</div>
					<ChipDragAndDrop isDragging={isDragActive}>
						Drag and drop to upload
					</ChipDragAndDrop>
				</div>
			</div>
		</ImgUploader>
	);
};

export default CoverPhotoUploader;

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

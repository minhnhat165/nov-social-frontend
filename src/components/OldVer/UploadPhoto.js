import React from 'react';
import useUploadImg from '../hooks/useUpLoadImg';
import CloseButton from './ButtonOld/CloseButton';
import Img from './Img';
import AnimationWrapper from './Animate/AnimationWrapper';
import { zoom } from './Animate/variants';

const UploadPhoto = ({ setShow, initial, onChange }) => {
	const { previewImg, handleUpLoad } = useUploadImg(initial, onChange);
	return (
		<AnimationWrapper animation={zoom}>
			<div className="dark:border-primary-bold group relative flex min-h-[240px] w-full rounded-xl border border-dashed p-2">
				<input
					type="file"
					name="file"
					id="file"
					placeholder=""
					className="invisible absolute"
					onChange={(e) => handleUpLoad(e)}
				/>

				<CloseButton
					className={
						'absolute top-3 right-3 z-[99999] shadow-none dark:bg-dark-regular'
					}
					onClick={() => setShow(false)}
				/>
				{previewImg ? (
					<div className="min-h-full w-full overflow-hidden rounded-xl dark:bg-dark-light">
						<Img
							src={previewImg}
							className="h-full w-full object-cover"
						/>
						<label
							htmlFor="file"
							className="absolute top-4 left-4 cursor-pointer rounded-xl bg-white/50 px-2 py-2 text-sm font-bold opacity-0 transition-all hover:bg-white group-hover:opacity-100"
						>
							<i className="fa-duotone fa-photo-film text-md mr-2"></i>
							Add photos/videos
						</label>
					</div>
				) : (
					<label
						htmlFor="file"
						className={`hover-brightness flex min-h-full w-full cursor-pointer flex-col items-center justify-center gap-2  rounded-xl dark:bg-dark-light`}
					>
						<div className="bg-primary/20 flex h-12 w-12 items-center justify-center rounded-full">
							<i className="fa-duotone fa-photo-film text-xl text-green-300"></i>
						</div>
						<div className="text-center">
							<span className="text-lg font-bold dark:text-dark-text-bold">
								{' '}
								Add photos/videos
							</span>
							<div className="dark:text-dark-text-regular">
								or drag and drop
							</div>
						</div>
					</label>
				)}
			</div>
		</AnimationWrapper>
	);
};

export default React.memo(UploadPhoto);

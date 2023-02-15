import { useCallback, useState } from 'react';

import Button from 'components/Action/Button';
import Cropper from 'react-easy-crop';
import LoadingOverlay from 'components/OverLay/LoadingOverlay';
import Slider from '../Slider';
import getCroppedImg from 'utils/cropImage';
import { toast } from 'react-hot-toast';

const ImageCropper = ({
	initialValue,
	aspect,
	onApply,
	cropShape = 'rect',
}) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [loading, setLoading] = useState(false);
	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const handleApply = async () => {
		try {
			setLoading(true);
			const { file, url } = await getCroppedImg(
				initialValue,
				croppedAreaPixels,
				0,
			);
			await onApply({
				file,
				url,
			});
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<LoadingOverlay loading={loading}>
			<div className="flex h-full w-full flex-col justify-center">
				<div className="relative aspect-square w-full">
					<Cropper
						cropShape={cropShape}
						image={initialValue}
						crop={crop}
						zoom={zoom}
						aspect={aspect}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
					/>
				</div>
				<div className="flex h-14 items-center justify-between gap-4 px-4">
					<Slider
						value={zoom}
						setValue={setZoom}
						defaultValue={1}
						min={1}
						max={3}
						step={0.01}
						onChange={(value) => {
							setZoom(value);
						}}
					/>
					<Button onClick={handleApply}>Apply</Button>
				</div>
			</div>
		</LoadingOverlay>
	);
};

// const Loading = () => {
// 	return (
// 		<div className="flex h-full w-full flex-col justify-center">
// 			<div className="relative aspect-square w-full">
// 				<div className="absolute top-0 left-0 h-full w-full animate-pulse bg-slate-300 dark:bg-dark-500" />
// 			</div>
// 			<div className="flex h-14 items-center justify-between gap-4 px-4">
// 				<div className="h-4 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-dark-500" />
// 				<div className="h-10 w-20 animate-pulse rounded-lg bg-slate-200 dark:bg-dark-500" />
// 			</div>
// 		</div>
// 	);
// };

ImageCropper.propTypes = {};

export default ImageCropper;

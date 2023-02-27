import { useCallback, useState } from 'react';

import { Button } from 'components/Action';
import Cropper from 'react-easy-crop';
import { LoadingOverlay } from 'components/OverLay';
import PropTypes from 'prop-types';
import { Slider } from '../Slider';
import getCroppedImg from 'utils/cropImage';
import { toast } from 'react-hot-toast';

export const ImageCropper = ({
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

ImageCropper.propTypes = {
	initialValue: PropTypes.string,
	aspect: PropTypes.number,
	onApply: PropTypes.func,
	cropShape: PropTypes.string,
};

import { Children, cloneElement, useEffect, useMemo, useState } from 'react';
import { ImgUploaderProvider, useImgUploader } from './ImgUpLoaderContext';

import { ArrowLeftIcon } from 'components/Icon';
import ImageCropper from '../ImageCropper';
import Modal from 'components/OverLay/Modal';

const ImgUploader = ({
	defaultImage,
	onChange,
	onRemove,
	onPreview,
	onDragStateChange,
	children,
}) => {
	return (
		<ImgUploaderProvider
			defaultImg={defaultImage}
			onChange={onChange}
			onPreview={onPreview}
			onRemove={onRemove}
			onDragStateChange={onDragStateChange}
		>
			{children}
		</ImgUploaderProvider>
	);
};

const GetProps = ({ children }) => {
	const props = useImgUploader();
	return children(props);
};

const Zone = ({ children, className }) => {
	const { getRootProps, isDragActive } = useImgUploader();

	return (
		<div className={className} {...getRootProps()}>
			{children({ isDragActive })}
		</div>
	);
};

const Trigger = ({ children }) => {
	const { open, imagePreview } = useImgUploader();

	return (
		<>
			{children && typeof children === 'function'
				? children({ open, isUploaded: !!imagePreview })
				: Children.map(children, (child) => {
						return cloneElement(child, {
							onClick: open,
						});
				  })}
		</>
	);
};

const Preview = ({ children, hideIfNull }) => {
	const { imagePreview } = useImgUploader();
	// If the imagePreview prop is set, show the children
	// If the imagePreview prop is not set, and the hideIfNull prop is set, hide the children
	// If the imagePreview prop is not set, and the hideIfNull prop is not set, show the children
	const showChildren = useMemo(() => {
		if (imagePreview) return true;
		else {
			if (hideIfNull) return false;
			return true;
		}
	}, [imagePreview, hideIfNull]);

	return (
		<>
			{showChildren &&
				Children.map(children, (child) => {
					return cloneElement(child, {
						src: imagePreview,
					});
				})}
		</>
	);
};

const Remove = ({ children, className }) => {
	const { imagePreview, handleRemove } = useImgUploader();
	return (
		<>
			{imagePreview && (
				<div className={className} onClick={handleRemove}>
					{children}
				</div>
			)}
		</>
	);
};

const Cropper = ({ aspect = 1, cropShape }) => {
	const { handleSetImagePreview, handleSetFile, rawImagePreview } =
		useImgUploader();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (rawImagePreview) {
			setOpen(true);
		}
	}, [rawImagePreview]);

	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false);
			}}
			closeIcon={<ArrowLeftIcon />}
		>
			<Modal.Panel className="w-[480px]">
				<Modal.Header>Edit cover photo</Modal.Header>
				<ImageCropper
					onApply={({ url, file }) => {
						handleSetImagePreview(url);
						handleSetFile(file);
						setOpen(false);
					}}
					aspect={aspect}
					cropShape={cropShape}
					initialValue={rawImagePreview}
				/>
			</Modal.Panel>
		</Modal>
	);
};

ImgUploader.Zone = Zone;
ImgUploader.Trigger = Trigger;
ImgUploader.Remove = Remove;
ImgUploader.Cropper = Cropper;
ImgUploader.Preview = Preview;
ImgUploader.GetProps = GetProps;

export default ImgUploader;

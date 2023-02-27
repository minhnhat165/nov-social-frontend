import { Children, cloneElement } from 'react';
import { ImgUploaderProvider, useImgUploader } from './ImgUpLoaderContext';

import ModalCrop from './ModalCrop';
import Preview from './Preview';

const ImgUploader = ({ onChange, children, multiple }) => {
	return (
		<ImgUploaderProvider onChange={onChange} multiple={multiple}>
			{children}
		</ImgUploaderProvider>
	);
};

const GetProps = ({ children }) => {
	const props = useImgUploader();
	return children(props);
};

const DropZone = ({ children }) => {
	const { isDragActive } = useImgUploader();
	return children({ isDragActive });
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

const Remove = ({ children, className, preview }) => {
	const { removeUpload } = useImgUploader();
	return (
		<>
			{preview && (
				<div
					className={className}
					onClick={() => removeUpload(preview)}
				>
					{children}
				</div>
			)}
		</>
	);
};

ImgUploader.Trigger = Trigger;
ImgUploader.Remove = Remove;
ImgUploader.Cropper = ModalCrop;
ImgUploader.Preview = Preview;
ImgUploader.GetProps = GetProps;
ImgUploader.DropZone = DropZone;

export { ImgUploader };

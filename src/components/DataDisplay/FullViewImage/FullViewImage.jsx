import { IconButton } from 'components/Action';
import { Img } from '../Img';
import { Modal } from 'components/OverLay';
import { Spinner } from 'components/Loading';
import { XMarkIcon } from 'components/Icon';
import { getOriginalImageFromURL } from 'utils/cloundinaryUtils';
import { useModal } from 'hooks/useModal';
import { useState } from 'react';

export const FullViewImage = ({ src, children }) => {
	const { isOpen, close, open } = useModal();
	return (
		<>
			<div onClick={open}>{children}</div>
			<Modal closeIcon={null} open={isOpen} onClose={close}>
				<ImageScreen onClose={close} src={src} />
			</Modal>
		</>
	);
};

function ImageScreen({ onClose, src }) {
	const [loading, setLoading] = useState(true);
	return (
		<div
			className="flex h-screen w-screen items-center justify-center overflow-hidden bg-dark-900"
			onClick={onClose}
		>
			<IconButton
				variant="text"
				className="absolute right-2 top-2 !text-dark-100 hover:!bg-dark-700/50"
				rounded
			>
				<XMarkIcon />
			</IconButton>
			{loading && (
				<Spinner className="fixed m-auto" size="xl" color="primary" />
			)}
			<Img
				onClick={(e) => {
					e.stopPropagation();
				}}
				src={getOriginalImageFromURL(src)}
				alt="full view"
				className="block max-h-full max-w-full"
				onLoad={() => setLoading(false)}
			/>
		</div>
	);
}

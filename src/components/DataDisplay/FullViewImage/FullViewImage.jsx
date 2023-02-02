import Img from '../Img';
import Modal from 'components/OverLay/Modal';
import { Spinner } from 'components/Loading/Spinner';
import { getOriginalImageFromURL } from 'utils/cloundinaryUtils';
import { useState } from 'react';

const FullViewImage = ({ src, children }) => {
	const [loading, setLoading] = useState(true);
	return (
		<Modal.Control>
			<Modal.Trigger>{children}</Modal.Trigger>
			<Modal>
				<Modal.Close />
				<Modal.Props>
					{({ onClose }) => (
						<div
							className="flex h-screen w-screen items-center justify-center overflow-hidden bg-black "
							onClick={onClose}
						>
							{loading && (
								<Spinner
									className="fixed m-auto"
									size="xl"
									color="primary"
								/>
							)}
							<Img
								onClick={(e) => {
									e.stopPropagation();
								}}
								src={getOriginalImageFromURL(src)}
								alt="full view"
								className="block max-h-full max-w-full "
								onLoad={() => setLoading(false)}
							/>
						</div>
					)}
				</Modal.Props>
			</Modal>
		</Modal.Control>
	);
};

export default FullViewImage;

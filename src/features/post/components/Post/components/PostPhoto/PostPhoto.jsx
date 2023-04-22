import Lightbox from 'react-awesome-lightbox';
import PreviewBox from '../../../PostEditor/components/PreviewBox';
import { getOriginalImageByPublicId } from 'utils/cloundinaryUtils';
import { useState } from 'react';

export function PostPhoto({ photos }) {
	const [currentImage, setCurrentImage] = useState(0);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const handleImageClick = (index) => {
		setCurrentImage(index);
		setIsLightboxOpen(true);
	};

	return (
		<div>
			<PreviewBox previews={photos} onClick={handleImageClick} />
			{isLightboxOpen && (
				<Lightbox
					startIndex={currentImage}
					image={photos.length === 1 ? photos[0].url : null}
					images={
						photos.length === 1
							? null
							: photos.map((photo) => ({
									url: getOriginalImageByPublicId(
										photo.publicId,
									),
							  }))
					}
					onClose={() => setIsLightboxOpen(false)}
				/>
			)}
		</div>
	);
}

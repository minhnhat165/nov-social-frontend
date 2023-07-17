import { Image } from 'components/DataDisplay';
import Lightbox from 'react-awesome-lightbox';
import { getOriginalImageByPublicId } from 'utils/cloundinaryUtils';
import { useState } from 'react';

export function CommentPhoto({ photos }) {
	const [currentImage, setCurrentImage] = useState(0);
	const [isLightboxOpen, setIsLightboxOpen] = useState(false);
	const handleImageClick = (index) => {
		setCurrentImage(index);
		setIsLightboxOpen(true);
	};

	return (
		<>
			<div
				className="mt-2 max-w-[120px] overflow-hidden rounded"
				onClick={() => handleImageClick(0)}
			>
				<Image src={photos[0].url} />
			</div>
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
		</>
	);
}

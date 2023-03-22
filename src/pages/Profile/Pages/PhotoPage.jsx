import { FullViewImage } from 'components/DataDisplay';
import React from 'react';
import { getImageWithDimension } from 'utils/cloundinaryUtils';
import useGetPhotos from 'features/user/hooks/useGetPhotos';
import { useParams } from 'react-router-dom';

const PhotoPage = () => {
	const { id } = useParams();
	const { data: photos } = useGetPhotos(id);
	return (
		<div className="columns-3 gap-4 px-2 pt-[80px]">
			{photos?.map((photo) => {
				const url = getImageWithDimension({
					publicId: photo,
					width: 600,
				});
				return (
					<div key={photo} className="mb-4">
						<FullViewImage src={url}>
							<img
								src={url}
								alt=""
								className="w-full rounded-xl object-cover align-middle"
							/>
						</FullViewImage>
					</div>
				);
			})}
		</div>
	);
};

export default PhotoPage;

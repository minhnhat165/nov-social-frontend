import React from 'react';
import Img from './Img';

const WidgetPhoto = ({ photos }) => {
	return (
		<div className="mt-4 w-full overflow-hidden rounded-xl dark:bg-dark-regular">
			<div className="mx-auto grid grid-cols-4 gap-2 px-2 pt-2">
				{photos &&
					photos.map((photo) => (
						<div
							key={photo}
							className="aspect-square w-full overflow-auto rounded-xl bg-blue-400"
						>
							<Img
								src={photo}
								className="object-cover"
								clickAble
							/>
						</div>
					))}
			</div>
			<div className="p-2">
				<div className="text-primary cursor-pointer rounded-xl py-3 text-center transition-all dark:border-dark-border dark:hover:bg-dark-light">
					See all photos
				</div>
			</div>
		</div>
	);
};

export default WidgetPhoto;

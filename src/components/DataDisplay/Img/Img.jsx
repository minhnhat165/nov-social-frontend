import React from 'react';
import clsx from 'clsx';

export const Img = ({ src, alt, className, onLoad, ...props }) => {
	return (
		<img
			src={src}
			{...props}
			alt={alt}
			className={clsx(
				'opacity-0 transition-opacity duration-300 ease-in-out ',
				className,
			)}
			onLoad={(e) => {
				e.target.classList.remove('opacity-0');
				onLoad && onLoad(e);
			}}
		/>
	);
};

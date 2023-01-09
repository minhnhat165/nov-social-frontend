import React, { useMemo } from 'react';
import { SIZE_NAME } from '../constants';
import Img from './Img';

const Avatar = ({
	url,
	size = 'w-9 h-9',
	rounded = 'rounded-full',
	alt = 'A',
}) => {
	const style = useMemo(() => {
		let style = '';
		switch (size) {
			case SIZE_NAME.small:
				style = 'w-9 h-9';
				break;
			case SIZE_NAME.medium:
				style = 'w-9 h-9';
				break;
			case SIZE_NAME.large:
				style = 'w-9 h-9';
				break;
			default:
				break;
		}
	}, [size]);

	return (
		<div className={`shrink-0 overflow-hidden ${rounded} ${size}`}>
			{url ? (
				<Img src={url} className="object-cover" />
			) : (
				<div className="flex h-full w-full items-center justify-center dark:bg-white">
					{alt}
				</div>
			)}
		</div>
	);
};

export default Avatar;

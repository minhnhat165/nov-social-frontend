import Img from './Img';

const Avatar = ({
	src,
	size = 'w-9 h-9',
	rounded = 'rounded-full',
	alt = 'A',
}) => {
	return (
		<div className={`shrink-0 overflow-hidden ${rounded} ${size}`}>
			{src ? (
				<Img src={src} className="object-cover" />
			) : (
				<div className="flex h-full w-full items-center justify-center dark:bg-white">
					{alt}
				</div>
			)}
		</div>
	);
};

export default Avatar;

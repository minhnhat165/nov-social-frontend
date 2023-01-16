import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const sizes = {
	sm: 'w-6 h-6',
	md: 'w-9 h-9',
	lg: 'w-10 h-10',
	xl: 'w-12 h-12',
};

const Avatar = ({ src, size, rounded, alt, className }) => {
	const altName = useMemo(() => {
		if (!alt) return 'NS';
		const names = alt.split(' ');
		return (
			names[0].charAt(0) +
			(names.length - 1 > 0 ? names[names.length - 1].charAt(0) : '')
		);
	}, [alt]);
	return (
		<div
			className={clsx(
				'overflow-hidden border dark:border-none',
				sizes[size],
				rounded ? 'rounded-full' : 'rounded-xl',
				className
			)}
		>
			{src ? (
				<img
					src={src}
					alt={altName}
					className="block h-full w-full object-cover"
				/>
			) : (
				<div className="flex h-full w-full items-center justify-center bg-gray-300 text-gray-500">
					{altName}
				</div>
			)}
		</div>
	);
};

Avatar.propTypes = {
	src: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
	rounded: PropTypes.bool,
	alt: PropTypes.string,
};

Avatar.defaultProps = {
	src: '',
	size: 'lg',
	rounded: true,
	alt: 'A',
};

export default Avatar;

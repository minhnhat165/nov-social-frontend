import { Children, useMemo } from 'react';

import { Img } from '../Img';
import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import clsx from 'clsx';

const sizes = {
	sm: 'w-6 h-6',
	md: 'w-9 h-9',
	lg: 'w-10 h-10',
	xl: 'w-12 h-12',
	'2xl': 'w-16 h-16',
	max: 'w-28 h-28 text-2xl',
};

export const Avatar = ({
	src,
	size,
	rounded,
	alt,
	className,
	children,
	...props
}) => {
	return (
		<div
			className={clsx(
				'flex shrink-0 items-center justify-center bg-slate-300 dark:bg-dark-500',
				sizes[size],
				rounded ? 'rounded-full' : 'rounded-xl',
				className,
			)}
			{...props}
		>
			{src ? (
				<Img
					src={src}
					alt={'avatar'}
					className="block h-full w-full rounded-full object-cover"
				/>
			) : (
				<>
					<AltName name={alt} />
				</>
			)}
			{children}
		</div>
	);
};

const AltName = ({ name }) => {
	const altName = useMemo(() => {
		if (!name) return 'NS';
		const names = name.split(' ');
		return (
			names[0].charAt(0) +
			(names.length - 1 > 0 ? names[names.length - 1].charAt(0) : '')
		);
	}, [name]);
	return <span>{altName}</span>;
};

const Group = ({
	children,
	ring = 'ring-2 ring-slate-50 dark:ring-dark-800',
}) => {
	return (
		<ul className="flex -space-x-3">
			{Children.map(children, (child, index) => {
				return (
					<li key={index}>
						{cloneElement(child, {
							className: clsx(child.props.className, ring),
						})}
					</li>
				);
			})}
		</ul>
	);
};

const Status = ({ className, ...props }) => {
	return (
		<div
			className={clsx(
				'absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-primary-700 ring-1 ring-slate-50 dark:bg-primary-500 dark:ring-dark-800',
				className,
			)}
		></div>
	);
};

Avatar.Status = Status;

Avatar.Group = Group;

Avatar.propTypes = {
	src: PropTypes.string,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl', 'max']),
	rounded: PropTypes.bool,
	alt: PropTypes.string,
};

Avatar.defaultProps = {
	src: '',
	size: 'lg',
	rounded: true,
	alt: 'A',
};

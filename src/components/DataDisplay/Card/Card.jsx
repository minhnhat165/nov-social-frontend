import PropTypes from 'prop-types';
import Text from 'components/Typography/Text';
import clsx from 'clsx';
import { forwardRef } from 'react';

const levels = {
	0: 'bg-white dark:bg-dark-900',
	1: 'bg-slate-50 dark:bg-dark-800',
	2: 'bg-slate-100 dark:bg-dark-700',
	3: 'bg-slate-200 dark:bg-dark-600',
	4: 'bg-slate-300 dark:bg-dark-500',
};

const Card = forwardRef(({ level = 1, className, children, ...props }, ref) => {
	return (
		<div
			ref={ref}
			{...props}
			className={clsx('rounded-xl', levels[level], className)}
		>
			{children}
		</div>
	);
});

const Image = ({ src, alt, className, ...props }) => (
	<>
		{src && (
			<img
				src={src}
				alt={alt}
				className={clsx('h-full w-full object-cover', className)}
				{...props}
			/>
		)}
	</>
);

const Title = ({ children, className, ...props }) => {
	return (
		<Text
			as="h3"
			className={clsx('p-4 text-xl capitalize', className)}
			{...props}
		>
			{children}
		</Text>
	);
};

const Body = ({ children, className, ...props }) => {
	return (
		<div className={clsx('px-4 pb-4', className)} {...props}>
			{children}
		</div>
	);
};

Card.Title = Title;

Card.Body = Body;

Card.Image = Image;

Card.propTypes = {
	level: PropTypes.number,
	className: PropTypes.string,
	children: PropTypes.node,
};

export default Card;

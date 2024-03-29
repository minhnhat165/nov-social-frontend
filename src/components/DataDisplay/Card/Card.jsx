import { Img } from '../Img';
import PropTypes from 'prop-types';
import { Text } from 'components/Typography';
import clsx from 'clsx';
import { forwardRef } from 'react';

const levels = {
	0: 'bg-white dark:bg-dark-900',
	1: 'bg-slate-50 dark:bg-dark-800',
	2: 'bg-slate-100 dark:bg-dark-700',
	3: 'bg-slate-200 dark:bg-dark-600',
	4: 'bg-slate-300 dark:bg-dark-500',
};

export const Card = forwardRef(
	({ level = 1, className, responsive, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				{...props}
				className={clsx(
					'',
					levels[level],
					className,
					responsive ? 'rounded-none sm:rounded-xl' : 'rounded-xl',
				)}
			>
				{children}
			</div>
		);
	},
);

const Image = ({ src, alt, className, ...props }) => (
	<>
		{src && (
			<Img
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
		<div className="inline-flex h-full items-center">
			<Text
				as="h3"
				className={clsx('text-xl capitalize', className)}
				{...props}
			>
				{children}
			</Text>
		</div>
	);
};

const Header = ({ children, className, ...props }) => {
	return (
		<div className={clsx('h-14 px-4', className)} {...props}>
			{children}
		</div>
	);
};

const Body = ({ children, className, ...props }) => {
	return (
		<div className={clsx('px-4', className)} {...props}>
			{children}
		</div>
	);
};

const Footer = ({ children, className, ...props }) => {
	return (
		<div className={clsx('h-14 px-4', className)} {...props}>
			{children}
		</div>
	);
};

Card.Header = Header;

Card.Title = Title;

Card.Body = Body;

Card.Footer = Footer;

Card.Image = Image;

Card.propTypes = {
	level: PropTypes.number,
	className: PropTypes.string,
	children: PropTypes.node,
};
export { Header, Title, Body, Footer, Image };

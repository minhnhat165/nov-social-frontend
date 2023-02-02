import Layer from 'components/Layout/Layer';
import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';
import { forwardRef } from 'react';

const Popover = ({
	interactive,
	appendTo,
	visible,
	onClickOutside,
	placement,
	offset,
	children,
	content,
	render,
	...props
}) => {
	return (
		<Tippy
			interactive
			appendTo={document.body}
			visible={visible}
			onClickOutside={onClickOutside}
			placement={placement}
			offset={offset}
			{...props}
			render={render}
		>
			{children}
		</Tippy>
	);
};

const Content = forwardRef(({ children, className, ...props }, ref) => {
	return (
		<Layer ref={ref} {...props} className={clsx('tooltip', className)}>
			{children}
		</Layer>
	);
});

const Arrow = () => <div className="arrow" data-popper-arrow />;
Popover.Content = Content;

Popover.Arrow = Arrow;

export default Popover;

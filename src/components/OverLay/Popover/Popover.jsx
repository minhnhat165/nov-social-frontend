import { cloneElement, forwardRef, useState } from 'react';

import Layer from 'components/Layout/Layer';
import { LazyTippy } from './LazyTippy';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import clsx from 'clsx';

export const Popover = ({
	interactive,
	hideOnClick,
	appendTo,
	onClickOutside,
	placement,
	offset,
	children,
	content,
	render,
	lazy = true,
	...props
}) => {
	const [visible, setVisible] = useState(false);

	const Component = lazy ? LazyTippy : Tippy;

	return (
		<Component
			interactive
			appendTo={document.body}
			visible={visible}
			onClickOutside={() => {
				setVisible(false);
				onClickOutside && onClickOutside();
			}}
			placement={placement}
			offset={offset}
			{...props}
			render={(attrs) =>
				render && typeof render === 'function'
					? render(attrs)
					: cloneElement(render, {
							...attrs,
							onClick: () => {
								hideOnClick && setVisible(false);
							},
					  })
			}
		>
			<div onClick={() => setVisible(!visible)}> {children}</div>
		</Component>
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

Popover.propTypes = {
	interactive: PropTypes.bool,
	hideOnClick: PropTypes.bool,
	appendTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	onClickOutside: PropTypes.func,
	placement: PropTypes.string,
	offset: PropTypes.array,
	children: PropTypes.node,
	content: PropTypes.node,
	render: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
	lazy: PropTypes.bool,
};
